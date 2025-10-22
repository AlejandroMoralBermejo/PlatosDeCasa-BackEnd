export class ChangeUserRoleCommand{
    constructor(
        public readonly userId: string,
        public readonly newRol: string,
    ){}
}
