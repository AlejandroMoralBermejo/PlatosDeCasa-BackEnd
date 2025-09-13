import { AuthEntityIdentifier } from "../value-objects/AuthEntityIdentifier.vo";

export class AuthToken{
    constructor(
        private readonly userId: AuthEntityIdentifier,
        private readonly timeExpiration: Date
    ){}

    static isAccessTokenExpired(token: string, secret: string, currentDate: Date = new Date()){
        
    }

    isAccesTokenExpired(currentDate: Date = new Date()){
        return currentDate > this.timeExpiration
    }
}