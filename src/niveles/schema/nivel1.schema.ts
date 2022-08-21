import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Nivel1 extends Document {
  @Prop({ required: true, unique: true })
  name: string

  @Prop({ required: true, default: () => new Date() })
  createdAt: Date

  @Prop({ required: false, default: null })
  updatedAt: Date
}

export const Nivel1Schema = SchemaFactory.createForClass(Nivel1)
