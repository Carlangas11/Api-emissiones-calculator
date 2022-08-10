import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserInputDto } from './dto/create-user.input';
import { UpdateUserInputDto } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { hashPassword } from '../common/helpers/encripter';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.getOrThrow<number>('defaultLimit');
  }

  private defaultLimit: number;

  async create(createUserInput: CreateUserInputDto) {
    createUserInput.email = createUserInput.email.toLocaleLowerCase();
    createUserInput.password = hashPassword(createUserInput.password);

    try {
      const user = await this.userModel.create(createUserInput);
      return user;
    } catch (error) {
      this.handleExceptions(error, 'create');
    }
  }


  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit , offset = 0 } = paginationDto;
    return this.userModel.find()
      .limit( limit )
      .skip( offset )
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserInput: UpdateUserInputDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleExceptions(error: any, action: string) {
    if (error.code === 11000) {
      throw new BadRequestException(`User exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't ${action} User - Check server logs`);
  }
}
