import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportResolver } from './report.resolver';
import { IntegrationModule } from 'src/integration/integration.module';
import { Contaminante, ContaminanteSchema, Nivel1, Nivel1Schema, Nivel2, Nivel2Schema, Nivel3, Nivel3Schema, Nivel4, Nivel4Schema } from 'src/niveles/schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    IntegrationModule,
    MongooseModule.forFeature([
      { name: Nivel1.name, schema: Nivel1Schema },
      { name: Nivel2.name, schema: Nivel2Schema },
      { name: Nivel3.name, schema: Nivel3Schema },
      { name: Nivel4.name, schema: Nivel4Schema },
      { name: Contaminante.name, schema: ContaminanteSchema },
    ]),
  ],
  providers: [ReportResolver, ReportService]
})
export class ReportModule {  }
