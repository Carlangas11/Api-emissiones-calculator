import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as SchemaMongoose } from 'mongoose'
import { Nivel1, Nivel2, Nivel3, Nivel4 } from 'src/niveles/schema'
import { Report, ReportResult } from '.'


@Schema()
export class ReportItem extends Document {
    
    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Report' })
    report: Report

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Nivel1' })
    nivel1: Nivel1

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Nivel2' })
    nivel2: Nivel2

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Nivel3' })
    nivel3: Nivel3

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Nivel4' })
    nivel4: Nivel4

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'ReportResult' })
    result: ReportResult[]

    //valor indicado en excel
    @Prop({ required: true })
    value: number

    @Prop({ required: true })
    unidadMedida: string

    @Prop({ required: true })
    periodo: string

    @Prop({ required: true })
    area: string

    @Prop({ required: true, default: () => new Date() })
    createdAt: Date
}

export const ReportItemSchema = SchemaFactory.createForClass(ReportItem)