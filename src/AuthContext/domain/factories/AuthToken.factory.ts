import { ConfigService } from "@nestjs/config";
import { AuthEntityIdentifier } from "../value-objects/AuthEntityIdentifier.vo";
import { AuthToken } from "../entities/AuthToken.entity";

export class AuthTokenFactory{
    constructor(private readonly configService: ConfigService){}

    createAuthToken(userId: AuthEntityIdentifier){
        const expiration = this.configService.get<string>('JWT_EXPIRATION');
        if(!expiration){throw new Error('Cant create a new Token without a expiration form .env')}

        const expirationDays = parseInt(expiration, 10)

        const now = new Date()

        const expirationAt = new Date(now.getTime() + expirationDays  * 24 * 60 * 60 * 1000)

        return new AuthToken(userId, expirationAt)
    }
}