// Descripción: Repositorio TypeORM que adapta la persistencia de recetas al puerto de dominio.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeRepositoryPort } from 'src/RecipeContext/domain/ports/RecipeRepositoryPort.interface';
import { RecipeEntity } from 'src/RecipeContext/domain/entities/Recipe.entity';
import { RecipeTypeOrmEntity } from '../entities/recipe.typeorm-entity';
import { RecipeIdentifier } from 'src/RecipeContext/domain/value-objects/RecipeIdentifier.vo';
import { RecipeAuthorIdentifier } from 'src/RecipeContext/domain/value-objects/RecipeAuthorIdentifier.vo';
import { RecipeTitle } from 'src/RecipeContext/domain/value-objects/RecipeTitle.vo';
import { RecipeDescription } from 'src/RecipeContext/domain/value-objects/RecipeDescription.vo';
import { RecipeIngredients } from 'src/RecipeContext/domain/value-objects/RecipeIngredients.vo';
import { RecipeSteps } from 'src/RecipeContext/domain/value-objects/RecipeSteps.vo';

@Injectable()
export class RecipeRepository implements RecipeRepositoryPort {
  constructor(
    @InjectRepository(RecipeTypeOrmEntity)
    private readonly repo: Repository<RecipeTypeOrmEntity>,
  ) {}

  private toDomain(entity: RecipeTypeOrmEntity): RecipeEntity {
    return new RecipeEntity(
      new RecipeIdentifier(entity.id),
      new RecipeAuthorIdentifier(entity.authorId),
      new RecipeTitle(entity.title),
      new RecipeDescription(entity.description),
      new RecipeIngredients(entity.ingredients),
      new RecipeSteps(entity.steps),
      entity.createdAt,
      entity.updatedAt,
    );
  }

  private toInfrastructure(recipe: RecipeEntity): RecipeTypeOrmEntity {
    return this.repo.create({
      id: recipe.id.value,
      authorId: recipe.authorId.value,
      title: recipe.title.value,
      description: recipe.description.value,
      ingredients: recipe.ingredients.value,
      steps: recipe.steps.value,
      isPublic: false,
      familyId: null,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    });
  }

  async save(recipe: RecipeEntity): Promise<RecipeEntity> {
    const record = this.toInfrastructure(recipe);
    await this.repo.save(record);
    return recipe;
  }

  async update(recipe: RecipeEntity): Promise<RecipeEntity> {
    const record = this.toInfrastructure(recipe);
    await this.repo.save(record);
    return recipe;
  }

  async delete(recipeId: string): Promise<void> {
    await this.repo.delete(recipeId);
  }

  async findById(recipeId: string): Promise<RecipeEntity | null> {
    const row = await this.repo.findOne({ where: { id: recipeId } });
    return row ? this.toDomain(row) : null;
  }

  async findByAuthor(authorId: string): Promise<RecipeEntity[]> {
    const rows = await this.repo.find({
      where: { authorId },
      order: { createdAt: 'DESC' },
    });
    return rows.map((row) => this.toDomain(row));
  }
}
