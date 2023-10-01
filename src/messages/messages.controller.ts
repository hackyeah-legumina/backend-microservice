import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessageDto } from './dtos/message.dto';
import { CtxUser } from '../auth/decorators/ctx-user.decorator';
import { JwtPayload } from '../auth/auth.interfaces';
import { ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Get(':id')
    @ApiResponse({ type: MessageDto })
    async message(
        @Param('id') id: string,
        @CtxUser() user: JwtPayload,
    ): Promise<MessageDto> {
        const message = await this.messagesService.findById(id, user.id);
        return {
            id: message.id,
            message: message.message,
            isAssistant: message.isAssistant,
        };
    }

    @Get()
    @ApiResponse({ type: [MessageDto] })
    async messages(@CtxUser() user: JwtPayload): Promise<MessageDto[]> {
        return this.messagesService.findMany(user.id);
    }

    @Public()
    @Post()
    @ApiResponse({ type: MessageDto })
    async createMessage(
        @Body() dto: CreateMessageDto,
        @CtxUser() user: JwtPayload,
    ): Promise<MessageDto[]> {
        return !!user
            ? this.messagesService.handleUserMessage(dto, user.id)
            : this.messagesService.handleGuestMessage(dto);
    }
}
