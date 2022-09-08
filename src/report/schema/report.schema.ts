import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { SourceData, StatusData } from '@enum';

@Schema()
export class Report extends Document {
    @Prop({ required: true, unique: true })
    name: string

    @Prop({ required: true, type: String, enum: SourceData })
    source: SourceData;

    @Prop({ required: true, type: String, enum: StatusData })
    status: StatusData;

    @Prop({ required: true, default: () => new Date() })
    createdAt: Date

    @Prop({ required: false, default: null })
    updatedAt: Date
}

export const ReportSchema = SchemaFactory.createForClass(Report)
