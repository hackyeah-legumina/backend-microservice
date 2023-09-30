import { ConfigType, registerAs } from '@nestjs/config';
import * as process from 'process';

export const PRISMA_CONFIG_TOKEN = 'PRISMA_CONFIG';

export const prismaConfig = registerAs(PRISMA_CONFIG_TOKEN, () => ({
    url: process.env.DATABASE_URL,
}));

export const PRISMA_CONFIG_KEY = prismaConfig.KEY;
export type PrismaConfig = ConfigType<typeof prismaConfig>;
