import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaMongoose } from "mongoose";
import { Nivel2 } from ".";

@Schema()
export class Nivel3 extends Document {

    @Prop({ required: true })
    name: string;

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Nivel2'})
    nivel2: Nivel2;

    @Prop({ required: true, default:() => new Date()})
    createdAt: Date;

    @Prop({ required: false, default: null})
    updatedAt: Date;
}

export const Nivel3Schema = SchemaFactory.createForClass(Nivel3);