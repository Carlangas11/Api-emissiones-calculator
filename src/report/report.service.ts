import { Injectable } from '@nestjs/common'
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
import { IFormatoExcelImportacion } from '@src/integration/interface/result.interface'
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
  ) { }

  async generateReport(): Promise<any> {
    const startDate = new Date()
    const { ok, data, msg } = await this.integrationService.parseExcel()
    if (!ok) throw new Error(msg)
    console.log(`Total registros: `, data.length)

    const reportDocument = await this.reportModel.create({
      name: `Reporte ${startDate.toISOString()}`,
      source: ESourceData.excel,
      status: EStatusData.processing,
    })

    //DONE: DONT RETURN UNTIL THE PROCESS IS COMPLETE
    for await (const entry of data) {
      const index = data.indexOf(entry)
      console.log(`Checking Line ${index + 2}`)
      // if (index > 13) break;
      // if (index > 28) break;

      const resp: IContaminanteDataResponse[] = await this.contaminanteModel
        .aggregate()
        .lookup({
          from: 'nivel2',
          localField: 'nivel2',
          foreignField: '_id',
          as: 'nivel2',
        })
        .match({
          'nivel2.name': !!entry['Nivel 2']
            ? entry['Nivel 2'].trim()
            : undefined,
        })
        .lookup({
          from: 'nivel3',
          localField: 'nivel3',
          foreignField: '_id',
          as: 'nivel3',
        })
        .match({
          'nivel3.name': !!entry['Nivel 3']
            ? entry['Nivel 3'].trim()
            : undefined,
        })
        .lookup({
          from: 'nivel4',
          localField: 'nivel4',
          foreignField: '_id',
          as: 'nivel4',
        })
        .match({
          'nivel4.name': !!entry['Nivel 4']
            ? entry['Nivel 4'].trim()
            : undefined,
        })
        .lookup({
          from: 'nivel1',
          localField: 'nivel2.nivel1',
          foreignField: '_id',
          as: 'nivel1',
        })
        .match({
          'nivel1.name': !!entry.Alcance ? entry.Alcance.trim() : undefined,
        })

      try {
        await this.checkEntry(entry, index + 2)
      } catch (err: any) {
        // await this.saveError(entry, err, index + 2)
        console.log(err.message)
        continue
      }

      const contaminantes = resp.map(r => {
        const obj = {
          _id: r._id,
          name: r.name,
          value: r.value,
        }
        return obj
      })

      const totalValue = contaminantes
        .map(cont => cont.value)
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0,
        )

      const reportItemObj: Partial<ReportItem> = {
        report: reportDocument._id,
        nivel1: entry.Alcance,
        nivel2: entry['Nivel 2'],
        value: entry.Valor,
        period: entry.Periodo,
        area: entry.Area,
        factorFE: !!entry['Factor FE'] ? entry['Factor FE'] : undefined,
        totalValue: totalValue,
      }

      // if (totalValue === 0)
      //   return await this.reportItemModel.create(reportItemObj);

      reportItemObj.nivel3 = entry['Nivel 3']
      reportItemObj.nivel4 = entry['Nivel 4']
      reportItemObj.measureUnit = entry['Unidad de Medida']

      const contaminanteRelated: Contaminante[] = []

      for await (const respuesta of resp) {
        const contaminanteDoc = await this.contaminanteModel.findById(
          respuesta._id,
        )
        contaminanteRelated.push(contaminanteDoc._id.toString())
      }
      reportItemObj.contaminantes = contaminanteRelated
      await this.reportItemModel.create(reportItemObj)

      console.log('entry: ', { ...entry, totalValue, contaminantes })
      console.log(`Tamaño resp: ${resp.length}`)
      // console.log(`resp: `, resp);
      console.log(`Finished Line ${index + 2}`)
    }

    reportDocument.status = EStatusData.completed
    await reportDocument.save()

    return {
      ok: true,
      msg: 'Report finished successfully',
      startDate,
      endDate: new Date(),
    }
  }

  async checkEntry(
    entry: IFormatoExcelImportacion,
    index: number,
  ): Promise<void | IValidateLineError> {
    const minimalData = [
      'Alcance',
      'Nivel 2',
      'Valor',
      'Periodo',
      'Area',
      'Factor FE',
    ]
    const optimalRawData = [
      ...minimalData,
      'Nivel 3',
      'Nivel 4',
      'Unidad de medida',
    ]
    const optimalData = optimalRawData.filter(key => key !== 'Factor FE')

    //All optimal data is present
    if (optimalData.every(key => entry.hasOwnProperty(key))) return

    //All minimal data is present
    if (minimalData.every(key => entry.hasOwnProperty(key))) return

    //error the line is not valid, dont process it
    throw {
      code: 400,
      message: `Excel Line ${index} is missing data`,
    }
  }

  // async saveError(reportItem: string, err: IValidateLineError, lineNumber: number): Promise<any> {

  //   const { code: errorCode, message: errorMessage } = err;
  //   const report = await this.reportItemErrorModel.create({
  //     reportItem,
  //     errorCode,
  //     errorMessage,
  //     lineNumber
  //   });

  //   return await report.save();
  // }

  async getReportItems(): Promise<reportItemsReponse[]> {
    const report = await this.reportItemModel
      .find()
      .populate({ path: 'contaminantes' })

    const reportOutput: reportItemsReponse[] = []

    report.forEach(rep => {
      const obj = {
        nivel1: rep.nivel1,
        nivel2: rep.nivel2,
        nivel3: rep.nivel3,
        nivel4: rep.nivel4,
        consumption: rep.value,
        costCenter: rep.area,
        fe: rep.contaminantes
          .map(cont => cont.value)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0,
          ),
        measureUnitFe: rep.contaminantes[0]?.measureUnit,
        contaminantes: rep.contaminantes.map(c => c.name),
      }

      let emissions: number

      if (rep.nivel1 === 'Alcance 1')
        emissions = (obj.fe * obj.consumption) / 1000
      else if (rep.nivel1 === 'Alcance 2') emissions = obj.fe * obj.consumption
      else if (rep.nivel1 === 'Alcance 3') {
        if (
          rep.nivel3 === 'Alimento' ||
          rep.nivel2 === 'Transporte de carga' ||
          rep.nivel2 === 'Movilización de personas'
        )
          emissions = obj.fe * obj.consumption
        else emissions = (obj.fe * obj.consumption) / 1000
      }

      reportOutput.push({ ...obj, emissions })
    })

    return reportOutput
  }


  async generateDiccionary(): Promise<any> {

    const startDate = new Date()
    const { ok, data, msg } = await this.integrationService.parseDiccionaryExcel()
    if (!ok) throw new Error(msg)
    // console.log(`Total registros: `, data.length)

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
      name: `Diccionario ${startDate.toISOString()}`
    })

    const arrayErrors: IError[] = [];

    for await (const entry of data) {
      const index = data.indexOf(entry)

      // if (index !== 23) continue
      // console.log(`Testing index ${index}`)

      const resp: INivel4ModelResponse[] = await this.nivel4Model
        .aggregate([{
          $match: {
            name: entry.Nivel4,
          },
        }])
        .lookup({
          from: 'nivel3',
          localField: 'nivel3',
          foreignField: '_id',
          as: 'nivel3',
        })
        .match({
          'nivel3.name': !!entry.Nivel3
            ? entry.Nivel3.trim()
            : undefined,
        })
        .lookup({
          from: 'nivel2',
          localField: 'nivel2',
          foreignField: '_id',
          as: 'nivel2',
        })
        .match({
          'nivel2.name': !!entry.Nivel2
            ? entry.Nivel2.trim()
            : undefined,
        })
        .lookup({
          from: 'nivel1',
          localField: 'nivel2.nivel1',
          foreignField: '_id',
          as: 'nivel1',
        })
        .match({
          'nivel1.name': !!entry.Nivel1
            ? entry.Nivel1.trim()
            : undefined,
        })

      const respMeasureUnit = await this.measureUnitModel.findOne({
        magnitud: entry.Magnitud,
      })

      const idsFound = {
        nivel1: resp[0]?.nivel1[0]?._id,
        nivel2: resp[0]?.nivel2[0]?._id,
        nivel3: resp[0]?.nivel3[0]?._id,
        nivel4: resp[0]?._id,
        measureUnit: respMeasureUnit._id,
      }

      if (objectHaveUndefined(idsFound)) {
        arrayErrors.push({
          operation: 'generateDiccionary',
          source: EErrorSource.diccionary,
          relatedID: diccionarioDocument._id,
          description: `Error en el registro linea ${index + 2}, no se encuentan algunos de los niveles al crear registro de diccionario para esta fila`,
          line: index + 2,
          debugData: idsFound
        })
        continue
      }

      await this.diccionarioItemModel.create({
        diccionario: diccionarioDocument._id,
        fuenteDeConsumo: entry.FuenteDeConsumo,
        subfuenteDeConsumo: entry.SubfuenteDeConsumo,
        area: entry.Area,
        unidades: entry.Unidades,
        consumoAnual: entry[' ConsumoAnual '],
        periodo: entry.Periodo,
        nivel1: idsFound.nivel1,
        nivel2: idsFound.nivel2,
        nivel3: idsFound.nivel3,
        nivel4: idsFound.nivel4,
        magnitud: idsFound.measureUnit,
      });


    }

    if (arrayErrors.length > 0) await this.errorModel.insertMany(arrayErrors)

    return {
      ok: true,
      msg: 'Diccionary generated successfully',
      startDate,
      endDate: new Date(),
      diccionaryID: diccionarioDocument._id
    }

  }
}
