import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isTokenValidDto } from './dto/server-to-server.dto';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { handleError } from 'src/common/handleError';
import { simpleUserReturn } from '../user/entities/user.scope';

@Injectable()
export class ServerToServerService {
  constructor(
    private readonly primsa: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async isTokeValid(isTokenValidDto: isTokenValidDto) {
    const { token } = isTokenValidDto;

    try {
      const decode = await this.jwtService.decode(token);
      const user = await this.primsa.users.findFirst({
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          isActive: true,
        },
        where: {
          id: decode.userId,
        },
      });

      if (!user)
        throw new NotFoundException(
          'Credenciales de acceso no válidas del usuario.',
        );

      if (!user.isActive) {
        throw new ForbiddenException('El usuario no esta activo.');
      }

      return user;
    } catch (error) {
      throw new ForbiddenException('Token no valido.');
    }
  }

  async checkEmail(email: string) {
    try {
      const user = await this.primsa.users.findFirst({
        where: {
          email,
        },
        select: simpleUserReturn,
      });

      if (!user)
        throw new NotFoundException(
          `El usuario con email ${email} no fue encontrado.`,
        );

      return user;
    } catch (error) {
      handleError(error);
    }
  }

  async getUser(id: number) {
    const user = await this.primsa.users.findUnique({
      where: {
        id,
      },
      select: simpleUserReturn,
    });

    if (!user) {
      throw new NotFoundException('No se a encontrado al usuario solicitado.');
    }

    return user;
  }
}
