import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../RegisterUserCommand';
import { UserRepository } from 'src/AuthContext/infrastructure/repositories/user.repository';
import { AuthEntityIdentifier } from 'src/AuthContext/domain/value-objects/AuthEntityIdentifier.vo';
import { AuthGmail } from 'src/AuthContext/domain/value-objects/AuthGmail.vo';
import { AuthPassword } from 'src/AuthContext/domain/value-objects/AuthPassword.vo';
import { AuthUserEntity } from 'src/AuthContext/domain/entities/AuthUser.entity';
import { AuthRol } from 'src/AuthContext/domain/value-objects/AuthRol.vo';


@Injectable()
@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand>{
    constructor(
        private readonly repo: UserRepository
    ){}

    async execute(command: RegisterUserCommand): Promise<any> {
        const id = new AuthEntityIdentifier()
        const gmail = new AuthGmail(command.gmail)
        const password = new AuthPassword(command.password)
        const rol = new AuthRol("user")

        const newUser = new AuthUserEntity(
            id,
            gmail,
            password,
            rol,
            command.name
        )

        const response = await this.repo.save(newUser)

        return response
    }
}