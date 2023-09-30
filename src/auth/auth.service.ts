// src/auth/auth.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto, AuthRegisterDto } from './models/auth.input';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';
import { TokenType } from './enums/tokenType.enum';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  createTokens(payload: any) {
    return {
      accessToken: this.jwtService.sign({...payload, type: TokenType.ACCESS_TOKEN}, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign({...payload, type: TokenType.REFRESH_TOKEN}, { expiresIn: '7d' }),
    }
  }

  refresh(token: string) {
    let userId: string;
    let type: TokenType;
    try {
        const decoded = this.jwtService.verify(token);
        userId = decoded.id;
        type = decoded.type;
    } catch (error) {
        throw new BadRequestException('Token expired');
    }
    if (type !== TokenType.REFRESH_TOKEN) {
      throw new BadRequestException('Invalid token');
    }
    return this.createTokens({ id: userId });
  }

  validatePassword(hash: string, password: string): boolean {    
    return compare(password, hash);
  }

  async register(user: AuthRegisterDto) {
    if (await this.userService.findByUsername(user.username)) {
      throw new BadRequestException('User already exists');
    } 
    this.userService.create(user);
    return user;
  }

  async login(user: AuthLoginDto) {
    const userFromDb = await this.userService.findByUsername(user.username);
    if (!userFromDb) {
      throw new BadRequestException('User not found');
    }
  
    const isValid = this.validatePassword(userFromDb.hash, user.password);
    if (!isValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.createTokens({id: userFromDb.id});
  }
}
