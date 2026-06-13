import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  private async generateRef(): Promise<string> {
    const year = new Date().getFullYear();
    const last = await this.prisma.supplier.findFirst({
      where: { refNumber: { startsWith: `SUPP-${year}` } },
      orderBy: { refNumber: 'desc' },
    });
    const next = last
      ? String(Number(last.refNumber.split('-')[2]) + 1).padStart(3, '0')
      : '001';
    return `SUPP-${year}-${next}`;
  }

  async findAll() {
    return await this.prisma.supplier.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
      include: {
        purchaseOrders: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!supplier) throw new NotFoundException('Supplier not found');
    return supplier;
  }

  async create(dto: CreateSupplierDto) {
    const refNumber = await this.generateRef();
    return await this.prisma.supplier.create({
      data: { ...dto, refNumber },
    });
  }

  async update(id: number, dto: UpdateSupplierDto) {
    await this.findOne(id);
    return await this.prisma.supplier.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    await this.findOne(id);
    return await this.prisma.supplier.delete({ where: { id } });
  }
}