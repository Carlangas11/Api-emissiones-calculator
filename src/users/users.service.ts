import { Injectable } from '@nestjs/common';
import { CreateUserInputDto } from './dto/create-user.input';
import { UpdateUserInputDto } from './dto/update-user.input';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInputDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInputDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
