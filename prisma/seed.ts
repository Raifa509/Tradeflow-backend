import * as dotenv from 'dotenv';
dotenv.config();

import * as bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // ─── USERS ───────────────────────────────────────────
  const adminPassword = await bcrypt.hash('admin123', 10);
  const staffPassword = await bcrypt.hash('staff123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@tradeflow.ae' },
    update: {},
    create: {
      name: 'Raifa',
      email: 'admin@tradeflow.ae',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'staff@tradeflow.ae' },
    update: {},
    create: {
      name: 'Layla Hassan',
      email: 'staff@tradeflow.ae',
      password: staffPassword,
      role: 'STAFF',
    },
  });

  console.log('✅ Users seeded');

  // ─── SUPPLIERS ───────────────────────────────────────
  const supplier1 = await prisma.supplier.upsert({
    where: { email: 'omar@techsupply.ae' },
    update: {},
    create: {
      refNumber: 'SUPP-2026-001',
      name: 'Omar Al Farsi',
      email: 'omar@techsupply.ae',
      phone: '+971504567890',
      company: 'TechSupply FZCO',
      address: 'Jebel Ali Free Zone, Dubai',
    },
  });

  const supplier2 = await prisma.supplier.upsert({
    where: { email: 'rania@gulfimport.ae' },
    update: {},
    create: {
      refNumber: 'SUPP-2026-002',
      name: 'Rania Mahmoud',
      email: 'rania@gulfimport.ae',
      phone: '+971556789012',
      company: 'Gulf Import Trading',
      address: 'Hamriyah Free Zone, Sharjah',
    },
  });

  const supplier3 = await prisma.supplier.upsert({
    where: { email: 'tariq@blooshi.ae' },
    update: {},
    create: {
      refNumber: 'SUPP-2026-003',
      name: 'Tariq Al Blooshi',
      email: 'tariq@blooshi.ae',
      phone: '+971528901234',
      company: 'Al Blooshi Wholesale',
      address: 'Mussafah, Abu Dhabi',
    },
  });

  console.log('✅ Suppliers seeded');

  // ─── CUSTOMERS ───────────────────────────────────────
  const customer1 = await prisma.customer.upsert({
    where: { email: 'khalid@alrashidi.ae' },
    update: {},
    create: {
      refNumber: 'CUST-2026-001',
      name: 'Khalid Al Rashidi',
      email: 'khalid@alrashidi.ae',
      phone: '+971501234567',
      company: 'Al Rashidi Trading LLC',
      address: 'Deira, Dubai',
    },
  });

  const customer2 = await prisma.customer.upsert({
    where: { email: 'fatima@zaabi.ae' },
    update: {},
    create: {
      refNumber: 'CUST-2026-002',
      name: 'Fatima Al Zaabi',
      email: 'fatima@zaabi.ae',
      phone: '+971509876543',
      company: 'Zaabi Enterprises',
      address: 'Sharjah Industrial Area',
    },
  });

  const customer3 = await prisma.customer.upsert({
    where: { email: 'mhassan@email.com' },
    update: {},
    create: {
      refNumber: 'CUST-2026-003',
      name: 'Mohammed Hassan',
      email: 'mhassan@email.com',
      phone: '+971551234567',
      company: 'Hassan General Trading',
      address: 'Ajman Free Zone',
    },
  });

  const customer4 = await prisma.customer.upsert({
    where: { email: 'layla@ketbi.ae' },
    update: {},
    create: {
      refNumber: 'CUST-2026-004',
      name: 'Layla Al Ketbi',
      email: 'layla@ketbi.ae',
      phone: '+971521234567',
      company: 'Ketbi Office Solutions',
      address: 'Abu Dhabi, Al Ain Road',
    },
  });

  console.log('✅ Customers seeded');

  // ─── PRODUCTS ─────────────────────────────────────────
  const product1 = await prisma.product.upsert({
    where: { sku: 'ELEC-001' },
    update: {},
    create: {
      refNumber: 'PROD-2026-001',
      name: 'Samsung 55" Smart TV',
      sku: 'ELEC-001',
      price: 1899,
      quantity: 25,
      category: 'Electronics',
    },
  });

  const product2 = await prisma.product.upsert({
    where: { sku: 'ELEC-002' },
    update: {},
    create: {
      refNumber: 'PROD-2026-002',
      name: 'iPhone 15 Pro',
      sku: 'ELEC-002',
      price: 4299,
      quantity: 8,
      category: 'Electronics',
    },
  });

  const product3 = await prisma.product.upsert({
    where: { sku: 'ELEC-003' },
    update: {},
    create: {
      refNumber: 'PROD-2026-003',
      name: 'Dell Laptop 15"',
      sku: 'ELEC-003',
      price: 3499,
      quantity: 12,
      category: 'Electronics',
    },
  });

  const product4 = await prisma.product.upsert({
    where: { sku: 'ELEC-004' },
    update: {},
    create: {
      refNumber: 'PROD-2026-004',
      name: 'Sony PlayStation 5',
      sku: 'ELEC-004',
      price: 2199,
      quantity: 6,
      category: 'Electronics',
    },
  });

  const product5 = await prisma.product.upsert({
    where: { sku: 'ELEC-005' },
    update: {},
    create: {
      refNumber: 'PROD-2026-005',
      name: 'iPad Pro 12.9"',
      sku: 'ELEC-005',
      price: 3999,
      quantity: 3,
      category: 'Electronics',
    },
  });

  const product6 = await prisma.product.upsert({
    where: { sku: 'APPL-001' },
    update: {},
    create: {
      refNumber: 'PROD-2026-006',
      name: 'LG Washing Machine 8kg',
      sku: 'APPL-001',
      price: 1499,
      quantity: 15,
      category: 'Appliances',
    },
  });

  const product7 = await prisma.product.upsert({
    where: { sku: 'APPL-002' },
    update: {},
    create: {
      refNumber: 'PROD-2026-007',
      name: 'Samsung Refrigerator 500L',
      sku: 'APPL-002',
      price: 2899,
      quantity: 10,
      category: 'Appliances',
    },
  });

  const product8 = await prisma.product.upsert({
    where: { sku: 'APPL-003' },
    update: {},
    create: {
      refNumber: 'PROD-2026-008',
      name: 'Dyson V15 Vacuum',
      sku: 'APPL-003',
      price: 2199,
      quantity: 3,
      category: 'Appliances',
    },
  });

  const product9 = await prisma.product.upsert({
    where: { sku: 'APPL-004' },
    update: {},
    create: {
      refNumber: 'PROD-2026-009',
      name: 'Bosch Dishwasher 14 Place',
      sku: 'APPL-004',
      price: 1799,
      quantity: 7,
      category: 'Appliances',
    },
  });

  const product10 = await prisma.product.upsert({
    where: { sku: 'APPL-005' },
    update: {},
    create: {
      refNumber: 'PROD-2026-010',
      name: 'Philips Air Fryer XL',
      sku: 'APPL-005',
      price: 499,
      quantity: 20,
      category: 'Appliances',
    },
  });

  console.log('✅ Products seeded');

  // ─── PURCHASE ORDERS ─────────────────────────────────
  const purchase1 = await prisma.purchaseOrder.create({
    data: {
      refNumber: 'PUR-2026-001',
      supplierId: supplier1.id,
      status: 'DELIVERED',
      total: 22490,
      notes: 'Monthly electronics restock',
      items: {
        create: [
          { productId: product1.id, quantity: 5, price: 1700 },
          { productId: product2.id, quantity: 3, price: 3900 },
          { productId: product3.id, quantity: 2, price: 3200 },
        ],
      },
    },
  });

  const purchase2 = await prisma.purchaseOrder.create({
    data: {
      refNumber: 'PUR-2026-002',
      supplierId: supplier2.id,
      status: 'CONFIRMED',
      total: 18990,
      notes: 'Appliances restock Q1',
      items: {
        create: [
          { productId: product6.id, quantity: 5, price: 1300 },
          { productId: product7.id, quantity: 3, price: 2599 },
          { productId: product8.id, quantity: 2, price: 1999 },
        ],
      },
    },
  });

  await prisma.purchaseOrder.create({
    data: {
      refNumber: 'PUR-2026-003',
      supplierId: supplier3.id,
      status: 'PENDING',
      total: 9990,
      items: {
        create: [
          { productId: product4.id, quantity: 3, price: 1999 },
          { productId: product5.id, quantity: 1, price: 3600 },
        ],
      },
    },
  });

  console.log('✅ Purchase orders seeded');

  // ─── SALES ORDERS ────────────────────────────────────
  const sales1 = await prisma.salesOrder.create({
    data: {
      refNumber: 'ORD-2026-001',
      customerId: customer1.id,
      status: 'DELIVERED',
      total: 10097,
      notes: 'Deliver to warehouse',
      items: {
        create: [
          { productId: product1.id, quantity: 2, price: 1899 },
          { productId: product2.id, quantity: 1, price: 4299 },
          { productId: product6.id, quantity: 1, price: 1499 },
          { productId: product10.id, quantity: 2, price: 499 },
        ],
      },
    },
  });

  await prisma.salesOrder.create({
    data: {
      refNumber: 'ORD-2026-002',
      customerId: customer2.id,
      status: 'CONFIRMED',
      total: 8797,
      items: {
        create: [
          { productId: product3.id, quantity: 1, price: 3499 },
          { productId: product7.id, quantity: 1, price: 2899 },
          { productId: product9.id, quantity: 1, price: 1799 },
          { productId: product10.id, quantity: 1, price: 499 },
        ],
      },
    },
  });

  await prisma.salesOrder.create({
    data: {
      refNumber: 'ORD-2026-003',
      customerId: customer3.id,
      status: 'PENDING',
      total: 6597,
      items: {
        create: [
          { productId: product4.id, quantity: 2, price: 2199 },
          { productId: product8.id, quantity: 1, price: 2199 },
        ],
      },
    },
  });

  const sales4 = await prisma.salesOrder.create({
    data: {
      refNumber: 'ORD-2026-004',
      customerId: customer4.id,
      status: 'DELIVERED',
      total: 5497,
      items: {
        create: [
          { productId: product5.id, quantity: 1, price: 3999 },
          { productId: product10.id, quantity: 3, price: 499 },
        ],
      },
    },
  });

  await prisma.salesOrder.create({
    data: {
      refNumber: 'ORD-2026-005',
      customerId: customer1.id,
      status: 'CANCELLED',
      total: 2199,
      items: {
        create: [
          { productId: product8.id, quantity: 1, price: 2199 },
        ],
      },
    },
  });

  console.log('✅ Sales orders seeded');

  // ─── INVOICES ────────────────────────────────────────
  await prisma.invoice.create({
    data: {
      refNumber: 'INV-2026-001',
      salesOrderId: sales1.id,
      total: 10097,
      vat: 504.85,
      grandTotal: 10601.85,
      status: 'PAID',
    },
  });

  await prisma.invoice.create({
    data: {
      refNumber: 'INV-2026-002',
      salesOrderId: sales4.id,
      total: 5497,
      vat: 274.85,
      grandTotal: 5771.85,
      status: 'UNPAID',
    },
  });

  console.log('✅ Invoices seeded');
  console.log('─────────────────────────────────────────');
  console.log('✅ Seeding complete!');
  console.log('Admin → admin@tradeflow.ae / admin123');
  console.log('Staff → staff@tradeflow.ae / staff123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });