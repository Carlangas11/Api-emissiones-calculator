import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import {
  Contaminante,
  Nivel1,
  Nivel2,
  Nivel3,
  Nivel4,
  MeasureUnit,
} from '@src/niveles/schema'
import { IntegrationService } from '@src/integration/integration.service'
import {
  IFormatoExcelDiccionario,
  IFormatoExcelImportacion,
  IFormatoExcelMultiXImportacion,
} from '@src/integration/interface/result.interface'
import {
  IContaminante,
  IContaminanteDataResponse,
  INivel4,
  INivel4ModelResponse,
  IValidateLineError,
  IError,
  IEquivalencia,
} from '@interfaces'
import { Report, ReportItem, Diccionario, DiccionarioItem } from './schema'
import { EErrorSource, ESourceData, EStatusData } from '@enum'
import { reportItemsReponse } from './dto/reportItemsResponse.dto'
import { objectHaveUndefined } from '@helpers'
import { Error } from '@src/common/schema/error.schema'
import { GenerateReportInput, ReportOutPut } from './dto/create-report.input'
import { ParseExcelMultiXResponse } from '@src/integration/entities/integration.entity'

@Injectable()
export class ReportService {
  constructor(
    private readonly integrationService: IntegrationService,
    @InjectModel(Contaminante.name)
    private contaminanteModel: Model<Contaminante>,

    @InjectModel(Report.name)
    private reportModel: Model<Report>,
    @InjectModel(ReportItem.name)
    private reportItemModel: Model<ReportItem>, // @InjectModel(ReportItemError.name) // private reportItemErrorModel: Model<ReportItemError>, // @InjectModel(ReportResult.name) // private reportResultModel: Model<ReportResult>,

    @InjectModel(Nivel1.name)
    private nivel1Model: Model<Nivel1>,
    @InjectModel(Nivel2.name)
    private nivel2Model: Model<Nivel2>,
    @InjectModel(Nivel4.name)
    private nivel4Model: Model<Nivel4>,
    @InjectModel(MeasureUnit.name)
    private measureUnitModel: Model<Nivel4>,

    @InjectModel(Diccionario.name)
    private diccionarioModel: Model<Diccionario>,
    @InjectModel(DiccionarioItem.name)
    private diccionarioItemModel: Model<DiccionarioItem>,

    @InjectModel(Error.name)
    private errorModel: Model<Error>,
  ) {}

  private readonly logger = new Logger('ReportService')

  async generateExcelMultiXReport(): Promise<any> {
    const { ok, data, msg } = await this.integrationService.parseExcelMultiX()
    if (!ok) throw new Error(msg)

    return await this.generateReport(data)
  }

  async generateReport(data: GenerateReportInput[]): Promise<ReportOutPut> {
    this.logger.log('Generando reporte')
    const startDate = new Date()
    const arrayErrors: IError[] = []
    ///////////////////////////////////////////////////////////////
    // BORRAR ESTO PARA PRODUCCION / QA                          //
    ///////////////////////////////////////////////////////////////
    await this.reportModel.deleteMany({})
    await this.reportItemModel.deleteMany({})
    ///////////////////////////////////////////////////////////////
    // BORRAR ESTO PARA PRODUCCION / QA                          //
    ///////////////////////////////////////////////////////////////

    const reportDocument = await this.reportModel.create({
      name: `Reporte ${startDate.toISOString()}`,
      source: ESourceData.excel,
      status: EStatusData.processing,
    })

    for await (const entry of data) {
      const index = data.indexOf(entry)
      // if (index != 23) continue

      // console.log(`Checking Line ${index + 2}`)
      console.log(entry)

      const searchObj = {
        fuenteDeConsumo: entry.fuenteDeConsumo,
        subfuenteDeConsumo: entry.subfuenteDeConsumo,
        area: entry.area,
      }
      const diccionaryItem = await this.diccionarioItemModel
        .findOne(searchObj)
        .populate({ path: 'nivel1', select: '_id name' })
        .populate({ path: 'nivel2', select: '_id name' })
        .populate({ path: 'nivel3', select: '_id name' })
        .populate({ path: 'nivel4', select: '_id name' })
        .populate({
          path: 'contaminantes',
          select: '_id name value measureUnit',
        })
        .populate('magnitud')
      // console.log(diccionaryItem.contaminantes)
      console.log({ diccionaryItem })

      //control error
      if (!diccionaryItem) {
        arrayErrors.push({
          operation: 'reportDocument',
          source: EErrorSource.report,
          relatedID: reportDocument._id,
          description: `No se encontró en diccionario la linea ${
            index + 2
          } de .xlsx importado`,
          line: index + 2,
          debugData: searchObj,
        })
        continue
      }

      const totalValue = diccionaryItem.contaminantes
        .map(cont => cont.value)
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0,
        )

      const reportItemObj: Partial<ReportItem> = {
        report: reportDocument._id,
        diccionaryItem: diccionaryItem._id,
        nivel1: diccionaryItem.nivel1.name,
        nivel2: diccionaryItem.nivel2.name,
        value: entry.consumoAnual,
        period: diccionaryItem.periodo,
        area: entry.area,
        factorFE: !!diccionaryItem.factorFE
          ? diccionaryItem.factorFE
          : undefined,
        totalValue,
      }
      console.log('sadsad', reportItemObj)

      reportItemObj.nivel3 = !!diccionaryItem.nivel3
        ? diccionaryItem.nivel3.name
        : undefined
      reportItemObj.nivel4 = !!diccionaryItem.nivel4
        ? diccionaryItem.nivel4.name
        : undefined
      reportItemObj.measureUnit = entry.unidades
      reportItemObj.contaminantes = diccionaryItem.contaminantes

      await this.reportItemModel.create(reportItemObj)
    }

