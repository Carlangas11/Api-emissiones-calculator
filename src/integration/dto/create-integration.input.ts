import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateIntegrationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
