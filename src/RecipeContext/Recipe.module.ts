// Descripción: Módulo NestJS que agrupa infraestructura, aplicación y dominio del contexto de recetas.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { RecipeController } from './infrastructure/controller/recipe.controller';
import { RecipeTypeOrmEntity } from './infrastructure/entities/recipe.typeorm-entity';
import { RecipeRepository } from './infrastructure/repositories/recipe.repository';
import { RecipeCommandHandlers } from './application/commands/handlers/command-handlers';
import { AuthModule } from 'src/AuthContext/Auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipeTypeOrmEntity]),
    CqrsModule,
    AuthModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeRepository, ...RecipeCommandHandlers],
})
export class RecipeModule {}
