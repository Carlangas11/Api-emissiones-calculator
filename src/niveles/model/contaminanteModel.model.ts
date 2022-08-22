import { Field, ObjectType } from '@nestjs/graphql'
import { nivel2Model, nivel3Model, nivel4Model } from '.'

@ObjectType()
export class contaminanteModel {
  @Field()
  _id: string

  @Field()
  name: string

  @Field()
  value: number

  @Field()
  measureUnit: string

  @Field()
  nivel2: nivel2Model

  @Field()
  nivel3: nivel3Model

  @Field()
  nivel4: nivel4Model
}
