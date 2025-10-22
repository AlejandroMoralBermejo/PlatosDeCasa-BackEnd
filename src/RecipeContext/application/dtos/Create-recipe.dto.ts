// Descripción: DTO que valida la carga útil para crear una receta.
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @ApiProperty({ example: 'Tarta de manzana casera' })
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  @ApiProperty({ example: 'Receta tradicional con base de mantequilla y relleno de manzana.' })
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiProperty({ example: ['Manzanas', 'Harina', 'Mantequilla'] })
  ingredients: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiProperty({ example: ['Precalienta el horno', 'Mezcla los ingredientes', 'Hornea 45 minutos'] })
  steps: string[];
}
