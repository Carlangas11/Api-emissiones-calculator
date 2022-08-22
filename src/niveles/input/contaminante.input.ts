import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class ContaminanteInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    name: string

    @Field()
    @IsNotEmpty()
    @IsNumber()
    value: number

    @Field()
    @IsNotEmpty()
    @IsString()
    measureUnit: string

    @Field()
    @IsNotEmpty()
    @IsString()
    nivel2: string

    @Field()
    @IsNotEmpty()
    @IsString()
    nivel3: string

    @Field()
    @IsNotEmpty()
    @IsString()
    nivel4: string
}
@InputType()
export class UpdateContaminanteInput {
    
    @Field()
    @IsNotEmpty()
    _id: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    name?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    value?: number

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    measureUnit?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    nivel2?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    nivel3?: string

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    nivel4?: string

}