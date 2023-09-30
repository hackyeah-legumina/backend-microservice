import { Injectable } from "@nestjs/common";

@Injectable()
export class UserDao {
  async findByUsername(username: string) {
    return null;
  }

  async create(user: any) {
    return null;
  }
}