import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as SchemaMongoose } from 'mongoose'
import { IMesureUnitsEquivalent } from '@interfaces';

@Schema()
export class MeasureUnit extends Document {

    @Prop({ required: true })
    magnitud: string;

    @Prop({ required: true })
    si: string;

    @Prop({ required: true, type: SchemaMongoose.Types.Array })
    equivalencias: IMesureUnitsEquivalent[];

    @Prop({ required: true, default: () => new Date() })
    createdAt: Date

    @Prop({ required: false, default: null })
    updatedAt: Date
}

export const MeasureUnitSchema = SchemaFactory.createForClass(MeasureUnit)
