import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  _id: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;
}

@InputType()
export class FindUserInput {
  @Field({ nullable: true })
  _id: string;
}
