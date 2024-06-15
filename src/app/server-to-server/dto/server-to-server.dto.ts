import { IsString } from 'class-validator';

export class isTokenValidDto {
  @IsString()
  token: string;
}
