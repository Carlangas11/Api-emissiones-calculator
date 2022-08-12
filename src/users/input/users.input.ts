import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  _id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password?: string;
}

@InputType()
export class FindUserInput {
  @Field()
  @IsNotEmpty()
  _id: string;
}
