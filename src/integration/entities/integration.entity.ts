import { ObjectType, Field, Int } from '@nestjs/graphql'
import { GenerateReportInput } from '@src/report/dto/create-report.input'
import {
  IFormatoExcelDiccionario,
  IFormatoExcelImportacion,
  IFormatoExcelMultiXImportacion,
} from '../interface/result.interface'

@ObjectType()
export class Integration {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}

@ObjectType()
export class ParseExcelResponse {
  @Field()
  ok: boolean

  @Field()
  msg: string

  @Field()
  startDate: Date

  @Field()
  endDate: Date

  @Field()
  data: Array<IFormatoExcelImportacion>
}

@ObjectType()
export class ParseExcelMultiXResponse {
  @Field()
  ok: boolean

  @Field()
  msg: string

  @Field()
  startDate: Date

  @Field()
  endDate: Date

  @Field()
  data: Array<GenerateReportInput>
}

@ObjectType()
export class ParseExcelDiccionaryResponse {
  @Field()
  ok: boolean

  @Field()
  msg: string

  @Field()
  startDate: Date

  @Field()
  endDate: Date

  @Field()
  data: Array<IFormatoExcelDiccionario>
}
