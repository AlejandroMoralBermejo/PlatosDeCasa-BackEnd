// Descripción: Handler que crea recetas verificando la existencia del autor y aplicando las reglas de dominio.
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRecipeCommand } from '../CreateRecipeCommand';
import { RecipeRepository } from 'src/RecipeContext/infrastructure/repositories/recipe.repository';
import { RecipeIdentifier } from 'src/RecipeContext/domain/value-objects/RecipeIdentifier.vo';
import { RecipeAuthorIdentifier } from 'src/RecipeContext/domain/value-objects/RecipeAuthorIdentifier.vo';
import { RecipeTitle } from 'src/RecipeContext/domain/value-objects/RecipeTitle.vo';
import { RecipeDescription } from 'src/RecipeContext/domain/value-objects/RecipeDescription.vo';
import { RecipeIngredients } from 'src/RecipeContext/domain/value-objects/RecipeIngredients.vo';
import { RecipeSteps } from 'src/RecipeContext/domain/value-objects/RecipeSteps.vo';
import { RecipeEntity } from 'src/RecipeContext/domain/entities/Recipe.entity';
import { UserRepository } from 'src/AuthContext/infrastructure/repositories/user.repository';

@Injectable()
@CommandHandler(CreateRecipeCommand)
export class CreateRecipeCommandHandler
  implements ICommandHandler<CreateRecipeCommand>
{
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateRecipeCommand): Promise<any> {
    try {
      await this.userRepository.findById(command.authorId);
    } catch (error) {
      throw new NotFoundException('Author not found');
    }

    const recipe = new RecipeEntity(
      new RecipeIdentifier(),
      new RecipeAuthorIdentifier(command.authorId),
      new RecipeTitle(command.title),
      new RecipeDescription(command.description),
      new RecipeIngredients(command.ingredients),
      new RecipeSteps(command.steps),
    );

    await this.recipeRepository.save(recipe);

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
