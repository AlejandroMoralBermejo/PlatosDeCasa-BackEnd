// Descripción: Controlador HTTP que expone el CRUD de recetas protegido por autenticación JWT.
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/AuthContext/domain/auth-role-filter/JwtAuthGuard';
import { CreateRecipeDto } from 'src/RecipeContext/application/dtos/Create-recipe.dto';
import { CreateRecipeCommand } from 'src/RecipeContext/application/commands/CreateRecipeCommand';
import { GetRecipeByIdCommand } from 'src/RecipeContext/application/commands/GetRecipeByIdCommand';
import { GetUserRecipesCommand } from 'src/RecipeContext/application/commands/GetUserRecipesCommand';
import { UpdateRecipeDto } from 'src/RecipeContext/application/dtos/Update-recipe.dto';
import { UpdateRecipeCommand } from 'src/RecipeContext/application/commands/UpdateRecipeCommand';
import { DeleteRecipeCommand } from 'src/RecipeContext/application/commands/DeleteRecipeCommand';
import { AddIngredientsDto } from 'src/RecipeContext/application/dtos/Add-ingredients.dto';
import { AddRecipeIngredientsCommand } from 'src/RecipeContext/application/commands/AddRecipeIngredientsCommand';
import { AddStepsDto } from 'src/RecipeContext/application/dtos/Add-steps.dto';
import { AddRecipeStepsCommand } from 'src/RecipeContext/application/commands/AddRecipeStepsCommand';
import { ReorderStepsDto } from 'src/RecipeContext/application/dtos/Reorder-steps.dto';
import { ReorderRecipeStepsCommand } from 'src/RecipeContext/application/commands/ReorderRecipeStepsCommand';

@ApiTags('recipes')
@Controller('recipes')
@UseGuards(JwtAuthGuard)
export class RecipeController {
  constructor(private readonly commandBus: CommandBus) {}

  // Descripción: Crea una receta asociada al usuario autenticado.
  @Post()
  @ApiOperation({ summary: 'Crea una nueva receta asociada al usuario autenticado' })
  async createRecipe(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: CreateRecipeDto,
    @Request() req: any,
  ) {
    const command = new CreateRecipeCommand(
      req.user.id,
      dto.title,
      dto.description,
      dto.ingredients,
      dto.steps,
    );

    return this.commandBus.execute(command);
  }

  // Descripción: Obtiene todas las recetas del usuario autenticado.
  @Get('user/:userId')
  @ApiOperation({ summary: 'Lista las recetas asociadas al usuario autenticado' })
  async getRecipesByUser(@Param('userId') userId: string, @Request() req: any) {
    const command = new GetUserRecipesCommand(userId, req.user.id);
    return this.commandBus.execute(command);
  }

  // Descripción: Recupera una receta particular si pertenece al usuario autenticado.
  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una receta si pertenece al usuario autenticado' })
  async getRecipeById(@Param('id') recipeId: string, @Request() req: any) {
    const command = new GetRecipeByIdCommand(recipeId, req.user.id);
    return this.commandBus.execute(command);
  }

  // Descripción: Actualiza los datos principales de una receta propia.
  @Put(':id')
  @ApiOperation({ summary: 'Actualiza una receta propia' })
  async updateRecipe(
    @Param('id') recipeId: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: UpdateRecipeDto,
    @Request() req: any,
  ) {
    const command = new UpdateRecipeCommand(
      recipeId,
      req.user.id,
      dto.title,
      dto.description,
      dto.ingredients,
      dto.steps,
    );

    return this.commandBus.execute(command);
  }

  // Descripción: Agrega uno o varios ingredientes a una receta propia.
  @Post(':id/ingredients')
  @ApiOperation({ summary: 'Añade ingredientes a una receta propia' })
  async addIngredients(
    @Param('id') recipeId: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: AddIngredientsDto,
    @Request() req: any,
  ) {
    const ingredients: string[] = [];
    if (dto.ingredient) {
      ingredients.push(dto.ingredient);
    }
    if (dto.ingredients) {
      ingredients.push(...dto.ingredients);
    }

    const command = new AddRecipeIngredientsCommand(
      recipeId,
      req.user.id,
      ingredients,
    );

    return this.commandBus.execute(command);
  }

  // Descripción: Añade pasos extra a una receta propia.
  @Post(':id/steps')
  @ApiOperation({ summary: 'Añade pasos adicionales a una receta propia' })
  async addSteps(
    @Param('id') recipeId: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: AddStepsDto,
    @Request() req: any,
  ) {
    const steps: string[] = [];
    if (dto.step) {
      steps.push(dto.step);
    }
    if (dto.steps) {
      steps.push(...dto.steps);
    }

    const command = new AddRecipeStepsCommand(recipeId, req.user.id, steps);

    return this.commandBus.execute(command);
  }

  // Descripción: Reordena todos los pasos de una receta propia respetando su contenido.
  @Put(':id/steps/reorder')
  @ApiOperation({ summary: 'Reordena los pasos de una receta propia' })
  async reorderSteps(
    @Param('id') recipeId: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: ReorderStepsDto,
    @Request() req: any,
  ) {
    const command = new ReorderRecipeStepsCommand(
      recipeId,
      req.user.id,
      dto.steps,
    );

    return this.commandBus.execute(command);
  }

  // Descripción: Elimina una receta que pertenece al usuario autenticado.
  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una receta propia' })
  async deleteRecipe(@Param('id') recipeId: string, @Request() req: any) {
    const command = new DeleteRecipeCommand(recipeId, req.user.id);
    return this.commandBus.execute(command);
  }
}
