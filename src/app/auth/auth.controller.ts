import {
  Controller,
  Post,
  Body,
  Req,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CustomerRequest } from 'src/interface/global';
import { AuthGuard } from '../../common/guards/auth.guard';
import { LogOutDto, LoginDto } from './dto';
import { IsTokenValidDto } from './dto/token-valid.dto';
import { Response } from 'express';
import { ConfigService } from 'src/common/configs/configs.service';
import { handleError } from 'src/common/handleError';
import { originHeader } from 'src/common/swagger/swagger-helper';
import { OriginValidatorGuard } from '../../common/guards/origin-validator.guard';
@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configs: ConfigService,
  ) {}

 // @UseGuards(OriginValidatorGuard)
  @ApiHeader(originHeader)
  @Post('login')
  login(@Body() loginDto: LoginDto, @Req() request: CustomerRequest) {
    const origin = request.origin;

    loginDto.origin = origin;

    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @ApiHeader(originHeader)
  @Delete('logout')
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

  @ApiHeader(originHeader)
  @Post('check/token')
  isTokenValid(@Body() isTokenValidDto: IsTokenValidDto) {
    return this.authService.isTokenValid(isTokenValidDto);
  }
}
