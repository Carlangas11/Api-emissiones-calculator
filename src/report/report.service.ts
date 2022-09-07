import { Inject, Injectable } from '@nestjs/common';

import { Report } from './entities/report.entity';
import { CreateReportInput } from './dto/create-report.input';
import { UpdateReportInput } from './dto/update-report.input';
import { IntegrationService } from 'src/integration/integration.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contaminante, Nivel1, Nivel2, Nivel3, Nivel4 } from 'src/niveles/schema';

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
  ) { }

  async generateReport(): Promise<Report> {
    const startDate = new Date();

    const { ok, data, msg } = await this.integrationService.parseExcel();
    if (!ok)
      throw new Error(msg);
    console.log(data.length);
    console.log(data[0]);
    const calculatedResult = data.map(async (entry, index) => {

      try {
        console.log(`evaluating index: ${index}`);
        console.log(await this.nivel1Model.findOne({ name: entry.Alcance }))

        // // TODO: ocupar FOREACH, PARA EVITAR CONDICION DE CARRERA QUE EVITA QUE LO DE ABAJO FUNCIONE CORRECTAMENTE


        // const { _id: nivel1ID } = await this.nivel1Model.findOne({ name: entry.Alcance });
        // console.log(nivel1ID);
        // const { _id: nivel2ID } = await this.nivel2Model.findOne({
        //   where: {
        //     $and: [
        //       { name: entry['Nivel 2'] },
        //       { nivel1: {$eq: nivel1ID} },
        //     ],
        //   }
        // });
        // console.log(nivel2ID);
        // const { _id: nivel3ID } = await this.nivel3Model.findOne({
        //   where: {
        //     $and: [
        //       { name: entry['Nivel 3'] },
        //       { nivel2: nivel2ID },
        //     ],
        //   }
        // });

        // const { _id: nivel4ID } = await this.nivel4Model.findOne({
        //   where: {
        //     $and: [
        //       { name: entry['Nivel 4'] },
        //       { nivel3: nivel3ID },
        //       { nivel2: nivel2ID },
        //     ],
        //   }
        // });

        // const contaminantes = await this.contaminanteModel.find({
        //   where: {
        //     $and: [
        //       { nivel4: nivel4ID },
        //       { nivel3: nivel3ID },
        //       { nivel2: nivel2ID },
        //     ],
        //   }
        // });

        // console.log(
          // nivel1ID,
          // nivel2ID,
          // nivel3ID,
          // nivel4ID,
          // { contaminantesLength: contaminantes.length, ...contaminantes },
        // )

        return;

      } catch (err) {
        //Handle this error somehow in the future, this is when the search fail
        return;
      }
    });

    return {
      ok: true,
      msg: 'Report generated successfully',
      startDate,
      endDate: new Date(),
    }
  }
}
