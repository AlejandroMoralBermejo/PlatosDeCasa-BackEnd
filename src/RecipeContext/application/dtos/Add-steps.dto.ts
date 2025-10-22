// Descripción: DTO que permite añadir uno o varios pasos adicionales a una receta.
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddStepsDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  @ApiPropertyOptional({ example: 'Deja reposar la masa durante 15 minutos.' })
  step?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiPropertyOptional({
    example: [
      'Deja reposar la masa durante 15 minutos.',
      'Extiende la masa sobre el molde y pincha con un tenedor.',
    ],
  })
  steps?: string[];
}
