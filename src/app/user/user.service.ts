import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

import {
  CreateUserDto,
  FindAllUsersQueryDto,
  UpdateUserDto,
  getUserDto,
} from './dto';
import { imagesUser, userFullReturn } from './entities/user.scope';
import { handleError } from 'src/common/handleError';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { envs } from 'src/envs/env';
import { firstValueFrom } from 'rxjs';
import { HttpClientService } from 'src/app/http-client/http-client.service';
export interface Main {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jswService: JwtService,
    private readonly httpService: HttpClientService,
  ) {}

  logger = new Logger('Users-Service');

  async create(createUserDto: CreateUserDto) {
    const { email, password, pinPassword, username } = createUserDto;

    const newUser: Partial<Prisma.UsersCreateInput> = {};

    if (email) {
      const isAvailable = await this.checkEmailUser(email);

      if (!isAvailable)
        throw new ConflictException('Correo electrónico no disponible.');

      newUser.email = email;
    }

    if (password) {
      const cryptPassword = await bcrypt.hash(password, 10);

      newUser.password = cryptPassword;
    }

    if (pinPassword) {
      if (!/^[0-9]+$/.test(pinPassword)) {
        throw new BadRequestException('El pin debe contener solo números.');
      }

      if (pinPassword.length > 6 || pinPassword.length < 4) {
        throw new BadRequestException(
          'El PIN solo puede contener entre 4 a 6 dígitos.',
        );
      }

      const cryptPinPassword = await bcrypt.hash(pinPassword, 10);

      newUser.pinPassword = cryptPinPassword;
    }

    if (username) {
      newUser.username = await this.getUserName(username);
    }
    const user = await this.prisma.users.create({
      data: newUser as Prisma.UsersCreateInput,
      select: userFullReturn,
    });

    if (email) {
      const payload = { userId: user.id };
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);

      const verifyToken = this.jswService.sign(payload, {
        expiresIn: '1d',
        secret: envs.JWT_PK,
      });

      const url = `http://localhost:3006/api/v1/email/verify-account`;
      const body = {
        to: email,
        subject: 'Bienvenido',
        password: password,
        token: verifyToken,
      };
      firstValueFrom(this.httpService.post<void>(url, body));
    }

    return user;
  }

  async findAll(query: FindAllUsersQueryDto) {
    const { page, limit } = query;

    const users = await this.prisma.users.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: userFullReturn,
    });

    const total = await this.prisma.users.count();

    return {
      total: total,
      page,
      limit,
      data: users,
    };
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id,
        },
        select: userFullReturn,
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado.');
      }

      return user;
    } catch (error) {
      handleError(error, this.logger);
    }
  }

  async getUser(getUserDTo: getUserDto) {
    const { userId } = getUserDTo;
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id: +userId,
        },
        select: {
          ...userFullReturn,
          Images: {
            select: imagesUser,
          },
        },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      return user;
    } catch (error) {}
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  //Helpers service
  async checkEmailUser(email: string): Promise<boolean> {
    const emailAvailable = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (emailAvailable) {
      return false;
    }

    return true;
  }

  generateJwtVerify(payload: Record<string, string | number>) {
    return this.jswService.sign(payload, { expiresIn: '1d' });
  }

  async getUserName(username: string): Promise<string> {
    const user = await this.prisma.users.findUnique({
      where: {
        username,
      },
    });

    if (user) {
      return username + `_${Math.floor(Math.random() * (999 - 100 + 1) + 100)}`;
    }

    return username;
  }
}
