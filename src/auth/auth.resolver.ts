import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { AuthService } from "./auth.service";
import { LoginResponse } from "./dto/login-response.dto";
import { LoginUserInput } from "./dto/login-user.input";

@Resolver()
export class AuthResolver {

    constructor( private authService: AuthService ){}

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    async login(@Args('loginUserInput') loginUserInput: LoginUserInput ){
        return this.authService.login( loginUserInput );
    }

}