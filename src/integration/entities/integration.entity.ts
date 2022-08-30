import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IResultEntry } from '../interface/result.interface';

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
  data: Array<IResultEntry>;
}