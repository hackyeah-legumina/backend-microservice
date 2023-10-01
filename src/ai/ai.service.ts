import { Inject, Injectable, Logger } from '@nestjs/common';
import { AI_OPTIONS_TOKEN } from './ai.consts';
import { AiOptions } from './ai.options';
import { PromptRequestDto } from './dtos/prompt-request.dto';
import { PromptResponseDto } from './dtos/prompt-response.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AiService {
    private readonly logger = new Logger(AiService.name);

    constructor(
        @Inject(AI_OPTIONS_TOKEN)
        private readonly options: AiOptions,
        private readonly httpService: HttpService,
    ) {
        console.log(options);
    }

    async prompt(dto: PromptRequestDto): Promise<PromptResponseDto> {
        this.logger.debug('Requesting AI service...');

        const response = await firstValueFrom(
            this.httpService.post(`${this.options.url}/chat`, {
                text: dto.prompt,
            }),
        );

        this.logger.debug(`Response from AI service: ${response.data}`);

        return { response: response.data };
    }
}
