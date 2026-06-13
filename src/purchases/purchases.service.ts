import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  private async generateRef(): Promise<string> {
    const year = new Date().getFullYear();
    const last = await this.prisma.purchaseOrder.findFirst({
      where: { refNumber: { startsWith: `PURC-${year}` } },
      orderBy: { refNumber: 'desc' },
    });
    const next = last
      ? String(Number(last.refNumber.split('-')[2]) + 1).padStart(3, '0')
      : '001';
    return `PUR-${year}-${next}`;
  }

  async findAll() {
    return await this.prisma.purchaseOrder.findMany({
      include: { supplier: true, items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.purchaseOrder.findUnique({
      where: { id },
      include: { supplier: true, items: { include: { product: true } } },
    });

    if (!order) throw new NotFoundException('Purchase order not found');
    return order;
  }

  async create(dto: CreatePurchaseOrderDto) {
    const refNumber = await this.generateRef();
    const total = dto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return await this.prisma.purchaseOrder.create({
      data: {
        refNumber,
        supplierId: dto.supplierId,
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
      include: { supplier: true, items: { include: { product: true } } },
    });
  }

  async updateStatus(id: number, dto: UpdatePurchaseOrderDto) {
    const order = await this.findOne(id);

    // Auto increase stock when DELIVERED
    if (dto.status === 'DELIVERED') {
      for (const item of order.items) {
        await this.prisma.product.update({
          where: { id: item.productId },
          data: { quantity: { increment: item.quantity } },
        });
      }
    }

    return await this.prisma.purchaseOrder.update({
      where: { id },
      data: { status: dto.status as any },
      include: { supplier: true, items: { include: { product: true } } },
    });
  }

  async delete(id: number) {
    await this.findOne(id);
    return await this.prisma.purchaseOrder.delete({ where: { id } });
  }
}