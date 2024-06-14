import { Controller, Get, Post } from '@nestjs/common';
import { ServerToServerService } from './server-to-server.service';

@Controller('server-to-server')
export class ServerToServerController {
  constructor(private readonly serverToServerService: ServerToServerService) {}

  @Post('isTokenValidServer')
  isTokenValidServer() {}

  @Post('checkEmail')
  checkEmail() {}

  @Get('getUserByServer')
  getUserByServer() {}

  @Get('getAllUserByServer')
  getAllUserByServer() {}
}
