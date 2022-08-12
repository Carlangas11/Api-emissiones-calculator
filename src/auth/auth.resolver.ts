import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";

import { GqlAuthGuard } from "./guards";
import { AuthService } from "./auth.service";
import { LoginResponse, LoginUserInput } from "./dto";

@Resolver()
export class AuthResolver {

    constructor(private authService: AuthService) { }

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    async login(
        @Args('loginUserInput') loginUserInput: LoginUserInput,
        @Context() context: any
    ) {
        return this.authService.login(context.user._doc);
    }

}