import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {

  @Field(() => ID, { description: 'User ID' })
  id: string;

  @Field({ description: 'User email' })
  email: string;

  @Field({ description: 'User password' })
  password: string;

}
