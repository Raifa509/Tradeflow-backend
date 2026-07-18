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
      isActive: true,
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
      isActive: true,
      role: 'STAFF',
    },
  });

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