    if (arrayErrors.length > 0) await this.errorModel.insertMany(arrayErrors)

    reportDocument.status = EStatusData.completed
    const { _id } = await reportDocument.save()

    this.logger.log('Reporte generado')
    return {
      id: reportDocument._id,
      ok: true,
      msg: 'Report finished successfully',
      startDate,
      endDate: new Date(),
    }
  }

  //TODO: GENERATE INSERT IN REPORT ITEM

  async checkEntry(
    entry: IFormatoExcelDiccionario,
    index: number,
  ): Promise<void | IValidateLineError> {
    const minimalData = [
      'alcance',
      'fuenteDeConsumo',
      'subfuenteDeConsumo',
      'area',
      'unidades',
      'consumoAnual',
      'periodo',
      'Nivel1',
      'Nivel2',
      'Magnitud',
    ]
    const optimalRawData = [...minimalData, 'Nivel3', 'Nivel4']

    // console.log(entry)

    //All optimal data is present
    if (optimalRawData.every(key => entry.hasOwnProperty(key))) return

    //All minimal data is present
    if (minimalData.every(key => entry.hasOwnProperty(key))) return

    //error the line is not valid, dont process it
    throw {
      code: 400,
      message: `Excel Line ${index} is missing data`,
    }
  }

  //TODO: GENERATE CALCULATION FOR EACH REPORT ITEM
  async getReportItems(reportId: string): Promise<reportItemsReponse[]> {
    const report = await this.reportItemModel
      .find({ report: reportId })
      .populate({ path: 'contaminantes' })
      .populate({
        path: 'diccionaryItem',
        select: 'fuenteDeConsumo subfuenteDeConsumo unidades magnitud',
        populate: { path: 'magnitud', select: 'magnitud si equivalencias' },
      })

    // console.log(report[0])

    const reportOutput: reportItemsReponse[] = []

    for await (const reportItem of report) {
      const index = report.indexOf(reportItem)
      // if (index != 14) continue  // caso borde Sin Contaminante Registrado en DB
      // if (index != 18) continue  // caso borde unidad de medida en DB Huella chile distinta de Unidad Internacional SI
      // if (index != 0) continue   // caso normal
      // if (index != 23) continue  // caso borde con unidad introducida con magnitud (m3) difiere de la magnitud encontrada en DB Huella Chile (kgCO2eq/t)
      // if (index != 58) continue  // caso borde con unidad introducida con magnitud (km) difiere de la magnitud encontrada en DB Huella Chile (kgCO2eq/persona-km)

      // console.log(`checking reportItem ${reportItem}`)

      if (reportItem.contaminantes.length === 0) {
        const obj = {
          nivel1: reportItem.nivel1,
          nivel2: reportItem.nivel2,
          nivel3: reportItem.nivel3,
          nivel4: reportItem.nivel4,
          consumption: reportItem.value,
          consumptionUnit: reportItem.measureUnit,
          costCenter: reportItem.area,
          period: reportItem.period,
          contaminantes: [],
          totalFe: reportItem.factorFE,
          measureUnitFe: 'kgCO2eq/kg',
          totalEmission: reportItem.factorFE * reportItem.value * 0.001, // esta division por mil se hace automatica y hay que cambiarla dependiendo en que unidad nos dan el FACTOR FE 'custom'
          totalEmissionUnit: 'kgCO2eq',
        }
        reportOutput.push(obj)
        continue
      }

      // console.log(reportItem.measureUnit)
      // console.log(reportItem.diccionaryItem.magnitud)
      // console.log(reportItem.diccionaryItem.magnitud.equivalencias)

      let totalEmission: number = 0
      const totalFe = reportItem.contaminantes
        .map(cont => cont.value)
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0,
        )

      let equivalenciaEncontrada: IEquivalencia
      let equivalenciaEncontradaBDHuellaChile: IEquivalencia

      // buscar equivalencia de reportItem.measureUnit
      for await (const equivalencia of reportItem.diccionaryItem.magnitud
        .equivalencias) {
        if (!equivalencia.alias.includes(reportItem.measureUnit.toLowerCase()))
          continue
        equivalenciaEncontrada = {
          name: equivalencia.name,
          value: equivalencia.value,
        }
      }

      // caso cuando viene reportItem.measureUnit en unidad internacional
      if (
        reportItem.measureUnit.toLowerCase() ===
        reportItem.diccionaryItem.magnitud.si.toLowerCase()
      ) {
        equivalenciaEncontrada = {
          name: reportItem.diccionaryItem.magnitud.si,
          value: 1,
        }
      }

      // console.log(equivalenciaEncontrada)
      // console.log(reportItem.diccionaryItem.magnitud.si)

      // buscar equivalencia de contaminante en BD Huella Chile
      for await (const equivalencia of reportItem.diccionaryItem.magnitud
        .equivalencias) {
        if (
          !equivalencia.alias.includes(
            reportItem.contaminantes[0].measureUnit.split('/')[1],
          )
        )
          continue
        equivalenciaEncontradaBDHuellaChile = {
          name: equivalencia.name,
          value: equivalencia.value,
        }
      }
      // caso cuando viene reportItem.contaminantes[0].measureUnit en unidad internacional
      if (
        reportItem.contaminantes[0].measureUnit.split('/')[1].toLowerCase() ===
        reportItem.diccionaryItem.magnitud.si.toLowerCase()
      ) {
        equivalenciaEncontradaBDHuellaChile = {
          name: reportItem.diccionaryItem.magnitud.si,
          value: 1,
        }
      }

      // CASOS ESPECIALES, VER COMO TRABAJARLOS A FUTURO YA QUE SON CONFLICTIVOS
      if (index === 23)
        equivalenciaEncontradaBDHuellaChile = { name: 'l', value: 1000 } // caso borde con unidad introducida con magnitud difiere de la magnitud encontrada en DB Huella Chile
      if (index === 59)
        equivalenciaEncontradaBDHuellaChile = { name: 'km', value: 1000 } // caso borde con unidad introducida con magnitud difiere de la magnitud encontrada en DB Huella Chile

      // console.log(reportItem.contaminantes[0].measureUnit)
      // console.log(equivalenciaEncontradaBDHuellaChile)

      totalEmission =
        reportItem.value *
        equivalenciaEncontrada.value *
        (totalFe * (1 / equivalenciaEncontradaBDHuellaChile.value))

      const contaminantes = reportItem.contaminantes.map(c => {
        let emission: number = 0

        emission =
          reportItem.value *
          equivalenciaEncontrada.value *
          (c.value * (1 / equivalenciaEncontradaBDHuellaChile.value))

        return {
          name: c.name,
          value: c.value,
          measureUnit: c.measureUnit,
          emission,
          emissionUnit: c.measureUnit,
        }
      })

      const obj = {
        nivel1: reportItem.nivel1,
        nivel2: reportItem.nivel2,
        nivel3: reportItem.nivel3,
        nivel4: reportItem.nivel4,
        consumption: reportItem.value,
        consumptionUnit: reportItem.measureUnit,
        costCenter: reportItem.area,
        period: reportItem.period,
        contaminantes,
        totalFe,
        measureUnitFe: reportItem.contaminantes[0].measureUnit,
        totalEmission,
        totalEmissionUnit: reportItem.contaminantes[0].measureUnit,
      }

      reportOutput.push(obj)
    }
    return reportOutput
  }

  async generateDiccionary(): Promise<any> {
    this.logger.log('Generando diccionario')
    const startDate = new Date()
    const { ok, data, msg } =
      await this.integrationService.parseDiccionaryExcel()
    if (!ok) throw new Error(msg)

    ///////////////////////////////////////////////////////////////
    // BORRAR ESTO PARA PRODUCCION / QA                          //
    ///////////////////////////////////////////////////////////////
    await this.diccionarioModel.deleteMany({})
    await this.diccionarioItemModel.deleteMany({})
    await this.errorModel.deleteMany({ source: 'diccionary' })
    ///////////////////////////////////////////////////////////////
    // BORRAR ESTO PARA PRODUCCION / QA                          //
    ///////////////////////////////////////////////////////////////

    const diccionarioDocument = await this.diccionarioModel.create({
      name: `Diccionario ${startDate.toISOString()}`,
    })

    const arrayErrors: IError[] = []

    for await (const entry of data) {
      const index = data.indexOf(entry)

      // if (index != 10) continue
      // console.log('sadasd', entry)
      const resp: IContaminanteDataResponse[] = await this.contaminanteModel
        .aggregate()
        .lookup({
          from: 'nivel2',
          localField: 'nivel2',
          foreignField: '_id',
          as: 'nivel2',
        })
        .match({
          'nivel2.name': !!entry.Nivel2 ? entry.Nivel2.trim() : undefined,
        })
        .lookup({
          from: 'nivel3',
          localField: 'nivel3',
          foreignField: '_id',
          as: 'nivel3',
        })
        .match({
          'nivel3.name': !!entry.Nivel3 ? entry.Nivel3.trim() : undefined,
        })
        .lookup({
          from: 'nivel4',
          localField: 'nivel4',
          foreignField: '_id',
          as: 'nivel4',
        })
        .match({
          'nivel4.name': !!entry.Nivel4 ? entry.Nivel4.trim() : undefined,
        })
        .lookup({
          from: 'nivel1',
          localField: 'nivel2.nivel1',
          foreignField: '_id',
          as: 'nivel1',
        })
        .match({
          'nivel1.name': !!entry.Nivel1 ? entry.Nivel1.trim() : undefined,
        })

      const respMeasureUnit = await this.measureUnitModel.findOne({
        magnitud: entry.Magnitud,
      })

      const idsFound = {
        nivel1: resp[0]?.nivel1[0]?._id,
        nivel2: resp[0]?.nivel2[0]?._id,
        nivel3: resp[0]?.nivel3[0]?._id,
        nivel4: resp[0]?.nivel4[0]?._id,
        measureUnit: respMeasureUnit._id,
      }

      const idsSearched = {
        nivel1: '',
        nivel2: '',
      }
      let factorFE: number = undefined

      if (objectHaveUndefined(idsFound)) {
        // console.log(`reading Line ${index + 2} of diccionary xlsx`)
        // console.log(entry.Nivel1, entry.Nivel2, entry.Nivel3, entry.Nivel4)
        // console.log(idsFound)

        try {
          await this.checkEntry(entry, index + 2)

          const nivel1Result = await this.nivel1Model.findOne({
            name: entry.Nivel1,
          })
          const nivel2Result = await this.nivel2Model.findOne({
            name: entry.Nivel2,
            nivel1: nivel1Result._id,
          })
          idsSearched.nivel1 = nivel1Result._id
          idsSearched.nivel2 = nivel2Result._id
          factorFE = entry.InvestigacionPropia
        } catch (err: any) {
          arrayErrors.push({
            operation: 'generateDiccionary',
            source: EErrorSource.diccionary,
            relatedID: diccionarioDocument._id,
            description: `Error en el registro linea ${
              index + 2
            }, no se encuentan algunos de los niveles al crear registro de diccionario para esta fila`,
            line: index + 2,
            debugData: idsFound,
          })
          continue
        }
      }

      await this.diccionarioItemModel.create({
        diccionario: diccionarioDocument._id,
        fuenteDeConsumo: entry.fuenteDeConsumo,
        subfuenteDeConsumo: entry.subfuenteDeConsumo,
        area: entry.area,
        unidades: entry.unidades,
        consumoAnual: entry.consumoAnual,
        periodo: entry.periodo,
        nivel1: idsFound.nivel1 ? idsFound.nivel1 : idsSearched.nivel1,
        nivel2: idsFound.nivel2 ? idsFound.nivel2 : idsSearched.nivel2,
        nivel3: idsFound.nivel3,
        nivel4: idsFound.nivel4,
        contaminantes: resp.map(c => c._id),
        magnitud: idsFound.measureUnit,
        factorFE,
      })
    }

    if (arrayErrors.length > 0) await this.errorModel.insertMany(arrayErrors)

    this.logger.log('Diccionario generado')
    return {
      ok: true,
      msg: 'Diccionary generated successfully',
      startDate,
      endDate: new Date(),
      diccionaryID: diccionarioDocument._id,
    }
  }
}
