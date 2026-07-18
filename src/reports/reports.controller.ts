import { Controller, Get, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { GetSalesReportDto } from './dto/get-sales-report';


@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('sales')
  getSalesReport(
    @Query(new ValidationPipe({ transform: true })) query: GetSalesReportDto,
  ) {
    return this.reportsService.getSalesReport(query.startDate, query.endDate);
  }

  @Get('inventory')
  getInventoryReport() {
    return this.reportsService.getInventoryReport();
  }
}