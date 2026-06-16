import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { UpdateCustomerDto } from './dto/updateCustomer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  private async generateRef(): Promise<string> {
    const year = new Date().getFullYear();
    const last = await this.prisma.customer.findFirst({
      where: { refNumber: { startsWith: `CUST-${year}` } },
      orderBy: { refNumber: 'desc' },
    });
    const next = last
      ? String(Number(last.refNumber.split('-')[2]) + 1).padStart(3, '0')
      : '001';
    return `CUST-${year}-${next}`;
  }

  async findAll() {
    return await this.prisma.customer.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        salesOrders: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!customer || !customer.isActive) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  async create(dto: CreateCustomerDto) {
    const refNumber = await this.generateRef();
    return await this.prisma.customer.create({
      data: { ...dto, refNumber },
    });
  }

  async update(id: number, dto: UpdateCustomerDto) {
    await this.findOne(id);
    return await this.prisma.customer.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    await this.findOne(id);
    return await this.prisma.customer.update({
      where: { id },
      data: { isActive: false },
    });
  }
}