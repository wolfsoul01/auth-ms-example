import {
  Controller,
  Post,
  Body,
  Req,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { CustomerRequest } from 'src/interface/global';

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

  @Delete('logOut')
  logOut(@Req() request: CustomerRequest) {
    const logOutDto = {
      origin: request.origin,
    };
    return this.authService.logout(logOutDto);
  }
}
