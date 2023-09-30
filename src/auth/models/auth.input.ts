import { IsStrongPassword, MinLength } from "class-validator";

export class AuthLoginDto {
  username: string;
  password: string;
}

export class AuthRegisterDto {
  @MinLength(4)
  username: string;

  @IsStrongPassword()
  password: string;
}