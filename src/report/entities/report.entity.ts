import { ObjectType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

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

  @Field()
  @IsOptional()
  diccionaryID?: string;
  
}