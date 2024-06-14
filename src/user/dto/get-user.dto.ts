import { IsOptional } from 'class-validator';

export class getUserDto {
  @IsOptional()
  userId: string | number;
}
