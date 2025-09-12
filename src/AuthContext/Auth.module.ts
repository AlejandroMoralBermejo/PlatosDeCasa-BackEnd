import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

import { CommandHandlers } from './application/commands/handlers/command-handler';



@Module({
  imports: [
    TypeOrmModule.forFeature([])
  ],
//  controllers: [AuthController],
  providers: [
//    UserRepository,
    ...CommandHandlers,
//    JwtStrategy
  ],
//  exports: [UserRepository, PassportModule],
})
export class AuthModule {}
