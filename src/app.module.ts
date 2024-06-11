import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'prisma/primsa.module';

@Module({
  imports: [UserModule, PrismaModule],
})
export class AppModule {}
