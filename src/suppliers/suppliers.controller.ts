import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('suppliers')
export class SuppliersController {
  constructor(private suppliersService: SuppliersService) { }

  @Get()
  findAll() { return this.suppliersService.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.suppliersService.findOne(id); }

  @Post()
  create(@Body() dto: CreateSupplierDto) { return this.suppliersService.create(dto); }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSupplierDto) { return this.suppliersService.update(id, dto); }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Body() body?: { reason?: string }) {
  return this.suppliersService.delete(id, body?.reason);
}
}