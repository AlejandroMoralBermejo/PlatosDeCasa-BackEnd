// Descripción: Listado de handlers de comandos registrados en el contexto de recetas.
import { CreateRecipeCommandHandler } from './CreateRecipeCommandHandler';
import { UpdateRecipeCommandHandler } from './UpdateRecipeCommandHandler';
import { DeleteRecipeCommandHandler } from './DeleteRecipeCommandHandler';
import { GetRecipeByIdCommandHandler } from './GetRecipeByIdCommandHandler';
import { GetUserRecipesCommandHandler } from './GetUserRecipesCommandHandler';
import { AddRecipeIngredientsCommandHandler } from './AddRecipeIngredientsCommandHandler';
import { AddRecipeStepsCommandHandler } from './AddRecipeStepsCommandHandler';
import { ReorderRecipeStepsCommandHandler } from './ReorderRecipeStepsCommandHandler';

export const RecipeCommandHandlers = [
  CreateRecipeCommandHandler,
  UpdateRecipeCommandHandler,
  DeleteRecipeCommandHandler,
  GetRecipeByIdCommandHandler,
  GetUserRecipesCommandHandler,
  AddRecipeIngredientsCommandHandler,
  AddRecipeStepsCommandHandler,
  ReorderRecipeStepsCommandHandler,
];
