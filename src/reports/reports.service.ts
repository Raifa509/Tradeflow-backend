import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getSalesReport(startDate?: string, endDate?: string) {
    // 1. Create safe fallbacks if dates are missing
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const parsedStart = startDate ? new Date(startDate) : thirtyDaysAgo;
    const parsedEnd = endDate ? new Date(endDate) : now;

    // 2. Double-check validity before hitting Prisma to prevent crashes
    if (isNaN(parsedStart.getTime()) || isNaN(parsedEnd.getTime())) {
      throw new BadRequestException('Provided dates are invalid format.');
    }

    return await this.prisma.salesOrder.findMany({
      where: {
        createdAt: {
          gte: parsedStart,
          lte: parsedEnd,
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