import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;
    
    @Prop({ required: true, default:() => new Date()})
    createdAt: Date;

    @Prop({ required: false, default: null})
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);