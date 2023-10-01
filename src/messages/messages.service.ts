import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dtos/create-message.dto';

@Injectable()
export class MessagesService {
    constructor(private readonly db: PrismaService) {}

    findById(id: string, userId: string) {
        return this.db.chatMessage.findUnique({
            where: { id, createdById: userId },
        });
    }

    findMany(userId: string) {
        return this.db.chatMessage.findMany({
            where: { createdById: userId },
        });
    }

    create(dto: CreateMessageDto, userId: string) {
        return this.db.chatMessage.create({
            data: {
                message: dto.message,
                createdById: userId,
                isAssistant: false,
            },
        });
    }
}
