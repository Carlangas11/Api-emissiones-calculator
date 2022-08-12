import { Injectable } from "@nestjs/common";
import { UsersService } from '../users/users.service';
import { LoginUserInput } from "./dto/login-user.input";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (user && user.password === password) { // TODO: make this more secure
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginUserInput: LoginUserInput): Promise<any> {

        const user = await this.usersService.findByEmail(loginUserInput.email);
        return {
            access_token: 'fake-token', //TODO: generate token
            user
        }
    }
}