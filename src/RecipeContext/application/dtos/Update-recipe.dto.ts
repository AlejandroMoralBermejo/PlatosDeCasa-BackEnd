// Descripción: DTO que controla los campos opcionales permitidos al actualizar una receta.
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @ApiPropertyOptional({ example: 'Tarta de manzana caramelizada' })
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  @ApiPropertyOptional({ example: 'Añadimos caramelo y especias para intensificar el sabor.' })
  description?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiPropertyOptional({ example: ['Manzanas', 'Harina integral', 'Azúcar moreno'] })
  ingredients?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiPropertyOptional({ example: ['Carameliza las manzanas', 'Mezcla la masa', 'Hornea 40 minutos'] })
  steps?: string[];
}
