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
    {
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
        id: _id,
        ok: true,
        msg: 'Report finished successfully',
        startDate,
        endDate: new Date(),
      }
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
      .find({ report: reportId, _id: '63292903532588731745d8b5' })
      .populate({ path: 'contaminantes' })
      .populate({
        path: 'diccionaryItem',
        select: 'fuenteDeConsumo subfuenteDeConsumo',
      })

    console.log(report.length)

    const reportOutput: reportItemsReponse[] = []

    for await (const reportItem of report) {
      const index = report.indexOf(reportItem)
      if (index != 0) continue

      const obj = {
        nivel1: reportItem.nivel1,
        nivel2: reportItem.nivel2,
        nivel3: reportItem.nivel3,
        nivel4: reportItem.nivel4,
        consumption: reportItem.value,
        costCenter: reportItem.area,
        fe: reportItem.contaminantes
          .map(cont => cont.value)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0,
          ),
        measureUnitFe: reportItem.contaminantes[0]?.measureUnit,
        contaminantes: reportItem.contaminantes.map(c => c.name),
      }

      console.log(obj)
    }
    // report.forEach(rep => {
    //   const obj = {
    //     nivel1: rep.nivel1,
    //     nivel2: rep.nivel2,
    //     nivel3: rep.nivel3,
    //     nivel4: rep.nivel4,
    //     consumption: rep.value,
    //     costCenter: rep.area,
    //     fe: rep.contaminantes
    //       .map(cont => cont.value)
    //       .reduce(
    //         (previousValue, currentValue) => previousValue + currentValue,
    //         0,
    //       ),
    //     measureUnitFe: rep.contaminantes[0]?.measureUnit,
    //     contaminantes: rep.contaminantes.map(c => c.name),
    //   }

    //   let emissions: number

    //   if (rep.nivel1 === 'Alcance 1')
    //     emissions = (obj.fe * obj.consumption) / 1000
    //   else if (rep.nivel1 === 'Alcance 2') emissions = obj.fe * obj.consumption
    //   else if (rep.nivel1 === 'Alcance 3') {
    //     if (
    //       rep.nivel3 === 'Alimento' ||
    //       rep.nivel2 === 'Transporte de carga' ||
    //       rep.nivel2 === 'Movilización de personas'
    //     )
    //       emissions = obj.fe * obj.consumption
    //     else emissions = (obj.fe * obj.consumption) / 1000
    //   }

    //   reportOutput.push({ ...obj, emissions })
    // })

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
