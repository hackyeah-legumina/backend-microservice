import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';
import { decode } from 'jsonwebtoken';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const { req } = ctx.getRequest();
    if (isPublic) {
      // messy but cannot find a better way to do this for now
      if (req?.headers.authorization !== undefined) {
        const { userId } = decode(req.headers.authorization.split(' ')[1]) as {
          userId: string;
        };
        req.user = { id: userId };
      }
      return true;
    }
    try {
      if (await super.canActivate(new ExecutionContextHost([req]))) {
        return true;
      }
      return false;
    } catch (err) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
