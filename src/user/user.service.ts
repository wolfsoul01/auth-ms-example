import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { userFullReturn } from './entities/user.scope';
import { handleError } from 'src/common/handelError';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  logger = new Logger('Users-Service');

  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'This action adds a new user';
  }

  findAll() {
    return this.prisma.users.findMany({
      select: userFullReturn,
    });
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
