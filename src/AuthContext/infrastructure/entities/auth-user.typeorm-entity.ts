import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('auth-users')
export class AuthUserTypeOrmEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({ unique: true})
    name: string

    @Column({ unique: true})
    gmail: string

    @Column()
    hashedPassword: string

    @Column()
    rol: string
}