export class RegisterUserCommand{
    constructor(
        public readonly gmail: string,
        public readonly password: string,
        public readonly name: string
    ){}
}