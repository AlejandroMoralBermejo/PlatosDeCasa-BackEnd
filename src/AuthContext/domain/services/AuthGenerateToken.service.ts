import { AuthToken } from "../entities/AuthToken.entity";
import { AuthEntityIdentifier } from "../value-objects/AuthEntityIdentifier.vo";
import * as jwt from 'jsonwebtoken'


export class AuthGenerateTokenService{
    constructor(
        private readonly jwtSecret: string,
        private readonly jwtRefreshSecret: string
    ){}

    generate(userId: string, userEmail: string, userRole: string): AuthToken {
        const now = new Date()

        const accessTokenExpiresAt = new Date(now.getTime() + 15 * 60 * 1000)
        
        const accessToken = jwt.sign(
            {
                sub: userId,
                email: userEmail,
                role: userRole
            },
            this.jwtSecret,
            { expiresIn: '7d' }
        )

        const newToken = new AuthToken(new AuthEntityIdentifier(userId), accessTokenExpiresAt)

        return newToken
    }
}