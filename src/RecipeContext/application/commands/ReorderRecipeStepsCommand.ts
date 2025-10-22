// Descripción: Comando que reemplaza el orden actual de los pasos por uno nuevo.
export class ReorderRecipeStepsCommand {
  constructor(
    public readonly recipeId: string,
    public readonly requesterId: string,
    public readonly steps: string[],
  ) {}
}
