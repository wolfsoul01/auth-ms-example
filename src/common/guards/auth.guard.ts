import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { envs } from 'src/envs/env';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const origin = this.extractOriginFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token no valido.');
    }
    if (!origin) {
      throw new UnauthorizedException('Origen no definido');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: envs.JWT_PK,
      });
      request['userId'] = payload.userId;
      request['origin'] = origin;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  private extractOriginFromHeader(request: Request): string | undefined {
    return request.headers['x-app-origin'] as string;
  }
}
