import { ConfigType, registerAs } from '@nestjs/config';
import * as process from 'process';

export const AI_CONFIG_TOKEN = 'AI_CONFIG';

export const aiConfig = registerAs(AI_CONFIG_TOKEN, () => ({
    url: process.env.AI_URL,
}));

export const PRISMA_CONFIG_KEY = aiConfig.KEY;
export type AiConfig = ConfigType<typeof aiConfig>;
