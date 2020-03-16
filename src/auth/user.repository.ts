import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    /**FUNCTION = asynchronous: Abstracts the data user from the user entity and creates a new user object, then, it saves it in the DB
     * PARAMS: authCredentialsDto: AuthcredencialsDto
     * TYPE: Promise<void>
     */
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const { role, firstName, lastname, email, password } = authCredentialsDto;

        const user = new User();
        user.role = role;
        user.firstName = firstName;
        user.lastname = lastname;
        user.email = email;
        user.salt = await bcrypt.genSalt(); //generates an unique salt per user's password
        user.password = await this.hashPassword(password, user.salt);

         try{
            await user.save();
         }catch(error){
            if(error.code === '23505'){ //duplicate email
                throw new ConflictException('An user with that email already exists!');
            }else{
                throw new InternalServerErrorException();
            }
         }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User>{
        const { email, password } = authCredentialsDto;
        const user = await this.findOne( { email });

        if(user && await user.validatePassword(password)){
            return user;
        }else{
            return null;
        }

    }

    /**FUNCTION - asynchronous: Hashes the user's password to increase security
     * PARAMS: password: string, salt: string
     * TYPE: Promise<string>
     */
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}