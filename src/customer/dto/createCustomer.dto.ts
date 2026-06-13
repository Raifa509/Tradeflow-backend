import { IsEmail, IsString } from "class-validator";

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


}