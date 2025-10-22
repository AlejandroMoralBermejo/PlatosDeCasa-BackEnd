// Descripción: Value object que asegura que el identificador de receta sea un UUID v4 válido.
import { v4 as uuidv4, validate as uuidValidate, version as uuidVersion } from 'uuid';

export class RecipeIdentifier {
  public readonly value: string;

  constructor(id?: string) {
    if (!id) {
      this.value = uuidv4();
      return;
    }

    if (!uuidValidate(id) || uuidVersion(id) !== 4) {
      throw new Error('Recipe id must be a valid UUID v4');
    }

    this.value = id;
  }
}
