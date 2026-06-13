import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CustomersService } from "./customer.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { CreateCustomerDto } from "./dto/createCustomer.dto";
import { UpdateCustomerDto } from "./dto/updateCustomer.dto";

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) { }


    //Get  /customers
    @Get()
    findAll() {
        return this.customersService.findAll();
    }
    // GET /customers/:id
    //     '1' comes as string from URL
    //      ↓
    // ParseIntPipe converts it to number 1
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.findOne(id);
    }

    // POST
    @Post()
    create(@Body() dto: CreateCustomerDto) {
        return this.customersService.create(dto);
    }

    //update customer
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCustomerDto,
    ) {
        return this.customersService.update(id, dto);
    }

    // DELETE /customers/:id
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.delete(id);
    }

}