import { IsString } from 'class-validator';

export class IsTokenValidDto {
  @IsString({ message: 'El token es requerido.' })
  token: string;
}
