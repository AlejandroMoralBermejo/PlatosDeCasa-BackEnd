import * as jwt from 'jsonwebtoken'


export class AuthGenerateTokenService{
    constructor(
        private readonly jwtSecret: string,
        private readonly jwtRefreshSecret: string,
    ){}

    generate(userId: string, userEmail: string, userRole: string) {
        
        const accessToken = jwt.sign(
            {
                sub: userId,
                email: userEmail,
                role: userRole
            },
            this.jwtSecret,
            { expiresIn: '7d' }
        )
        return accessToken
    }
}