import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaMongoose } from "mongoose";
import { Nivel2, Nivel3, Nivel4 } from ".";

@Schema()
export class Contaminante extends Document {
 
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    value: number;

    @Prop({ required: true })
    measureUnit: string;

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Nivel2'})
    nivel2: Nivel2;

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Nivel3'})
    nivel3: Nivel3;

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Nivel4'})
    nivel4: Nivel4;

    @Prop({ required: true, default:() => new Date()})
    createdAt: Date;

    @Prop({ required: false, default: null})
    updatedAt: Date;
}

export const ContaminanteSchema = SchemaFactory.createForClass(Contaminante);