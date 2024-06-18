import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum Sex {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class CreateUserDto {
  @ApiProperty({
    description: 'El nombre de usuario del usuario',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'La contraseña del usuario',
    minLength: 8,
    example: 'securePassword123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'El correo electrónico del usuario',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    description: 'El nombre del usuario',
    example: 'John',
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiPropertyOptional({
    description: 'El apellido del usuario',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiPropertyOptional({
    description: 'La dirección del usuario',
    example: '123 Main St',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    description: 'El número de teléfono del usuario',
    example: '+1234567890',
  })
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    description: 'El sexo del usuario',
    enum: Sex,
    example: Sex.MALE,
  })
  @IsEnum(Sex)
  @IsOptional()
  sex: Sex;

  @ApiPropertyOptional({
    description: 'La fecha de nacimiento del usuario',
    example: '1990-01-01T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  birthdate: Date;

  @ApiPropertyOptional({
    description: 'El estado del usuario',
    example: 'California',
  })
  @IsString()
  @IsOptional()
  state: string;

  @ApiPropertyOptional({
    description: 'El municipio del usuario',
    example: 'Los Angeles',
  })
  @IsString()
  @IsOptional()
  municipality: string;

  @ApiPropertyOptional({
    description: 'El país del usuario',
    example: 'USA',
  })
  @IsString()
  @IsOptional()
  country: string;

  @ApiPropertyOptional({
    description: 'El PIN de la contraseña del usuario',
    example: '1234',
  })
  @IsString()
  @IsOptional()
  pinPassword: string;
}
