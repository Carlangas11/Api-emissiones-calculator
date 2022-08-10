import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/create-user.input';
import { UpdateUserInputDto } from './dto/update-user.input';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInputDto) {
    return await this.usersService.create(createUserInput);
  }

  @Query('users')
  async findAll(@Args('paginationDto') paginationDto: PaginationDto) {
    return await this.usersService.findAll(paginationDto);
  }

  @Query('user')
  async findOne(@Args('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Mutation('updateUser')
  async update(@Args('updateUserInput') updateUserInput: UpdateUserInputDto) {
    return await this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  async remove(@Args('id') id: number) {
    return await this.usersService.remove(id);
  }
}
