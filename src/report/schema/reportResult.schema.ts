import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as SchemaMongoose } from 'mongoose'
import { Contaminante } from 'src/niveles/schema'
import { ReportItem } from '.'


@Schema()
export class ReportResult extends Document {

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'ReportItem' })
    reportItem: ReportItem

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Contaminante' })
    contaminante: Contaminante

    @Prop({ required: true })
    value: number

    @Prop({ required: true })
    periodo: string

    @Prop({ required: true, default: () => new Date() })
    createdAt: Date

    @Prop({ required: false, default: null })
    updatedAt: Date
}

export const ReportResultSchema = SchemaFactory.createForClass(ReportResult)