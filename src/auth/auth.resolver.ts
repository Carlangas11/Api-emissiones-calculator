import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { GqlAuthGuard, JwtAuthGuard } from './guards'
import { AuthService } from './auth.service'
import { LoginResponse, LoginUserInput } from './dto'
import { UserModel as User } from 'src/users/model/users.model'
import { CurrentUser } from 'src/common/helpers'
import { AuthUser } from './interfaces/payload.interface'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async session(@CurrentUser() user: AuthUser) {
    console.log(user)
    return this.authService.session(user.userId)
  }

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context: any,
  ) {
    return this.authService.login(context.user._doc)
  }
}
