import { IsString, MinLength } from "class-validator";

export class CreateUserInputDto {

    @IsString()
    @MinLength(4)
    email: string;

    @IsString()
    @MinLength(4)
    password: string;
}
