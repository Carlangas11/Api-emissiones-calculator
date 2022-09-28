import { Field, ObjectType } from "@nestjs/graphql"
import { EStatusData } from "@src/common/enum"

@ObjectType()
export class ReportDeleteOutDto {
  @Field(() => String)
  id: String

  @Field(() => String)
  description: String

  @Field(() => String)
  status: EStatusData

}