import { v4 as uuidv4, validate as uuidValidate, version as uuidVersion } from 'uuid';

export class AuthEntityIdentifier {
    public readonly id: string;

    constructor(id?: string){
        if(!id){
            this.id = uuidv4()
        }else{
            if (!uuidValidate(id) || uuidVersion(id) !== 4) {
                throw new Error('Invalid UUID v4');
            }
            this.id = id;
        }
    }

    get value(): string {
        return this.id
    }

    equals(other: AuthEntityIdentifier): boolean {
        if (!other) return false;
        return this.id === other.id;
    }

    
}