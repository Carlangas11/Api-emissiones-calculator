import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class nivel1Model {
  @Field()
  name: string
}
