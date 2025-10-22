import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthToken } from '../entities/AuthToken.entity';
import { AuthUserEntity } from '../entities/AuthUser.entity';

@Injectable()
export class AuthTokenFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService, 
  ) {}

  createAuthToken(user: AuthUserEntity): AuthToken {
    const expirationDays = parseInt(
      this.configService.get<string>('JWT_EXPIRATION') ?? '7',
      10,
    );

    if (isNaN(expirationDays)) {
      throw new Error('Invalid JWT_EXPIRATION value in .env');
    }

    const now = new Date();
    const expirationAt = new Date(
      now.getTime() + expirationDays * 24 * 60 * 60 * 1000,
    );

    const token = this.jwtService.sign({
      sub: user.id.value,
      gmail: user.gmail.value,
      rol: user.rol.value,
      name: user.name,
    });

    return new AuthToken(user.id, expirationAt, token);
  }
}
