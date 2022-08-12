import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/users/model/users.model';

@ObjectType()
export class LoginResponse{
    @Field()
    access_token: string;

    @Field(() => UserModel)
    user: UserModel;
}


