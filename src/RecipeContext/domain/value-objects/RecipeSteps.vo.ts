// Descripción: Value object que gestiona la secuencia ordenada de pasos de una receta.
export class RecipeSteps {
  public readonly value: string[];

  constructor(steps: string[]) {
    if (!Array.isArray(steps)) {
      throw new Error('Steps must be an array');
    }

    if (steps.length === 0) {
      throw new Error('Steps list cannot be empty');
    }

    const normalized = steps.map((step, index) => {
      if (typeof step !== 'string') {
        throw new Error(`Step ${index + 1} must be a string`);
      }

      const trimmed = step.trim();
      if (!trimmed) {
        throw new Error(`Step ${index + 1} cannot be empty`);
      }

      return trimmed;
    });

    this.value = normalized;
  }
}
