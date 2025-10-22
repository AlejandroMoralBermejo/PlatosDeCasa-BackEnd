// Descripción: Comando que lista todas las recetas asociadas a un usuario.
export class GetUserRecipesCommand {
  constructor(
    public readonly userId: string,
    public readonly requesterId: string,
  ) {}
}
