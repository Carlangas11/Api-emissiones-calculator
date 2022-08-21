import { Field, ObjectType } from '@nestjs/graphql'
import { nivel2Model, nivel3Model } from '.'

@ObjectType()
export class nivel4Model {

  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  nivel2: nivel2Model

  @Field({ nullable: true })
  nivel3: nivel3Model
}
