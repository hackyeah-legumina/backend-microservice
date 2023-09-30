import { Injectable } from "@nestjs/common";
import { UserDao } from "./user.dao";
import { AuthRegisterDto } from "src/auth/models/auth.input";
import { hash } from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private readonly dao: UserDao) {}

  async findByUsername(username: string) {
    return await this.dao.findByUsername(username);
  }

  async create(user: AuthRegisterDto) {
    const _user = {
      email: user.email,
      name: user.name,
      username: user.username,
      hash: await hash(user.password, 10),
    }
    return await this.dao.create(_user);
  }
}