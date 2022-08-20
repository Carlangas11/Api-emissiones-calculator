import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { hashPassword } from 'src/common/helpers/encripter'
import { FindUserInput, UserInput, UpdateUserInput } from './input/users.input'
import { UserModel } from './model/users.model'
import { User } from './schema/users.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findById(id: string): Promise<UserModel> {
    return this.userModel.findById(id).exec()
  }

  async create(userInput: UserInput) {
    userInput.email = userInput.email.toLocaleLowerCase()
    userInput.password = await hashPassword(userInput.password)
    try {
      const user = await this.userModel.create(userInput)
      return user
    } catch (error) {
      this.handleExceptions(error, 'create')
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find()
  }

  async findOne(user: FindUserInput): Promise<User> {
    return await this.userModel.findById(user._id)
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email.toLowerCase() })
  }

  async update(user: UpdateUserInput): Promise<User> {
    const userDb = await this.userModel.findById(user._id)

    if (user.email) {
      user.email = user.email.toLowerCase()
      userDb.email = user.email
    }
    if (user.password) {
      user.password = await hashPassword(user.password)
      userDb.password = user.password
    }

    try {
      await userDb.updateOne(user, { new: true })
      return userDb
    } catch (error) {
      this.handleExceptions(error, 'update')
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.userModel.deleteOne({ _id: id })
    if (deletedCount === 0)
      throw new NotFoundException(`User with id "${id}" not found`)
    return true
  }

  private handleExceptions(error: any, action: string) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `User exists in db ${JSON.stringify(error.keyValue)}`,
      )
    }
    console.log(error)
    throw new InternalServerErrorException(
      `Can't ${action} User - Check server logs`,
    )
  }
}
