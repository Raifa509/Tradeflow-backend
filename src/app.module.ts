import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customer/customer.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { InventoryModule } from './inventory/inventory.module';
import { SalesModule } from './sales/sales.module';
import { PurchasesModule } from './purchases/purchases.module';
import { InvoicesModule } from './invoices/invoices.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),  //reads .env globally
    PrismaModule,
    AuthModule,
    CustomersModule,
    SuppliersModule,
    InventoryModule,
    SalesModule,
    PurchasesModule,
    InvoicesModule,
    DashboardModule,
    ReportsModule,
    UsersModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
