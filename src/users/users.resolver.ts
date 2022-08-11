import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserDto } from './dto/users.dto';
import { FindUserInput, UpdateUserInput, UserInput } from './input/users.input';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }


  @Query(() => [UserDto], { name: 'users' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query(() => UserDto, { name: 'user' })
  async findOne(@Args('input') input: FindUserInput) {
    return await this.usersService.findOne(input);
  }

  @Mutation(() => UserDto, { description: 'This action adds a new user' })
  async createUser(@Args('input') input: UserInput) {
    return await this.usersService.create(input);
  }

  @Mutation(() => UserDto, { description: 'This action updates a #id user' })
  async updateUser(@Args('input') input: UpdateUserInput) {
    return await this.usersService.update(input);
  }

  @Mutation(() => String, { description: 'This action removes a #id user' })
  async removeUser(@Args('input') input: FindUserInput): Promise<any> {
    await this.usersService.remove(input._id);
    return 'User removed';
  }
}
