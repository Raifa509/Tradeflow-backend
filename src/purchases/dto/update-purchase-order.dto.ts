import { IsString, IsOptional, IsIn } from 'class-validator';

export class UpdatePurchaseOrderDto {
  @IsIn(['PENDING', 'CONFIRMED', 'DELIVERED', 'CANCELLED'])
  status: 'PENDING' | 'CONFIRMED' | 'DELIVERED' | 'CANCELLED';

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}