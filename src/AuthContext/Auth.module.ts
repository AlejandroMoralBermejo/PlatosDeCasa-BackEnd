import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './infrastructure/controller/auth.controller';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { CommandHandlers } from './application/commands/handlers/command-handler';
import { AuthUserTypeOrmEntity } from './infrastructure/entities/auth-user.typeorm-entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthTokenFactory } from './domain/factories/AuthToken.factory';
import { JwtStrategy } from './domain/auth-role-filter/JwtStrategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthUserTypeOrmEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CqrsModule,
    
  ],
  controllers: [AuthController],
  providers: [
    UserRepository,
    AuthTokenFactory,
    JwtStrategy,
    ...CommandHandlers,
  ],
  exports: [UserRepository, PassportModule],
})
export class AuthModule {}
