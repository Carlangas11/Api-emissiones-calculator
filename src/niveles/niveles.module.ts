import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Contaminante, ContaminanteSchema, Nivel1, Nivel1Schema, Nivel2, Nivel2Schema, Nivel3, Nivel3Schema, Nivel4, Nivel4Schema} from './schema';
import { NivelesService } from './niveles.service';
import { NivelesResolver } from './niveles.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Nivel1.name, schema: Nivel1Schema },
      { name: Nivel2.name, schema: Nivel2Schema },
      { name: Nivel3.name, schema: Nivel3Schema },
      { name: Nivel4.name, schema: Nivel4Schema },
      { name: Contaminante.name, schema: ContaminanteSchema },
    ]),
  ],
  providers: [NivelesResolver, NivelesService],
  exports: [NivelesService],
})
export class NivelesModule {}
