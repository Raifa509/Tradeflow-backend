import { IsString, IsOptional } from 'class-validator';

export class UpdateSalesOrderDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}