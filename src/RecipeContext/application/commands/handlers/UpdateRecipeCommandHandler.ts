// Descripción: Handler que actualiza recetas garantizando que solo el autor pueda modificarlas.
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRecipeCommand } from '../UpdateRecipeCommand';
import { RecipeRepository } from 'src/RecipeContext/infrastructure/repositories/recipe.repository';

@Injectable()
@CommandHandler(UpdateRecipeCommand)
export class UpdateRecipeCommandHandler
  implements ICommandHandler<UpdateRecipeCommand>
{
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(command: UpdateRecipeCommand): Promise<any> {
    const recipe = await this.recipeRepository.findById(command.recipeId);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    if (recipe.authorId.value !== command.requesterId) {
      throw new ForbiddenException('You are not allowed to update this recipe');
    }

    if (
      !command.title &&
      !command.description &&
      !command.ingredients &&
      !command.steps
    ) {
      throw new BadRequestException('At least one field must be provided');
    }

    if (command.title) {
      recipe.updateTitle(command.title);
    }

    if (command.description) {
      recipe.updateDescription(command.description);
    }

    if (command.ingredients) {
      recipe.updateIngredients(command.ingredients);
    }

    if (command.steps) {
      recipe.updateSteps(command.steps);
    }

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
