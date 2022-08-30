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
    if(!ok) 
      throw new Error(msg);
    console.log(data.length);
    console.log(data[0]);
    const calculatedResult = data.map(async (entry, index) => {
      if(index>0)
        return;

      const emisionGEI = entry['EmisionesGEI(tCO2e)'];
      const { Alcance, FuenteDeConsumo, SubfuenteDeConsumo, Area, Unidades, ConsumoAnnual } = entry;

      const {_id: nivel1ID} = await this.nivel1Model.findOne({ name: `Alcance ${ Alcance }` });
      const resultLevel2 = await this.nivel2Model.find({ nivel1: nivel1ID });
      console.log(resultLevel2);

      



    });

    return {
      ok: true,
      msg: 'Report generated successfully',
      startDate,
      endDate: new Date(),
    }
  }
}
