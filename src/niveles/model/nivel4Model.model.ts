import { Field, ObjectType } from '@nestjs/graphql'
import { nivel2Model } from './nivel2Model.model'
import { nivel3Model } from './nivel3Model.model'

@ObjectType()
export class nivel4Model {
  @Field()
  name: string

  @Field()
  nivel2: nivel2Model

  @Field()
  nivel3: nivel3Model
}
