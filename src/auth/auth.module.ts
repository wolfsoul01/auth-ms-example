import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'prisma/primsa.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/configs/env';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PrismaModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: envs.JWT_PK,
      signOptions: { expiresIn: '60d' },
    }),
  ],
})
export class AuthModule {}
