import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new UnauthorizedException('JWT secret is not configured');
    }

    try {
      jwt.verify(token, jwtSecret);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
