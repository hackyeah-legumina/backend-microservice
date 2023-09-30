import { ConfigType, registerAs } from '@nestjs/config';
import * as process from 'process';

export const AUTH_CONFIG_TOKEN = 'AUTH_CONFIG';

export const authConfig = registerAs(AUTH_CONFIG_TOKEN, () => ({
    secret: process.env.JWT_SECRET,
}));

export const AUTH_CONFIG_KEY = authConfig.KEY;
export type AuthConfig = ConfigType<typeof authConfig>;
