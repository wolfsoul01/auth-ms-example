import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { app_origin } from 'src/interface/global';

@Injectable()
export class OriginValidatorGuard implements CanActivate {
  constructor(private readonly originAllowed?: app_origin[]) {}

  private readonly allOrigins: app_origin[] = [
    'Tecopos',
    'Codyas-Woocommerce',
    'Tecopos-Admin',
    'Tecopos-Alma',
    'Tecopos-Landing',
    'Tecopos-Management',
    'Tecopos-Marketplace',
    'Tecopos-Shop',
    'Tecopay-Web',
    'Tecopay-App',
    'Tecopos-Terminal',
    'Tecopos-Ticket',
    'Tecopos-Tickets',
  ];
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const from = request.header('X-App-Origin');

    if (!from) {
      throw new ForbiddenException('X-App-Origin no definido');
    }

    const originCheck: app_origin[] = this.originAllowed ?? this.allOrigins;

    const allowed = originCheck.some((origin: string) => origin.includes(from));

    if (!allowed) {
      throw new ForbiddenException(
        'El origen de la solicitud no pudo ser validado. Acceso denegado.',
      );
    }

    request['origin'] = from;
    return true;
  }
}
