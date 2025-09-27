import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetAllUsersCommand } from '../GetAllUsersCommand';
import { UserRepository } from 'src/AuthContext/infrastructure/repositories/user.repository';

@Injectable()
@CommandHandler(GetAllUsersCommand)
export class GetAllUsersCommandHandler implements ICommandHandler<GetAllUsersCommand>{
    constructor(
        private readonly repo: UserRepository
    ){}

    async execute(command: GetAllUsersCommand): Promise<any> {
        const users = await this.repo.findAll()

        return users
    }
}