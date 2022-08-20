import { Field, ObjectType } from '@nestjs/graphql'
import { nivel1Model } from './nivel1Model.model'

@ObjectType()
export class nivel2Model {
  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  nivel1: nivel1Model
}
