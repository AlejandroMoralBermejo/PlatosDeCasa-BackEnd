import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/AuthContext/infrastructure/repositories/user.repository';
import { LoginUserCommand } from '../LoginUserCommand';
import { AuthTokenFactory } from 'src/AuthContext/domain/factories/AuthToken.factory';

@Injectable()
@CommandHandler(LoginUserCommand)
export class LogInUserCOmmandHandler implements ICommandHandler<LoginUserCommand>{
    constructor(
        private readonly repo: UserRepository,
        private readonly tokenFactory: AuthTokenFactory
    ){}

    async execute(command: LoginUserCommand): Promise<any> {
        const user = await this.repo.findByGmail(command.gmail)
        const isPasswordRight = await user.password.compare(command.password)
        if(!isPasswordRight){
            throw new BadRequestException('The password is incorrect')
        }

        const token = this.tokenFactory.createAuthToken(user.id)

        return token
    }
}