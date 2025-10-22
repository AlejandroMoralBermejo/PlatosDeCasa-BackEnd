// Descripción: Handler que devuelve una receta únicamente si pertenece al usuario autenticado.
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetRecipeByIdCommand } from '../GetRecipeByIdCommand';
import { RecipeRepository } from 'src/RecipeContext/infrastructure/repositories/recipe.repository';

@Injectable()
@CommandHandler(GetRecipeByIdCommand)
export class GetRecipeByIdCommandHandler
  implements ICommandHandler<GetRecipeByIdCommand>
{
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(command: GetRecipeByIdCommand): Promise<any> {
    const recipe = await this.recipeRepository.findById(command.recipeId);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    if (recipe.authorId.value !== command.requesterId) {
      throw new ForbiddenException('You are not allowed to access this recipe');
    }

    return {
      id: recipe.id.value,
      authorId: recipe.authorId.value,
      title: recipe.title.value,
      description: recipe.description.value,
      ingredients: recipe.ingredients.value,
      steps: recipe.steps.value,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    };
  }
}
