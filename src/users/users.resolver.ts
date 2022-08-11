import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserModel } from './model/users.model';
import { FindUserInput, UpdateUserInput, UserInput } from './input/users.input';
import { UsersService } from './users.service';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }


  @Query(() => [UserModel], { name: 'users', nullable: 'items' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query(() => UserModel, { name: 'user', nullable: true })
  async findOne(@Args('input') input: FindUserInput) {
    return await this.usersService.findOne(input);
  }

  @Mutation(() => UserModel, { description: 'This action adds a new user' })
  async createUser(@Args('input') input: UserInput) {
    return await this.usersService.create(input);
  }

  @Mutation(() => UserModel, { description: 'This action updates a #id user' })
  async updateUser(@Args('input') input: UpdateUserInput) {
    return await this.usersService.update(input);
  }

  @Mutation(() => String, { description: 'This action removes a #id user' })
  async removeUser(@Args('input') input: FindUserInput): Promise<any> {
    await this.usersService.remove(input._id);
    return 'User removed';
  }
}
