import { v4 as uuidv4 } from 'uuid';

export class AuthEntityIdentifier {
    public readonly id: string;

    constructor(){
        this.id = uuidv4()
    }

    get value(): string {
        return this.id
    }

    equals(other: AuthEntityIdentifier): boolean {
        if (!other) return false;
        return this.id === other.id;
    }
}