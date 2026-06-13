import { CreateCustomerDto } from "./createCustomer.dto";
import { PartialType } from '@nestjs/mapped-types';


export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}