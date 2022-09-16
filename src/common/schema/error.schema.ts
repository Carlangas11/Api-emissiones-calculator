import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as SchemaMongoose } from "mongoose";
import { EErrorSource } from '@enum';
import { IErrorDebugObject } from '@interfaces';

@Schema()
export class Error extends Document {

    @Prop({ required: true })
    operation: string;

    @Prop({ required: true, type: String, enum: EErrorSource })
    source: EErrorSource;

    @Prop({ type: SchemaMongoose.Types.ObjectId })
    relatedID: string;

    @Prop({ required: true })
    description : string;

    @Prop({ required: true })
    line: number;

    @Prop({ required: true, type: SchemaMongoose.Types.Mixed })
    debugData: IErrorDebugObject;

    @Prop({ required: true, default: () => new Date() })
    createdAt: Date;

    @Prop({ required: false, default: null })
    updatedAt: Date;
}

export const ErrorSchema = SchemaFactory.createForClass(Error)