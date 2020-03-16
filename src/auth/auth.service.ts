import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const user = await this.userRepository.validateUserPassword(authCredentialsDto);
        const firstname = user.firstName;
        const email = user.email;
        const role = user.role;


        if(!email){
            throw new UnauthorizedException('Invalid Credentials');
        }

        const payload: JwtPayload = { firstname, email, role };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
