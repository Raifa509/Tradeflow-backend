import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  //executioncontext contains all the information about the current request,response,route handler and more
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the request
    const request = context.switchToHttp().getRequest();

    // Get the token from header
    const authHeader = request.headers.authorization;//Authorization: Bearer eyJhbGciOiJIUzI1Ni... this value stored

    // Check if token exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    //Extract token (remove "Bearer " prefix)
    const token = authHeader.split(' ')[1];

    //Verify token
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      //Attach user info to request
      request.user = payload;
      return true;

    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}