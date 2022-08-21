import { Field, ObjectType } from '@nestjs/graphql'
import { nivel2Model } from '.'

@ObjectType()
export class nivel3Model {

  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  nivel2: nivel2Model
}
