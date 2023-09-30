import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';
import { decode } from 'jsonwebtoken';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { JwtPayload } from '../auth.interfaces';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        const req = context.switchToHttp().getRequest();

        let user: JwtPayload | null = null;
        if (req?.headers.authorization !== undefined) {
            const bearerToken = req.headers.authorization.split(' ')[1];
            const { userId } = decode(bearerToken) as { userId: string };
            user = { id: userId };
        }

        req.user = user;
        if (isPublic && !user) return true;

        try {
            return !!(await super.canActivate(new ExecutionContextHost([req])));
        } catch (err) {
            throw new UnauthorizedException();
        }
    }
}
