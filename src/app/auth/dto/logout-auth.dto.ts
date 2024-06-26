import { IsOptional } from 'class-validator';

export class LogOutDto {
  @IsOptional()
  origin: string;

  @IsOptional()
  userId: string | number;
}
