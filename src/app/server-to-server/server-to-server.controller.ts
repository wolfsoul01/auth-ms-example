import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ServerToServerService } from './server-to-server.service';
import { ServerAccessGuard } from 'src/common/guards/server-access.guard';
import { OriginValidatorGuard } from 'src/common/guards/origin-validator.guard';

@Controller('server-to-server')
export class ServerToServerController {
  constructor(private readonly serverToServerService: ServerToServerService) {}

  @Post('token')
  @UseGuards(new OriginValidatorGuard(['Tecopos-Server']))
  @UseGuards(ServerAccessGuard)
  isTokenValidServer(@Body('token') token: string) {
    return this.serverToServerService.isTokeValid({ token });
  }

  @Post('checkEmail')
  checkEmail() {}

  @Get('getUserByServer')
  getUserByServer() {}

  @Get('getAllUserByServer')
  getAllUserByServer() {}
}
