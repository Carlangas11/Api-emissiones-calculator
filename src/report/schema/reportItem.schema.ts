import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as SchemaMongoose } from 'mongoose'
import { Contaminante } from '@src/niveles/schema'
import { Report, DiccionarioItem } from '.'


@Schema()
export class ReportItem extends Document {
    
    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'Report' })
    report: Report;

    @Prop({ type: SchemaMongoose.Types.ObjectId, ref: 'DiccionarioItem' })
    diccionaryItem: DiccionarioItem;

    @Prop({ required: true })
    nivel1: string;

    @Prop()
    nivel2?: string;

    @Prop()
    nivel3?: string;
    
    @Prop()
    nivel4?: string;

    @Prop({ required: true })
    value: number;

    @Prop()
    measureUnit?: string;

    @Prop({ required: true })
    period: string;

    @Prop({ required: true})
    area: string;

    @Prop()
    factorFE?: number;

    @Prop()
    totalValue?: number;

    // @Prop({ type: SchemaMongoose.Types.Array, ref: 'Contaminante'})
    @Prop([{ type: SchemaMongoose.Types.ObjectId, ref: 'Contaminante'}])
    contaminantes: Contaminante[];

    @Prop({ required: true, default: () => new Date() })
    createdAt: Date;
}

export const ReportItemSchema = SchemaFactory.createForClass(ReportItem)