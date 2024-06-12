import { IsEmail, Min } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: `Debe proporcionar un correo valido` })
  email: string;

  @Min(4, { message: 'La contraseña debe tener un mínimo de 4 caracteres' })
  password: string;
}
