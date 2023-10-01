import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageArgs } from './messages.interfaces';
import { AiService } from '../ai/ai.service';
import { v4 as uuid } from 'uuid'

@Injectable()
export class MessagesService {
    constructor(
        private readonly db: PrismaService,
        private readonly aiService: AiService,
    ) {}

    findById(id: string, userId: string) {
        return this.db.chatMessage.findUnique({
            where: { id, createdById: userId },
        });
    }

    findMany(userId: string) {
        return this.db.chatMessage.findMany({
            where: { createdById: userId },
            orderBy: [{ createdAt: 'asc' }],
        });
    }

    async handleUserMessage(dto: CreateMessageArgs, userId: string) {
        const userMessage = await this.create(dto, userId);

        const { response } = await this.aiService.prompt({
            prompt: dto.message,
        });

        const assistantMessage = await this.create(
            { message: response, isAssistant: true },
            userId,
        );
        return [
            {
                id: userMessage.id,
                message: userMessage.message,
                isAssistant: userMessage.isAssistant,
            },
            {
                id: assistantMessage.id,
                message: assistantMessage.message,
                isAssistant: assistantMessage.isAssistant,
            },
        ];
    }

    async handleGuestMessage(dto: CreateMessageArgs) {
        const { response } = await this.aiService.prompt({
            prompt: dto.message,
        });
        return [
            {
                id: uuid(),
                message: dto.message,
                isAssistant: false,
            },
            {
                id: uuid(),
                message: response,
                isAssistant: true,
            },
        ];
    }

    create(dto: CreateMessageArgs, userId: string) {
        return this.db.chatMessage.create({
            data: {
                message: dto.message,
                createdById: userId,
                isAssistant: !!dto.isAssistant,
            },
        });
    }
}
