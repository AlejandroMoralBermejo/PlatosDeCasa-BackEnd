// Descripción: Comando que recupera una receta si pertenece al usuario autenticado.
export class GetRecipeByIdCommand {
  constructor(
    public readonly recipeId: string,
    public readonly requesterId: string,
  ) {}
}
