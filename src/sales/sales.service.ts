import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderDto } from './dto/update-sales-order.dto';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  private async generateRef(
    model: 'salesOrder' | 'invoice',
    prefix: string,
  ): Promise<string> {
    const year = new Date().getFullYear();
    const last = await (this.prisma[model] as any).findFirst({
      where: { refNumber: { startsWith: `${prefix}-${year}` } },
      orderBy: { refNumber: 'desc' },
    });
    const next = last
      ? String(Number(last.refNumber.split('-')[2]) + 1).padStart(3, '0')
      : '001';
    return `${prefix}-${year}-${next}`;
  }

  async findAll() {
    return await this.prisma.salesOrder.findMany({
      include: { customer: true, items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.salesOrder.findUnique({
      where: { id },
      include: {
        customer: true,
        items: { include: { product: true } },
        invoice: true,
      },
    });

    if (!order) throw new NotFoundException('Sales order not found');
    return order;
  }

  async create(dto: CreateSalesOrderDto) {
    const refNumber = await this.generateRef('salesOrder', 'ORD');
    const total = dto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return await this.prisma.salesOrder.create({
      data: {
        refNumber,
        customerId: dto.customerId,
        notes: dto.notes,
        total,
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { customer: true, items: { include: { product: true } } },
    });
  }

  async updateStatus(id: number, dto: UpdateSalesOrderDto) {
    const order = await this.findOne(id);

    if (dto.status === 'DELIVERED') {
      // Reduce stock for each item
      for (const item of order.items) {
        await this.prisma.product.update({
          where: { id: item.productId },
          data: { quantity: { decrement: item.quantity } },
        });
      }

      // Auto-create invoice only if one doesn't exist yet
      if (!order.invoice) {
        const refNumber = await this.generateRef('invoice', 'INV');
        await this.prisma.invoice.create({
          data: {
            refNumber,
            salesOrderId: id,
            total: order.total,
            vat: order.total * 0.05,
            grandTotal: order.total * 1.05,
            status: 'UNPAID',
          },
        });
      }
    }

    return await this.prisma.salesOrder.update({
      where: { id },
      data: { status: dto.status as any },
      include: {
        customer: true,
        items: { include: { product: true } },
        invoice: true,
      },
    });
  }

  async delete(id: number) {
    await this.findOne(id);
    return await this.prisma.salesOrder.delete({ where: { id } });
  }
}