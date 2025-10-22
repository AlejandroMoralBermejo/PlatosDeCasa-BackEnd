// Descripción: DTO que recibe el nuevo orden completo de pasos de una receta.
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ReorderStepsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @MaxLength(2000, { each: true })
  @ApiProperty({
    example: [
      'Precalienta el horno a 180°C.',
      'Mezcla los ingredientes secos.',
      'Añade los ingredientes húmedos y mezcla.',
    ],
  })
  steps: string[];
}
