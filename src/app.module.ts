import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'prisma/primsa.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule],
})
export class AppModule {}
