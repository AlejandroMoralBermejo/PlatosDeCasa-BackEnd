import { AuthUserEntity } from "../entities/AuthUser.entity"

export interface AuthUserPort{
    save(user: AuthUserEntity): Promise<AuthUserEntity>;
    delete(userId: string): Promise<{ message: string }>;
    findById(userId: string): Promise<AuthUserEntity>;
    findAll(): Promise<AuthUserEntity[]>;
    findByGmail(userGmail: string): Promise<AuthUserEntity>;
}