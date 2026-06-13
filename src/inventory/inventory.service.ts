import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  private async generateRef(): Promise<string> {
    const year = new Date().getFullYear();
    const last = await this.prisma.product.findFirst({
      where: { refNumber: { startsWith: `PROD-${year}` } },
      orderBy: { refNumber: 'desc' },
    });
    const next = last
      ? String(Number(last.refNumber.split('-')[2]) + 1).padStart(3, '0')
      : '001';
    return `PROD-${year}-${next}`;
  }

  async findAll() {
    return await this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(dto: CreateProductDto) {
    const refNumber = await this.generateRef();
    return await this.prisma.product.create({
      data: { ...dto, refNumber },
    });
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);
    return await this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    await this.findOne(id);
    return await this.prisma.product.delete({ where: { id } });
  }

  async getLowStock() {
    return await this.prisma.product.findMany({
      where: { quantity: { lt: 10 } },
      orderBy: { quantity: 'asc' },
    });
  }
}