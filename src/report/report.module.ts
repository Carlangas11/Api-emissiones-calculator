import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportResolver } from './report.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { IntegrationModule } from '@src/integration/integration.module';
import { Contaminante, ContaminanteSchema, Nivel1, Nivel1Schema, Nivel2, Nivel2Schema, Nivel3, Nivel3Schema, Nivel4, Nivel4Schema, MeasureUnit, MeasureUnitSchema } from '@src/niveles/schema';

import { Report, ReportItem, ReportItemSchema, ReportSchema, Diccionario, DiccionarioItem, DiccionarioItemSchema, DiccionarioSchema } from './schema';
import { Mutex, Semaphore } from 'async-mutex';
import { Error, ErrorSchema } from '@common/schema/error.schema';

@Module({
  imports: [
    IntegrationModule,
    MongooseModule.forFeature([
      { name: Nivel1.name, schema: Nivel1Schema },
      { name: Nivel2.name, schema: Nivel2Schema },
      { name: Nivel3.name, schema: Nivel3Schema },
      { name: Nivel4.name, schema: Nivel4Schema },
      { name: Contaminante.name, schema: ContaminanteSchema },

      { name: Report.name, schema: ReportSchema },
      { name: ReportItem.name, schema: ReportItemSchema },


      { name: MeasureUnit.name, schema: MeasureUnitSchema },
      { name: Diccionario.name, schema: DiccionarioSchema },
      { name: DiccionarioItem.name, schema: DiccionarioItemSchema },

      { name: Error.name, schema: ErrorSchema },
    ]),
  ],
  providers: [ReportResolver, ReportService, Mutex, Semaphore],
  exports: [ReportService],
})
export class ReportModule {  }
