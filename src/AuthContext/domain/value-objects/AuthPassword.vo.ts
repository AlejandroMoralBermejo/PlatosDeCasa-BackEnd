import * as bcrypt from 'bcrypt';

export class AuthPassword {
  private readonly password: string;

  constructor(password: string) {
    
    this.password = this.validatePassword(password);
  }

  private validatePassword(password: string){
    if (!password) {
      throw new Error("Password cannot be empty");
    }

    if (!this.hasValidLength(password)) {
      throw new Error("Password must be between 8 and 32 characters");
    }

    if (!this.hasUppercase(password)) {
      throw new Error("Password must contain at least one uppercase letter");
    }

    if (!this.hasLowercase(password)) {
      throw new Error("Password must contain at least one lowercase letter");
    }

    if (!this.hasDigit(password)) {
      throw new Error("Password must contain at least one number");
    }

    if (!this.hasSpecialChar(password)) {
      throw new Error("Password must contain at least one special character");
    }

    const hashedPassword = this.hashPassword(password)

    return hashedPassword

  }

  get value(){
    return this.password
  }

  /* Validaciones de la contraseña */

  private hasValidLength(password: string): boolean {
    return password.length >= 8 && password.length <= 32;
  }

  private hasUppercase(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  private hasLowercase(password: string): boolean {
    return /[a-z]/.test(password);
  }

  private hasDigit(password: string): boolean {
    return /[0-9]/.test(password);
  }

  private hasSpecialChar(password: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

  /* Hasheo de las contraseñas */ 

  private hashPassword(password:string){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  public static async compare(plain: string, hashed: AuthPassword): Promise<boolean> {
    return bcrypt.compare(plain, hashed.value);
  }

}
