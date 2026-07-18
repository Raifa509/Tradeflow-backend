import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
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

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @IsString()
    @IsOptional()
    reason: string

}

