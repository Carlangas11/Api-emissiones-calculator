import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Report {
  @Field()
  ok: boolean;

  @Field()
  msg: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;
}