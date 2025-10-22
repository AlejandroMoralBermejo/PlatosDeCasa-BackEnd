// Descripción: Entidad agregada que representa una receta completa con controles de dominio.
import { RecipeIdentifier } from '../value-objects/RecipeIdentifier.vo';
import { RecipeAuthorIdentifier } from '../value-objects/RecipeAuthorIdentifier.vo';
import { RecipeTitle } from '../value-objects/RecipeTitle.vo';
import { RecipeDescription } from '../value-objects/RecipeDescription.vo';
import { RecipeIngredients } from '../value-objects/RecipeIngredients.vo';
import { RecipeSteps } from '../value-objects/RecipeSteps.vo';

export class RecipeEntity {
  constructor(
    public readonly id: RecipeIdentifier,
    public readonly authorId: RecipeAuthorIdentifier,
    public title: RecipeTitle,
    public description: RecipeDescription,
    public ingredients: RecipeIngredients,
    public steps: RecipeSteps,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  updateTitle(newTitle: string) {
    this.title = new RecipeTitle(newTitle);
    this.touch();
  }

  updateDescription(newDescription: string) {
    this.description = new RecipeDescription(newDescription);
    this.touch();
  }

  updateIngredients(newIngredients: string[]) {
    this.ingredients = new RecipeIngredients(newIngredients);
    this.touch();
  }

  addIngredients(newIngredients: string[]) {
    const merged = [...this.ingredients.value, ...newIngredients];
    this.ingredients = new RecipeIngredients(merged);
    this.touch();
  }

  updateSteps(newSteps: string[]) {
    this.steps = new RecipeSteps(newSteps);
    this.touch();
  }

  addSteps(newSteps: string[]) {
    const merged = [...this.steps.value, ...newSteps];
    this.steps = new RecipeSteps(merged);
    this.touch();
  }

  reorderSteps(newSteps: string[]) {
    const normalized = new RecipeSteps(newSteps);
    this.ensureSameSteps(normalized.value);
    this.steps = normalized;
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }

  private ensureSameSteps(newSteps: string[]) {
    if (newSteps.length !== this.steps.value.length) {
      throw new Error('Steps reorder must keep the same number of steps');
    }

    const originalCount = this.buildOccurrencesMap(this.steps.value);
    const newCount = this.buildOccurrencesMap(newSteps);

    for (const [step, count] of originalCount.entries()) {
      if (newCount.get(step) !== count) {
        throw new Error('Steps reorder must contain the same steps');
      }
      newCount.delete(step);
    }

    if (newCount.size > 0) {
      throw new Error('Steps reorder must contain the same steps');
    }
  }

  private buildOccurrencesMap(steps: string[]): Map<string, number> {
    return steps.reduce((map, step) => {
      map.set(step, (map.get(step) ?? 0) + 1);
      return map;
    }, new Map<string, number>());
  }
}
