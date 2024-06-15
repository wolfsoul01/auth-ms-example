import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isTokenValidDto } from './dto/server-to-server.dto';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

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
}
