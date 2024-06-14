import {
  Controller,
  Post,
  Body,
  Req,
  UnauthorizedException,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CustomerRequest } from 'src/interface/global';
import { AuthGuard } from '../common/guards/auth.guard';
import { LogOutDto, LoginDto } from './dto';
import { IsTokenValidDto } from './dto/token-valid.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto, @Req() request: Request) {
    const origin = request.headers['x-app-origin'] as string;

    if (!origin) {
      throw new UnauthorizedException('Origen no encontrado.');
    }

    loginDto.origin = origin;

    return this.authService.login(loginDto);
  }

  @Delete('logout')
  @UseGuards(AuthGuard)
  logOut(@Req() request: CustomerRequest) {
    const logOutDto: LogOutDto = {
      origin: request.origin,
      userId: request.userId,
    };
    return this.authService.logout(logOutDto);
  }

  @Post('check/token')
  isTokenValid(@Body() isTokenValidDto: IsTokenValidDto) {
    return this.authService.isTokenValid(isTokenValidDto);
  }
}
