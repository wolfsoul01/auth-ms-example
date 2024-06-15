import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { PrismaModule } from 'prisma/primsa.module';
import { AuthModule } from './app/auth/auth.module';
import { ServerToServerModule } from './app/server-to-server/server-to-server.module';
import { ConfigModule } from './common/configs/configs.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ServerToServerModule,
    ConfigModule,
  ],
})
export class AppModule {}
