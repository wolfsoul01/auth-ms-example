import {
  Controller,
  Post,
  Body,
  Req,
  UnauthorizedException,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CustomerRequest } from 'src/interface/global';
import { AuthGuard } from '../common/guards/auth.guard';
import { LogOutDto, LoginDto } from './dto';
import { IsTokenValidDto } from './dto/token-valid.dto';
import { Response } from 'express';
import { handleError } from 'src/common/handelError';

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
  async logOut(@Req() request: CustomerRequest, @Res() response: Response) {
    const logOutDto: LogOutDto = {
      origin: request.origin,
      userId: request.userId,
    };
    try {
      await this.authService.logout(logOutDto);
      return response.status(204).json();
    } catch (error) {
      return handleError(error);
    }
  }

  @Post('check/token')
  isTokenValid(@Body() isTokenValidDto: IsTokenValidDto) {
    return this.authService.isTokenValid(isTokenValidDto);
  }
}
