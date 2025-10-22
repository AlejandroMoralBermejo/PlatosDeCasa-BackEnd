import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangeUserRoleCommand } from '../ChangeUserRoleCommand';
import { UserRepository } from 'src/AuthContext/infrastructure/repositories/user.repository';

@Injectable()
@CommandHandler(ChangeUserRoleCommand)
export class ChangeUserRoleCommandHandler implements ICommandHandler<ChangeUserRoleCommand>{
    constructor(
        private readonly repo: UserRepository
    ){}

    async execute(command: ChangeUserRoleCommand): Promise<any> {
        const user = await this.repo.findById(command.userId)
        user.changeRol(command.newRol)

        const updatedUser = await this.repo.update(user)

        return {
            id: updatedUser.id.value,
            gmail: updatedUser.gmail.value,
            name: updatedUser.name,
            rol: updatedUser.rol.value,
        }
    }
}
