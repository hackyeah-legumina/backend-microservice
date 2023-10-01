import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { AiModule } from '../ai/ai.module';

@Module({
    controllers: [MessagesController],
    providers: [MessagesService],
})
export class MessagesModule {}
