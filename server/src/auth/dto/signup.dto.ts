import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class SignupDto {

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string




}