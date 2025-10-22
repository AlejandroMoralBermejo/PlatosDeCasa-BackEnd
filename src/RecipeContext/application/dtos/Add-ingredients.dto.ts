// Descripción: DTO que permite agregar uno o varios ingredientes nuevos a una receta.
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddIngredientsDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  @ApiPropertyOptional({ example: 'Canela molida' })
  ingredient?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiPropertyOptional({ example: ['Canela molida', 'Azúcar glas'] })
  ingredients?: string[];
}
