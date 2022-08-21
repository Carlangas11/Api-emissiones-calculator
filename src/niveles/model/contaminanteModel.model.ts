import { Field, ObjectType } from '@nestjs/graphql'
import { nivel2Model, nivel3Model, nivel4Model } from '.'

@ObjectType()
export class contaminanteModel {
    @Field({ nullable: true })
    name: string

    @Field({ nullable: true })
    value: number

    @Field({ nullable: true })
    measureUnit: string

    @Field({ nullable: true })
    nivel2: nivel2Model

    @Field({ nullable: true })
    nivel3: nivel3Model

    @Field({ nullable: true })
    nivel4: nivel4Model
}
