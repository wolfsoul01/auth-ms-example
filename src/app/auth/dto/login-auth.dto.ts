import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'Correo electrónico',
  })
  @IsEmail({}, { message: `Debe proporcionar un correo valido` })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña',
  })
  @MinLength(4, {
    message: 'La contraseña debe tener un mínimo de 4 caracteres',
  })
  password: string;

  @IsOptional()
  origin?: string;
}
