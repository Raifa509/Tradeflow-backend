import { Controller, Get, Put, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get()
  findAll() { return this.invoicesService.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.invoicesService.findOne(id); }

  @Put(':id/pay')
  markAsPaid(@Param('id', ParseIntPipe) id: number) { return this.invoicesService.markAsPaid(id); }
}