export class UpdateUserProfileCommand{
    constructor(
        public readonly userId: string,
        public readonly gmail?: string,
        public readonly password?: string,
        public readonly name?: string,
    ){}
}
