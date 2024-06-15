import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '../configs/configs.service';

@Injectable()
export class ServerAccessGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const from = request.header('x-app-origin');
    const token = request.header('X-App-ServerAccessKey')?.split(' ')[1];

    if (!token)
      throw new ForbiddenException('X-App-ServerAccessKey no definido');

    const serverToken = await this.configService.getConfig(
      'server_origin_key',
      from,
    );

    if (!serverToken)
      throw new ForbiddenException(
        'Las credenciales de acceso de su servidor recibidas no pudieron verificarse.',
      );

    if (serverToken.value !== token)
      throw new ForbiddenException('Credenciales de acceso no validas.');

    request['origin'] = from;
    return true;
  }
}
