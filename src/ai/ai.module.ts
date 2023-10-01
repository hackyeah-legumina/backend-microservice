import { DynamicModule, Module } from '@nestjs/common';
import { AI_OPTIONS_TOKEN } from './ai.consts';
import { AiAsyncOptions, AiOptions } from './ai.options';
import { AiService } from './ai.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [AiService],
    exports: [AiService],
})
export class AiModule {
    static forRoot(options: AiOptions): DynamicModule {
        return {
            global: options.isGlobal,
            module: AiModule,
            providers: [
                { provide: AI_OPTIONS_TOKEN, useValue: options },
                AiService,
            ],
            exports: [AiService],
        };
    }

    static forRootAsync(options: AiAsyncOptions): DynamicModule {
        return {
            global: options.isGlobal,
            module: AiModule,
            providers: [
                {
                    provide: AI_OPTIONS_TOKEN,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
                AiService,
            ],
            imports: options.imports,
            exports: [AiService],
        };
    }
}
