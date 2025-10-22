// Descripción: Value object que valida y almacena el identificador del autor de una receta.
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export class RecipeAuthorIdentifier {
  public readonly value: string;

  constructor(authorId: string) {
    if (!authorId) {
      throw new Error('Author id cannot be empty');
    }

    if (!uuidValidate(authorId) || uuidVersion(authorId) !== 4) {
      throw new Error('Author id must be a valid UUID v4');
    }

    this.value = authorId;
  }
}
