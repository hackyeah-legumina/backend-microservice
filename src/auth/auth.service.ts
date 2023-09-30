// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto, AuthRegisterDto } from './models/auth.input';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  createTokens(user: User) {
    return {
      accessToken: this.jwtService.sign({
        userId: user.id,
      }, { expiresIn: '15m' }),
      refreshToken: this.jwtService.sign({
        userId: user.id,
      }, { expiresIn: '7d' }),
    }
  }

  validatePassword(hash: string, password: string): boolean {    
    return compare(password, hash);
  }

  async register(user: AuthRegisterDto) {
    if (await this.userService.findByUsername(user.username)) {
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
  
    const isValid = this.validatePassword(userFromDb.hash, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    return this.createTokens(userFromDb);
  }
}
