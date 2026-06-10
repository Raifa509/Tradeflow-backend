import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService{
    constructor(
        private prisma:PrismaService,
        private jwtService:JwtService
    ){}


    async login(dto:LoginDto)
    {
        const user=await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        })
        if(!user){
            throw new UnauthorizedException('Invalid email or password')
        }

        const isPasswordValid=await bcrypt.compare(dto.password,user.password)
        if(!isPasswordValid)
        {
            throw new UnauthorizedException('Invalid email or password')
        }

        //create payload
        const payload={
            sub:user.id,
            email:user.email,
            role:user.role
        }
        //sign and generate token
        const token=await this.jwtService.signAsync(payload)
        return{
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        }
    }

    async getMe(userId:number){
        const user=await this.prisma.user.findUnique({
            where:{id:userId},
            select:{
                id:true,
                name:true,
                email:true,
                role:true,
                createdAt:true
            }
        })
        return user
    }
}