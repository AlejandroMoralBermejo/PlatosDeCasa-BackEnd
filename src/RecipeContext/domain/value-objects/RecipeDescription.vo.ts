// Descripción: Value object que encapsula la descripción y evita textos vacíos o excesivos.
export class RecipeDescription {
  public readonly value: string;

  constructor(description: string) {
    if (!description) {
      throw new Error('Recipe description cannot be empty');
    }

    const trimmed = description.trim();
    if (trimmed.length < 10) {
      throw new Error('Recipe description must have at least 10 characters');
    }

    if (trimmed.length > 2000) {
      throw new Error('Recipe description must have at most 2000 characters');
    }

    this.value = trimmed;
  }
}
