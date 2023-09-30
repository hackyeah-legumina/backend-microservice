import { DynamicModule, Module } from '@nestjs/common';
import { PRISMA_OPTIONS_TOKEN } from './prisma.consts';
import { PrismaAsyncOptions, PrismaOptions } from './prisma.options';
import { PrismaService } from './prisma.service';

@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {
    static forRoot(options: PrismaOptions): DynamicModule {
        return {
            global: options.isGlobal,
            module: PrismaModule,
            providers: [
                { provide: PRISMA_OPTIONS_TOKEN, useValue: options },
                PrismaService,
            ],
            exports: [PrismaService],
        };
    }

    static forRootAsync(options: PrismaAsyncOptions): DynamicModule {
        return {
            global: options.isGlobal,
            module: PrismaModule,
            providers: [
                {
                    provide: PRISMA_OPTIONS_TOKEN,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
                PrismaService,
            ],
            imports: options.imports,
            exports: [PrismaService],
        };
    }
}
