import { Field, ObjectType } from '@nestjs/graphql'
// import { nivel2Model, nivel3Model, nivel4Model } from '.'

@ObjectType()
export class contaminanteResponse {
  @Field()
  _id: string

  @Field()
  name: string

  @Field()
  value: number

  @Field()
  measureUnit: string

  @Field()
  nivel1: string

  @Field()
  nivel2: string

  @Field()
  nivel3: string

  @Field()
  nivel4: string
}
