// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto, AuthRegisterDto } from './models/auth.input';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  /* async generateToken(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  } */

  async validatePassword(hash: string, password: string): Promise<any> {
    // TODO: ADD VALIDATION
    compare(password, hash);
    console.log(hash)
    return true;
  }

  async register(user: AuthRegisterDto) {
    if (this.userService.findByUsername(user.username)) {
      throw new Error('User already exists');
    } 
    this.userService.create(user);
    return user;
  }

  async login(user: AuthLoginDto) {
    const userFromDb = await this.userService.findByUsername(user.username);
    if (!userFromDb) {
      throw new Error('User not found');
    }

    const isValid = await this.validatePassword(userFromDb.hash, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    return user;
  }
}
