// Descripción: Comando que añade pasos adicionales a una receta existente.
export class AddRecipeStepsCommand {
  constructor(
    public readonly recipeId: string,
    public readonly requesterId: string,
    public readonly steps: string[],
  ) {}
}
