import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class Nivel1Input {
    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;
}

@InputType()
export class UpdateNivel1Input {
    @Field()
    @IsNotEmpty()
    _id: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;
}