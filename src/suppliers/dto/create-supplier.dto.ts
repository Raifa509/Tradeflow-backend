import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  company: string;

  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  reason: string
}