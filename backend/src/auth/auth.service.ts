import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Hardcoded test user
  private users: { email: string; password: string }[] = [
    {
      email: 'admin@example.com',
      password: bcrypt.hashSync('password123', 10),
    },
  ];

  async login(email: string, password: string) {
    const user = this.users.find((u) => u.email === email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // give compare an explicit function type so eslint/ts know the signature
    const compare = bcrypt.compare as (s: string, hash: string) => Promise<boolean>;
    const isMatch: boolean = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}