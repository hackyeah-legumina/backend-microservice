import { Inject, Injectable, Logger } from '@nestjs/common';
import { AI_OPTIONS_TOKEN } from './ai.consts';
import { AiOptions } from './ai.options';
import { PromptRequestDto } from './dtos/prompt-request.dto';
import { PromptResponseDto } from './dtos/prompt-response.dto';

@Injectable()
export class AiService {
    private readonly logger =  new Logger(AiService.name);

    constructor(
        @Inject(AI_OPTIONS_TOKEN)
        private readonly options: AiOptions,
    ) {}

    async prompt(dto: PromptRequestDto): Promise<PromptResponseDto> {
        this.logger.debug('Requesting AI service...');
        return { response: 'mock' };
    }
}
