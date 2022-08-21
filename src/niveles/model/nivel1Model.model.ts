import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class nivel1Model {

  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string
}