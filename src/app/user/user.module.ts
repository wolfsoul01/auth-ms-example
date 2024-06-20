import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpClientModule } from 'src/app/http-client/http-client.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [HttpClientModule],
  exports: [UserService],
})
export class UserModule {}
