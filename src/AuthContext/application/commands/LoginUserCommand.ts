export class LoginUserCommand{
    constructor(
        public readonly gmail: string,
        public readonly password: string
    ){}
}