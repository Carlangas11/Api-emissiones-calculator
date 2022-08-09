import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {

    @Prop({ 
        unique: true,
        required: true,
        index: true,
    })
    email: string;

    @Prop({
        required: true,
    })
    password: string;
}
