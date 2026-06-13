import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalOrders,
      totalProducts,
      lowStockCount,
      recentOrders,
      monthlySales,
    ] = await Promise.all([
      this.prisma.salesOrder.count(),
      this.prisma.product.count(),
      this.prisma.product.count({ where: { quantity: { lt: 10 } } }),
      this.prisma.salesOrder.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { customer: true },
      }),
      this.prisma.salesOrder.aggregate({
        where: {
          createdAt: { gte: startOfMonth },
          status: 'DELIVERED',
        },
        _sum: { total: true },
      }),
    ]);

    // Sales chart — last 7 days
    const salesChart = await this.getLast7DaysSales();

    return {
      totalSalesThisMonth: monthlySales._sum.total || 0,
      totalOrders,
      totalProducts,
      lowStockCount,
      recentOrders,
      salesChart,
    };
  }

  private async getLast7DaysSales() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const start = new Date(date.setHours(0, 0, 0, 0));
      const end = new Date(date.setHours(23, 59, 59, 999));

      const result = await this.prisma.salesOrder.aggregate({
        where: {
          createdAt: { gte: start, lte: end },
          status: 'DELIVERED',
        },
        _sum: { total: true },
      });

      days.push({
        day: start.toLocaleDateString('en-AE', { weekday: 'short' }),
        sales: result._sum.total || 0,
      });
    }
    return days;
  }
}