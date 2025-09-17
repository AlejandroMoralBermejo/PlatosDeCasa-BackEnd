

export class AuthRol{
    private readonly rol: string

    constructor(rol: string){
        this.rol = this.validateRol(rol)
    }


    private validateRol(rol:string){
        if(!rol){
            throw new Error("Rol cannot be empty")
        }
        
        const formatedRol = rol.toLowerCase().trim()

        if(formatedRol != "admin" && 
            formatedRol != "user"){
            throw new Error("You must be admin or user")
        }

        return formatedRol
    }


    get value(){
        return this.rol
    }
} 