import { Field, ObjectType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@ObjectType()
export class UserModel{
    @Field()
    _id: string;

    @Field()
    email: string;

    @Field()
    @IsOptional()
    password?: string;

    @Field()
    createdAt: Date;

    @Field({nullable: true})
    updatedAt: Date;
}