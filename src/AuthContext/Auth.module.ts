import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { CommandHandlers } from './application/commands/handlers/command-handler';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './infrastructure/controller/auth.controller';



@Module({
  imports: [
    TypeOrmModule.forFeature([])
  ],
  controllers: [AuthController],
  providers: [
    UserRepository,
    ...CommandHandlers,
  ],
  exports: [UserRepository, PassportModule],
})
export class AuthModule {}
