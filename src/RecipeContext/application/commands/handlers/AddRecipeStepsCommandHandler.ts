// Descripción: Handler que incorpora pasos adicionales a una receta si pertenece al usuario.
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddRecipeStepsCommand } from '../AddRecipeStepsCommand';
import { RecipeRepository } from 'src/RecipeContext/infrastructure/repositories/recipe.repository';

@Injectable()
@CommandHandler(AddRecipeStepsCommand)
export class AddRecipeStepsCommandHandler
  implements ICommandHandler<AddRecipeStepsCommand>
{
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(command: AddRecipeStepsCommand): Promise<any> {
    if (!command.steps.length) {
      throw new BadRequestException('At least one step must be provided');
    }

    const recipe = await this.recipeRepository.findById(command.recipeId);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    if (recipe.authorId.value !== command.requesterId) {
      throw new ForbiddenException('You are not allowed to modify this recipe');
    }

    recipe.addSteps(command.steps);

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
