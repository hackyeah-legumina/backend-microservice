import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserDao {
    constructor(private readonly db: PrismaService) {}

    findById(id: string) {
        return this.db.user.findUnique({ where: { id } });
    }

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
