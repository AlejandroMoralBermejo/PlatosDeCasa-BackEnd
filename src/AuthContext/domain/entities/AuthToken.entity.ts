import { AuthEntityIdentifier } from "../value-objects/AuthEntityIdentifier.vo";

export class AuthToken{
    constructor(
        private readonly userId: AuthEntityIdentifier,
        private readonly timeExpiration: Date
    ){}

    isAccesTokenExpired(currentDate: Date = new Date()){
        return currentDate > this.timeExpiration
    }

    getUserId(){
        return this.userId
    }
}