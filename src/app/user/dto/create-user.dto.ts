import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsDate,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

enum Sex {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsPhoneNumber(null)
  @IsOptional()
  phone?: string;

  @IsEnum(Sex)
  @IsOptional()
  sex: Sex;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  birthdate: Date;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  municipality: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  pinPassword: string;
}
