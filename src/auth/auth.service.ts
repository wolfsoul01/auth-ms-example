import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaPromise } from '@prisma/client';
import { compare } from 'bcrypt';

import { handleError } from 'src/common/handelError';
import { PrismaService } from 'prisma/prisma.service';
import { LogOutDto, LoginDto } from './dto';

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

      transactions.push(
        this.prisma.tokens.create({
          data: {
            userId: user.id,
            token,
            origin: origin,
          },
        }),
      );
      await this.prisma.$transaction(transactions);

      return {
        access_token: token,
        refresh_toke: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      handleError(error, this.logger);
    }
  }

  async logout(logOutDto: LogOutDto) {
    const { origin } = logOutDto;

    return origin;
  }
}
