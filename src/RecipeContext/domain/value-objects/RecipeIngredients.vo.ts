// Descripción: Value object que normaliza y valida el listado de ingredientes de una receta.
export class RecipeIngredients {
  public readonly value: string[];

  constructor(ingredients: string[]) {
    if (!Array.isArray(ingredients)) {
      throw new Error('Ingredients must be an array');
    }

    if (ingredients.length === 0) {
      throw new Error('Ingredients list cannot be empty');
    }

    const normalized = ingredients.map((ingredient) => {
      if (typeof ingredient !== 'string') {
        throw new Error('Each ingredient must be a string');
      }

      const trimmed = ingredient.trim();
      if (!trimmed) {
        throw new Error('Ingredients cannot be empty strings');
      }

      return trimmed;
    });

    this.value = normalized;
  }
}
