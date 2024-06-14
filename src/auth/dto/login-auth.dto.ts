import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: `Debe proporcionar un correo valido` })
  email: string;

  @MinLength(4, {
    message: 'La contraseña debe tener un mínimo de 4 caracteres',
  })
  password: string;

  @IsOptional()
  origin?: string;
}
