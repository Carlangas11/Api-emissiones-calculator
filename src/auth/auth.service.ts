import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

import { UserModel } from "src/users/model/users.model";
import { UsersService } from '../users/users.service';
import { comparePassword } from "src/common/helpers/encripter";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        const validPassword = await comparePassword(password, user.password);

        if (user && validPassword) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: UserModel): Promise<any> {

        user.password = 'Im not gonna give u the password of this user :P';
        return {
            access_token: this.jwtService.sign({
                username: user.email,
                sub: user._id,
            }),
            user
        }
    }
}