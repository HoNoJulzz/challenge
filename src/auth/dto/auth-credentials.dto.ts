import { IsString, MinLength, MaxLength, IsEmail, Matches } from "class-validator";

export class AuthCredentialsDto{

    @IsString()
    role: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    firstName: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    lastname: string;

    @IsEmail()
    email: string;

    /**Passwords will contain at least 1 upper case letter
    Passwords will contain at least 1 lower case letter
    Passwords will contain at least 1 number or special character
    Must have a minimum length of 8 characters
    Must have a maximun length of 20 characters */
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'password too weak'},
    )
    password: string;
}