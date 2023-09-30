import { IsEmail, IsStrongPassword, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}

export class AuthRegisterDto {
    @ApiProperty()
    @MinLength(4)
    username: string;

    @ApiProperty()
    @IsStrongPassword()
    password: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    name?: string;
}

export class AuthRefreshDto {
    @ApiProperty()
    refreshToken: string;
}
