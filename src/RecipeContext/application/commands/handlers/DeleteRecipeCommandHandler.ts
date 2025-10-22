// Descripción: Handler que elimina recetas solo si pertenecen al solicitante autenticado.
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRecipeCommand } from '../DeleteRecipeCommand';
import { RecipeRepository } from 'src/RecipeContext/infrastructure/repositories/recipe.repository';

@Injectable()
@CommandHandler(DeleteRecipeCommand)
export class DeleteRecipeCommandHandler
  implements ICommandHandler<DeleteRecipeCommand>
{
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(command: DeleteRecipeCommand): Promise<any> {
    const recipe = await this.recipeRepository.findById(command.recipeId);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    if (recipe.authorId.value !== command.requesterId) {
      throw new ForbiddenException('You are not allowed to delete this recipe');
    }

    await this.recipeRepository.delete(recipe.id.value);

    return { message: 'Recipe deleted correctly' };
  }
}
