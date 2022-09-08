import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mutex, MutexInterface, Semaphore, SemaphoreInterface, withTimeout } from 'async-mutex';


import { CreateReportInput } from './dto/create-report.input';
import { UpdateReportInput } from './dto/update-report.input';
import { IntegrationService } from '@src/integration/integration.service';
import { Contaminante, Nivel1, Nivel2, Nivel3, Nivel4 } from '@src/niveles/schema';
import { Report } from './schema/report.schema';

@Injectable()
export class ReportService {

  constructor(
    private readonly integrationService: IntegrationService,
    @InjectModel(Nivel1.name)
    private nivel1Model: Model<Nivel1>,
    @InjectModel(Nivel2.name)
    private nivel2Model: Model<Nivel2>,
    @InjectModel(Nivel3.name)
    private nivel3Model: Model<Nivel3>,
    @InjectModel(Nivel4.name)
    private nivel4Model: Model<Nivel4>,
    @InjectModel(Contaminante.name)
    private contaminanteModel: Model<Contaminante>,

    @InjectModel(Report.name)
    private reportModel: Model<Report>,


    private mutex: Mutex,
    private semaphore: Semaphore,

  ) {
    this.mutex = new Mutex();
  }

  async generateReport(): Promise<any> {
    const startDate = new Date();

    const { ok, data, msg } = await this.integrationService.parseExcel();
    if (!ok)
      throw new Error(msg);
    console.log(data.length);
    console.log(data[0]);

    //TODO: DONT RETURN ANYTHING UNTIL THE PROCESS IS COMPLETE

    data.forEach(async (entry, index) => {

      await this.mutex.runExclusive(async () => {

        //TODO: INSERT REPORT IN REPORT COLLECTION
        //TODO: INSERT REPORTITEM IN REPORTITEM COLLECTION
        if (index > 0) return;

        console.log(`Starting for index ${index + 2}`);
        // //CHECK LEVEL1 IN BD
        // console.log(`findNivel1 for index ${index+2} and nivel1 ${entry.Alcance}`);
        // const { _id: nivel1ID = undefined } = await this.nivel1Model.findOne({ name: String(entry.Alcance).trim() });
        // console.log(`-- ${nivel1ID}`);

        // //IF LEVEL2 NOT EXIST, OMMIT THIS LINE (ERROR, CANT CALCULATE)
        // if(!entry['Nivel 2']) return;

        // //CHECK LEVEL2 IN BD
        // console.log(`findNivel2 for index ${index+2} and nivel2 ${entry['Nivel 2']}`);
        // const { _id: nivel2ID = undefined } = await this.nivel2Model.findOne({ name: String(entry['Nivel 2']).trim() });
        // console.log(`-- ${nivel2ID}`);

        //TODO: CHECK LEVEL3 IN BD WITH DATA OF LEVEL2
        //TODO: CHECK LEVEL4 IN BD WITH DATA OF LEVEL2 & LEVEL3
        //TODO: CHECK CONTAMINANTE IN BD WITH DATA OF LEVEL2 & LEVEL3 & LEVEL4

        //TODO: CALCULATE THE DATA AND INSERT IN REPORTRESULT COLLECTION


        console.log(entry['Nivel 2']);
        const resp = await this.contaminanteModel
          .aggregate()
          .lookup({
            from: 'nivel2',
            localField: 'nivel2',
            foreignField: '_id',
            as: 'nivel2',
          })
          .match({
            'nivel2.name': entry['Nivel 2'],
          })
          .lookup({
            from: 'nivel3',
            localField: 'nivel3',
            foreignField: '_id',
            as: 'nivel3',
          })
          .match({
            'nivel3.name': entry['Nivel 3'],
          })
          .lookup({
            from: 'nivel4',
            localField: 'nivel4',
            foreignField: '_id',
            as: 'nivel4',
          })
          .match({
            'nivel4.name': entry['Nivel 4'],
          })

        console.log(`Tamaño resp: ${resp.length}`);
        console.log("resp: ", resp);
        console.log(`Finished for index ${index + 2}`);
      });

    });

    return {
      ok: true,
      msg: 'Report process started successfully',
      startDate,
      endDate: new Date(),
    }
  }
}
