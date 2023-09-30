import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
@Injectable()
export class UserDao {
  constructor(private readonly db: PrismaService) {}

  async findByUsername(username: string) {
    return await this.db.user.findUnique({
      where: {
        username,
      },
    });
  }

  async create(user: any) {
    return await this.db.user.create({
      data: {
        ...user,
      },
    });
  }
}