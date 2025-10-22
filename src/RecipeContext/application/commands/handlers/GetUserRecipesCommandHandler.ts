// Descripción: Handler que lista las recetas de un usuario tras validar identidad y existencia.
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetUserRecipesCommand } from '../GetUserRecipesCommand';
import { RecipeRepository } from 'src/RecipeContext/infrastructure/repositories/recipe.repository';
import { UserRepository } from 'src/AuthContext/infrastructure/repositories/user.repository';

@Injectable()
@CommandHandler(GetUserRecipesCommand)
export class GetUserRecipesCommandHandler
  implements ICommandHandler<GetUserRecipesCommand>
{
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: GetUserRecipesCommand): Promise<any> {
    if (command.userId !== command.requesterId) {
      throw new ForbiddenException('You are not allowed to access these recipes');
    }

    try {
      await this.userRepository.findById(command.userId);
    } catch (error) {
      throw new NotFoundException('User not found');
    }

    const recipes = await this.recipeRepository.findByAuthor(command.userId);

    return recipes.map((recipe) => ({
      id: recipe.id.value,
      authorId: recipe.authorId.value,
      title: recipe.title.value,
      description: recipe.description.value,
      ingredients: recipe.ingredients.value,
      steps: recipe.steps.value,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    }));
  }
}
