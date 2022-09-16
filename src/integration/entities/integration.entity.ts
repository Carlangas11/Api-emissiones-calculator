import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IFormatoExcelDiccionario, IFormatoExcelImportacion } from '../interface/result.interface';

@ObjectType()
export class Integration {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

@ObjectType()
export class ParseExcelResponse {
  @Field()
  ok: boolean;

  @Field()
  msg: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  data: Array<IFormatoExcelImportacion>;
}


@ObjectType()
export class ParseExcelDiccionaryResponse {
  @Field()
  ok: boolean;

  @Field()
  msg: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  data: Array<IFormatoExcelDiccionario>;
}