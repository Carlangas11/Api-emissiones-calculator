import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateReportInput } from './create-report.input';

@InputType()
export class UpdateReportInput extends PartialType(CreateReportInput) {
  @Field(() => Int)
  id: number;
}
