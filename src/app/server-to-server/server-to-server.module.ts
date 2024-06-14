import { Module } from '@nestjs/common';
import { ServerToServerService } from './server-to-server.service';
import { ServerToServerController } from './server-to-server.controller';

@Module({
  controllers: [ServerToServerController],
  providers: [ServerToServerService],
})
export class ServerToServerModule {}
