import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportResolver } from './report.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { IntegrationModule } from '@src/integration/integration.module';
import { Contaminante, ContaminanteSchema, Nivel1, Nivel1Schema, Nivel2, Nivel2Schema, Nivel3, Nivel3Schema, Nivel4, Nivel4Schema } from '@src/niveles/schema';

import { Report, ReportItem, ReportItemSchema, ReportResult, ReportResultSchema, ReportSchema } from './schema';
import { Mutex, Semaphore } from 'async-mutex';

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
      { name: ReportResult.name, schema: ReportResultSchema },
    ]),
  ],
  providers: [ReportResolver, ReportService, Mutex, Semaphore]
})
export class ReportModule {  }
