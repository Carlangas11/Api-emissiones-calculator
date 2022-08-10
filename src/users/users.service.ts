import { Injectable } from '@nestjs/common';
import { UserInput } from './input/user.input';
import { UpdateUserInput } from './input/update-user.input';

@Injectable()
export class UsersService {
  create(userInput: UserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
