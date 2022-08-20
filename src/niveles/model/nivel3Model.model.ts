import { Field, ObjectType } from '@nestjs/graphql'
import { nivel2Model } from './nivel2Model.model'

@ObjectType()
export class nivel3Model {
  @Field()
  name: string

  @Field()
  nivel2: nivel2Model
}
