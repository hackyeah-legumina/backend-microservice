// src/auth/jwt.strategy.ts

import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { AUTH_CONFIG_KEY, AuthConfig } from '../../configs/auth.config';
import { JwtPayload } from '../auth.interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(AUTH_CONFIG_KEY)
        private readonly authConfig: AuthConfig,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: authConfig.secret,
        });
    }

    async validate(payload: any): Promise<JwtPayload> {
        return { id: payload.id };
    }
}
