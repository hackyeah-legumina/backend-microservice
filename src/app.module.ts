import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    PRISMA_CONFIG_TOKEN,
    PrismaConfig,
    prismaConfig,
} from './configs/prisma.config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { authConfig } from './configs/auth.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid('development', 'production', 'test')
                    .default('production'),
                HOST: Joi.string().default('0.0.0.0'),
                PORT: Joi.number().default(3000),
                DATABASE_URL: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
            }),
            validationOptions: {
                abortEarly: true,
            },
            load: [prismaConfig, authConfig],
        }),
        PrismaModule.forRootAsync({
            isGlobal: true,
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const config =
                    configService.getOrThrow<PrismaConfig>(PRISMA_CONFIG_TOKEN);
                return { url: config.url, verbose: true };
            },
            inject: [ConfigService],
        }),
        AuthModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
