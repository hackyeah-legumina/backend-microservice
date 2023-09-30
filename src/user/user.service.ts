import { Injectable } from "@nestjs/common";
import { UserDao } from "./user.dao";

@Injectable()
export class UserService {

  constructor(private readonly dao: UserDao) {}

  async findByUsername(username: string) {
    return await this.dao.findByUsername(username);
  }

  async create(user: any) {
    return await this.dao.create(user);
  }
}