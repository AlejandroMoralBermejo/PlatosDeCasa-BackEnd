import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('auth-users')
export class AuthUserTypeOrmEntity{
    @PrimaryColumn()
    id:string

    @Column()
    name: string

    @Column()
    gmail: string

    @Column()
    hashedPassword: string

    @Column()
    rol: string
}