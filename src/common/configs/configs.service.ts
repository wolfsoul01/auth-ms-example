import { Global, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Global()
@Injectable()
export class ConfigService {
  constructor(private readonly prisma: PrismaService) {}
  getAllowedOrigins(): string[] {
    return ['Tecopos', 'Tecopos-Admin'];
  }

  getEmail() {
    return this.prisma.generalConfigs.findFirst({
      where: {
        key: 'server_origin_key',
      },
    });
  }
}
