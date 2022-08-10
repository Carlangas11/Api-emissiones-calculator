import { UserInput } from './user.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(UserInput) {
  @Field(() => ID)
  id: string;
}
