import { AuthEntityIdentifier } from "../value-objects/AuthEntityIdentifier.vo";
import { AuthGmail } from "../value-objects/AuthGmail.vo";
import { AuthRol } from "../value-objects/AuthRol.vo";
import { AuthPassword } from "../value-objects/AuthPassword.vo";


export class AuthUserEntity{
    constructor(
        public readonly id: AuthEntityIdentifier,
        public gmail: AuthGmail,
        public password: AuthPassword,
        public rol: AuthRol,
        public name: string,
    ){
        if(!name){throw new Error('Name cannot be empty')}
    }

    public comparePassword(passwordToCompare: string){
        return AuthPassword.compare(passwordToCompare, this.password)
    }

    /* MUTATIONS */

    public changeGmail(newGmail: string){
        if(!newGmail){throw new Error('New Gmail cannot be empty')}
        this.gmail = new AuthGmail(newGmail)
    }

    public changePassword(newPassword: string){
        if(!newPassword){throw new Error('New Password cannot be empty')}
        this.password = new AuthPassword(newPassword)
    }

    public changeRol(newRol: string){
        if(!newRol) {throw new Error('New Error cannot be empty')}
        this.rol = new AuthRol(newRol)
    }

    public changeName(newName: string){
        if(!newName){throw new Error('New Name cannot be empty')}
        this.name = newName
    }


}
