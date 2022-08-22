import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class contaminanteOutput {
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

@ObjectType()
export class contaminanteResponse {
  @Field(() => [contaminanteOutput])
  contaminantes: contaminanteOutput[]

  @Field({ nullable: true })
  pagination?: string
}
