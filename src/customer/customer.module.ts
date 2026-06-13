import { Module } from "@nestjs/common";
import { CustomersController } from "./customer.controller";
import { CustomersService } from "./customer.service";
import { AuthModule } from "../auth/auth.module";


@Module({
    imports: [
        AuthModule, 
    ],
    controllers: [CustomersController],
    providers: [CustomersService],
})
export class CustomersModule { }