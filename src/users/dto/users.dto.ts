import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserDto{
    @Field()
    _id: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    createdAt: Date;

    @Field({nullable: true})
    updatedAt: Date;
}