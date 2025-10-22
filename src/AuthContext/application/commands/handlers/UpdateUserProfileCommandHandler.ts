import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserProfileCommand } from '../UpdateUserProfileCommand';
import { UserRepository } from 'src/AuthContext/infrastructure/repositories/user.repository';

@Injectable()
@CommandHandler(UpdateUserProfileCommand)
export class UpdateUserProfileCommandHandler implements ICommandHandler<UpdateUserProfileCommand>{
    constructor(
        private readonly repo: UserRepository
    ){}

    async execute(command: UpdateUserProfileCommand): Promise<any> {
        const { userId, gmail, password, name } = command

        if(!gmail && !password && !name){
            throw new BadRequestException('You must provide at least one field to update')
        }

        const user = await this.repo.findById(userId)

        if(gmail && gmail !== user.gmail.value){
            const gmailAlreadyInUse = await this.repo.findByGmailOrNull(gmail)
            if(gmailAlreadyInUse && gmailAlreadyInUse.id.value !== user.id.value){
                throw new BadRequestException('Gmail already in use')
            }
            user.changeGmail(gmail)
        }

        if(password){
            user.changePassword(password)
        }

        if(name){
            user.changeName(name)
        }

        const updatedUser = await this.repo.update(user)

        return {
            id: updatedUser.id.value,
            gmail: updatedUser.gmail.value,
            name: updatedUser.name,
            rol: updatedUser.rol.value,
        }
    }
}
