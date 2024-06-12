import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './login-auth.dto';

export class UpdateAuthDto extends PartialType(LoginDto) {}
