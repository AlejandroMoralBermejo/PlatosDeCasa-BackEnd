// Descripción: Handler que reordena los pasos de una receta asegurando que sea del autor.
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReorderRecipeStepsCommand } from '../ReorderRecipeStepsCommand';
import { RecipeRepository } from 'src/RecipeContext/infrastructure/repositories/recipe.repository';

@Injectable()
@CommandHandler(ReorderRecipeStepsCommand)
export class ReorderRecipeStepsCommandHandler
  implements ICommandHandler<ReorderRecipeStepsCommand>
{
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(command: ReorderRecipeStepsCommand): Promise<any> {
    if (!command.steps.length) {
      throw new BadRequestException('Steps cannot be empty');
    }

    const recipe = await this.recipeRepository.findById(command.recipeId);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    if (recipe.authorId.value !== command.requesterId) {
      throw new ForbiddenException('You are not allowed to modify this recipe');
    }

    recipe.reorderSteps(command.steps);

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
