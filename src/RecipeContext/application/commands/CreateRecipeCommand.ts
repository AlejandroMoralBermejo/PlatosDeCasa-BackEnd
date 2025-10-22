// Descripción: Comando que solicita la creación de una nueva receta para un usuario.
export class CreateRecipeCommand {
  constructor(
    public readonly authorId: string,
    public readonly title: string,
    public readonly description: string,
    public readonly ingredients: string[],
    public readonly steps: string[],
  ) {}
}
