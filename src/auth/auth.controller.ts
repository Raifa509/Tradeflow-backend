import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    //post /auth/login
    @Post('login')
    //Store the request body in a variable called dto, and validate/shape it according to LoginDto
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto) //calls the service
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getMe(@Req() req: any) {
        return this.authService.getMe(req.user.sub) // gets user id from JWT token
    }
}