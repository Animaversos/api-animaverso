import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info: Error) {
    this._handleErrorOnRequest(info);
    return user;
  }

  _handleErrorOnRequest(info: Error) {
    if (!info) return;
    if (info.name === 'TokenExpiredError') {
      throw new HttpException('Token expirado', HttpStatus.UNAUTHORIZED);
    } else {
      throw new HttpException(info.message, HttpStatus.UNAUTHORIZED);
    }
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
