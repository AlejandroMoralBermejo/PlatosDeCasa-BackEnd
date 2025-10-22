// Descripción: Puerto de persistencia para la agregación de recetas.
import { RecipeEntity } from '../entities/Recipe.entity';

export interface RecipeRepositoryPort {
  save(recipe: RecipeEntity): Promise<RecipeEntity>;
  update(recipe: RecipeEntity): Promise<RecipeEntity>;
  delete(recipeId: string): Promise<void>;
  findById(recipeId: string): Promise<RecipeEntity | null>;
  findByAuthor(authorId: string): Promise<RecipeEntity[]>;
}
