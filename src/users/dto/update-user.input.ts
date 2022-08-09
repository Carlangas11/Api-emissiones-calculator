import { CreateUserInputDto } from './create-user.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserInputDto extends PartialType(CreateUserInputDto) {
  id: number;
}
