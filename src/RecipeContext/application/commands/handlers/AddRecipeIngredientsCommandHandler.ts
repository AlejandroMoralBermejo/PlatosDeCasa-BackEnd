// Descripción: Handler que agrega ingredientes validados a una receta del usuario autenticado.
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddRecipeIngredientsCommand } from '../AddRecipeIngredientsCommand';
import { RecipeRepository } from 'src/RecipeContext/infrastructure/repositories/recipe.repository';

@Injectable()
@CommandHandler(AddRecipeIngredientsCommand)
export class AddRecipeIngredientsCommandHandler
  implements ICommandHandler<AddRecipeIngredientsCommand>
{
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(command: AddRecipeIngredientsCommand): Promise<any> {
    if (!command.ingredients.length) {
      throw new BadRequestException('At least one ingredient must be provided');
    }

    const recipe = await this.recipeRepository.findById(command.recipeId);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    if (recipe.authorId.value !== command.requesterId) {
      throw new ForbiddenException('You are not allowed to modify this recipe');
    }

    recipe.addIngredients(command.ingredients);

    const updated = await this.recipeRepository.update(recipe);

    return {
      id: updated.id.value,
      authorId: updated.authorId.value,
      title: updated.title.value,
      description: updated.description.value,
      ingredients: updated.ingredients.value,
      steps: updated.steps.value,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  }
}
