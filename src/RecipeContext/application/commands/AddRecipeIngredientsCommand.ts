// Descripción: Comando que agrega nuevos ingredientes a una receta existente.
export class AddRecipeIngredientsCommand {
  constructor(
    public readonly recipeId: string,
    public readonly requesterId: string,
    public readonly ingredients: string[],
  ) {}
}
