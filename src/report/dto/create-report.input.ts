import { InputType, Int, Field, ObjectType } from '@nestjs/graphql'
import { ESourceData, EStatusData } from '@src/common/enum'

@InputType()
export class CreateReportInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}

@InputType()
export class GenerateReportInput {
  @Field()
  consumoAnual: number

  @Field()
  alcance: number

  @Field()
  area: string

  @Field()
  fuenteDeConsumo: string

  @Field()
  subfuenteDeConsumo: string

  @Field()
  unidades: string
}

@ObjectType()
export class ReportOutPut {
  @Field(() => String)
  id: String

  @Field()
  ok: boolean

  @Field()
  msg: string

  @Field(() => Date)
  startDate: Date

  @Field()
  endDate: Date
}
