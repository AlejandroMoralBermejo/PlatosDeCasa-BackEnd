import { Repository } from "typeorm";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserEntity } from "src/AuthContext/domain/entities/AuthUser.entity";
import { AuthUserTypeOrmEntity } from "../entities/auth-user.typeorm-entity";
import { AuthUserPort } from "src/AuthContext/domain/ports/AuthUserPort.interface";
import { AuthEntityIdentifier } from "src/AuthContext/domain/value-objects/AuthEntityIdentifier.vo";
import { AuthGmail } from "src/AuthContext/domain/value-objects/AuthGmail.vo";
import { AuthPassword } from "src/AuthContext/domain/value-objects/AuthPassword.vo";
import { AuthRol } from "src/AuthContext/domain/value-objects/AuthRol.vo";

@Injectable()
export class UserRepository implements AuthUserPort {
    constructor(
        @InjectRepository(AuthUserTypeOrmEntity)
        private readonly repo: Repository<AuthUserTypeOrmEntity>
    ){}

    parseToDomain(user: AuthUserTypeOrmEntity){
        return new AuthUserEntity(
                new AuthEntityIdentifier(user.id),
                new AuthGmail(user.gmail),
                new AuthPassword(user.hashedPassword),
                new AuthRol(user.rol),
                user.name
            )
    }

    parseToInfrastructure(user: AuthUserEntity){
        const typeOrmUser = new AuthUserTypeOrmEntity()
        typeOrmUser.id = user.id.value
        typeOrmUser.gmail = user.gmail.value
        typeOrmUser.hashedPassword = user.password.value
        typeOrmUser.rol = user.rol.value
        typeOrmUser.name = user.name

        return typeOrmUser
    }

    async save(user: AuthUserEntity): Promise<AuthUserEntity> {
        const record = this.parseToInfrastructure(user)
        await this.repo.save(record);
        return user
    }

    async findAll(): Promise<AuthUserEntity[]> {
        const rows = await this.repo.find()

        return rows.map(row => 
            this.parseToDomain(row)
        )
    }

    async findById(userId: string): Promise<AuthUserEntity> {
        const row = await this.repo.findOne({
            where: { id: userId }
        })

        if(!row){
            console.error('No se ha encontrado al usuario por id en user.repository AuthContext')
            throw new Error('User not found')
        }

        const user = this.parseToDomain(row)

        return user
    }

    async findByGmail(userGmail: string): Promise<AuthUserEntity> {
        const row = await this.repo.findOne({
            where: { gmail: userGmail}
        })

        if(!row){
            console.error('No se ha encontrado el usuario por gmail en user.repository AuthContext')
            throw new Error('User not found')
        }

        return this.parseToDomain(row)
    }


    async delete(userId: string): Promise<{ message: string; }> {

        const row = await this.repo.delete(userId)

        if(row.affected === 0){
            console.error('No se ha podido borrar el usuario de la bbdd en user.repository AuthContext')
            throw new Error('User not deleted')
        }

        return { message: 'User deleted correctly'}
    }
   
}

