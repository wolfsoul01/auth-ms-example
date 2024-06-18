import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaPromise } from '@prisma/client';
import { compare } from 'bcrypt';

import { PrismaService } from 'prisma/prisma.service';
import { LogOutDto, LoginDto } from './dto';
import { IsTokenValidDto } from './dto/token-valid.dto';
import { handleError } from 'src/common/handleError';
import { envs } from 'src/envs/env';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger('Auth-Service');
  async login(loginDto: LoginDto) {
    try {
      const { email, password, origin } = loginDto;
      const transactions: PrismaPromise<any>[] = [];
      const user = await this.prisma.users.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        throw new NotFoundException(
          `El usuario con el corre ${email} no fue encontrado.`,
        );
      }

      const passwordValid = await compare(password, user.password);

      if (!passwordValid) {
        throw new UnauthorizedException('Contraseña incorrecta.');
      }

      if (!user.isEmailConfirmed) {
        throw new UnauthorizedException(
          'Por favor verifique la confirmación de su correo.',
        );
      }

      transactions.push(
        this.prisma.tokens.deleteMany({
          where: {
            userId: user.id,
            origin,
          },
        }),
      );

      const payload = { userId: user.id, origin };

      const token = await this.jwtService.signAsync(payload);
      const refresh_token = await this.jwtService.signAsync(payload, {
        secret: envs.JWT_REFRESH_PK,
        expiresIn: '30d',
      });

      transactions.push(
        this.prisma.tokens.create({
          data: {
            userId: user.id,
            token,
            origin: origin,
          },
        }),
      );

      //Ejecute transactions
      await this.prisma.$transaction(transactions);

      return {
        access_token: token,
        refresh_token,
      };
    } catch (error) {
      handleError(error, this.logger);
    }
  }

  async logout(logOutDto: LogOutDto) {
    const { origin, userId } = logOutDto;
    await this.prisma.tokens.deleteMany({
      where: {
        userId: +userId,
        origin,
      },
    });

    await this.prisma.users.update({
      data: {
        isLogued: false,
      },
      where: {
        id: +userId,
      },
    });

    return;
  }

  async isTokenValid(isTokenValidDto: IsTokenValidDto) {
    const { token } = isTokenValidDto;
    try {
      const payload = await this.jwtService.decode(token);

      if (!payload) throw new UnauthorizedException('Token no valido.');

      const { userId } = payload;
      const user = await this.prisma.users.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });

      if (!user) throw new NotFoundException('Credenciales no validas.');

      return user;
    } catch (error) {
      handleError(error, this.logger);
    }
  }
}
