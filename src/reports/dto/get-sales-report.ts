import { IsOptional, IsDateString } from 'class-validator';

export class GetSalesReportDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}