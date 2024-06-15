import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '../configs/configs.service';
import { GeneralConfigKey } from 'src/interface/global';

type app_origin = string;

@Injectable()
export class ServerAccessGuard implements CanActivate {
  constructor(
    private readonly originAllowed: app_origin[],
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const from = request.header('X-App-Origin');
    const token = request.header('X-App-ServerAccessKey')?.split(' ')[1];

    if (!from) throw new ForbiddenException('X-App-Origin no definido');

    if (token)
      throw new ForbiddenException('X-App-ServerAccessKey no definido');

    const allowed = this.originAllowed.some((origin: string) =>
      origin.includes(from),
    );

    if (!allowed) {
      throw new ForbiddenException(
        'El origen de la solicitud no pudo ser validado. Acceso denegado.',
      );
    }
    const serverToken = await this.configService.getConfig(
      GeneralConfigKey.server_origin_key,
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
