import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as SchemaMongoose } from 'mongoose'
import { ReportItem } from '.'


@Schema()
export class ReportItemError extends Document {
    
    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'ReportItem' })
    reportItem: ReportItem;

    @Prop({ required: true })
    errorCode: number;

    @Prop({ required: true })
    errorMessage: string;

    @Prop()
    lineNumber?: number;

    @Prop({ required: true, default: () => new Date() })
    createdAt: Date;
}

export const ReportItemErrorSchema = SchemaFactory.createForClass(ReportItemError)