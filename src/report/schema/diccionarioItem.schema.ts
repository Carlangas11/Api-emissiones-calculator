import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as SchemaMongoose } from 'mongoose'
// import { Contaminante } from '@src/niveles/schema'
import { Report } from '.'
import { Nivel1, Nivel2, Nivel3, Nivel4, MeasureUnit } from '@src/niveles/schema';
import { Contaminante } from '@src/niveles/schema'

@Schema()
export class DiccionarioItem extends Document {

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Diccionario' })
    diccionario: Report;

    @Prop({ required: true })
    fuenteDeConsumo: string;

    @Prop({ required: true })
    subfuenteDeConsumo: string;

    @Prop({ required: true })
    area: string;

    @Prop({ required: true })
    unidades: string;

    @Prop({ required: true })
    consumoAnual: number;

    @Prop({ required: true })
    periodo: string;

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Nivel1' })
    nivel1: Nivel1;

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Nivel2' })
    nivel2: Nivel2;

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Nivel3' })
    nivel3: Nivel3;

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Nivel4' })
    nivel4: Nivel4;

    // @Prop({ type: SchemaMongoose.Types.Array, ref: 'Contaminante'})
    @Prop([{ type: SchemaMongoose.Types.ObjectId, ref: 'Contaminante'}])
    contaminantes: Contaminante[];

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'MeasureUnit' })
    magnitud: MeasureUnit

    @Prop({ required: true, default: () => new Date() })
    createdAt: Date;

    @Prop({ required: false, default: null })
    updatedAt: Date;
}

export const DiccionarioItemSchema = SchemaFactory.createForClass(DiccionarioItem)