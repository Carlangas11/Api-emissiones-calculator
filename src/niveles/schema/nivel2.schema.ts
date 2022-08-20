import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaMongoose } from "mongoose";
import { Nivel1 } from ".";

@Schema()
export class Nivel2 extends Document {

    @Prop({ required: true })
    name: string;

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Nivel1'})
    nivel1: Nivel1;

    @Prop({ required: true, default:() => new Date()})
    createdAt: Date;

    @Prop({ required: false, default: null})
    updatedAt: Date;
}

export const Nivel2Schema = SchemaFactory.createForClass(Nivel2);
