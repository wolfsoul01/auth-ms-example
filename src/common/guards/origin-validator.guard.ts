import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

type app_origin = string;

@Injectable()
export class OriginValidatorGuard implements CanActivate {
  constructor(private readonly originAllowed: app_origin[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const from = request.header('X-App-Origin');

    if (!from) {
      throw new ForbiddenException('X-App-Origin no definido');
    }

    const allowed = this.originAllowed.some((origin: string) =>
      origin.includes(from),
    );

    if (!allowed) {
      throw new ForbiddenException(
        'El origen de la solicitud no pudo ser validado. Acceso denegado.',
      );
    }

    request['origin'] = from;
    return true;
  }
}
