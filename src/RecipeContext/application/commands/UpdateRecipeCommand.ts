// Descripción: Comando que actualiza los datos principales de una receta existente.
export class UpdateRecipeCommand {
  constructor(
    public readonly recipeId: string,
    public readonly requesterId: string,
    public readonly title?: string,
    public readonly description?: string,
    public readonly ingredients?: string[],
    public readonly steps?: string[],
  ) {}
}
