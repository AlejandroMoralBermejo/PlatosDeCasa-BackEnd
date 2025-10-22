// Descripción: Comando que elimina una receta garantizando que el solicitante sea el autor.
export class DeleteRecipeCommand {
  constructor(
    public readonly recipeId: string,
    public readonly requesterId: string,
  ) {}
}
