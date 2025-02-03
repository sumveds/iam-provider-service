// src/users/dto/user.dto.ts
import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

// Create User DTO
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}

// Response User DTO
export class UserResponseDto {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}