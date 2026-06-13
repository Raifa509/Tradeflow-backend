import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getSalesReport(startDate: string, endDate: string) {
    return await this.prisma.salesOrder.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        status: 'DELIVERED',
      },
      include: { customer: true, items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getInventoryReport() {
    const products = await this.prisma.product.findMany({
      orderBy: { quantity: 'asc' },
    });

    const totalValue = products.reduce(
      (sum, p) => sum + p.price * p.quantity, 0
    );

    return { products, totalValue };
  }
}