import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  findAll() { return this.inventoryService.findAll(); }

  @Get('low-stock')
  getLowStock() { return this.inventoryService.getLowStock(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.inventoryService.findOne(id); }

  @Post()
  create(@Body() dto: CreateProductDto) { return this.inventoryService.create(dto); }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) { return this.inventoryService.update(id, dto); }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) { return this.inventoryService.delete(id); }
}