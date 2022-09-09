import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class reportItemsReponse {
  @Field()
  nivel1: string

  @Field({ nullable: true })
  nivel2: string

  @Field({ nullable: true })
  nivel3: string

  @Field({ nullable: true })
  nivel4: string

  @Field()
  consumption: number

  @Field()
  costCenter: string

  @Field()
  fe: number

  @Field({ nullable: true })
  measureUnitFe: string

  @Field()
  emissions: number

  @Field(() => [String])
  contaminantes: string[]
}
