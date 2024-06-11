import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger = new Logger('Prisma-Service');
  async onModuleInit() {
    this.logger.log('Connect');
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
