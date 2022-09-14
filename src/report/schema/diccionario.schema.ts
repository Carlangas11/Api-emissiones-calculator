import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { SourceData, StatusData } from '@enum';

@Schema()
export class Diccionario extends Document {

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, default: () => new Date() })
    createdAt: Date;

    @Prop({ required: false, default: null })
    updatedAt: Date;
}

export const DiccionarioSchema = SchemaFactory.createForClass(Diccionario)