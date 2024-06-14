import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { userFullReturn } from './entities/user.scope';
import { handleError } from 'src/common/handelError';
import { FindAllUsersQueryDto } from './dto/query-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  logger = new Logger('Users-Service');

  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'This action adds a new user';
  }

  async findAll(query: FindAllUsersQueryDto) {
    const { page = 1, limit = 10 } = query;

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

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
