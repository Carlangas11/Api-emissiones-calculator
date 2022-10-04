import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class contaminantesDto {
  @Field()
  name: string
  @Field()
  value: number
  @Field()
  measureUnit: string
  @Field()
  emission: number
  @Field()
  emissionUnit: string
}

@ObjectType()
export class reportItemsReponse {
  @Field()
  nivel1: string

  @Field({ nullable: true })
  nivel2?: string

  @Field({ nullable: true })
  nivel3?: string

  @Field({ nullable: true })
  nivel4?: string

  @Field()
  consumption: number

  @Field()
  consumptionUnit: string

  @Field()
  costCenter: string

  @Field()
  period: string

  @Field()
  totalFe: number

  @Field()
  measureUnitFe: string

  @Field()
  totalEmission: number

  @Field()
  totalEmissionUnit: string

  @Field()
  fuenteDeConsumo: string

  @Field()
  subfuenteDeConsumo: string

  @Field(() => [contaminantesDto], { nullable: true })
  contaminantes?: contaminantesDto[]
}
