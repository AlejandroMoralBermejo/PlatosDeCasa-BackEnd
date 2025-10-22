// Descripción: Value object que controla la longitud y formato del título de la receta.
export class RecipeTitle {
  public readonly value: string;

  constructor(title: string) {
    if (!title) {
      throw new Error('Recipe title cannot be empty');
    }

    const trimmed = title.trim();
    if (trimmed.length < 3) {
      throw new Error('Recipe title must have at least 3 characters');
    }

    if (trimmed.length > 150) {
      throw new Error('Recipe title must have at most 150 characters');
    }

    this.value = trimmed;
  }
}
