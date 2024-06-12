import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: LoginDto) {
    return createAuthDto;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return updateAuthDto;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
