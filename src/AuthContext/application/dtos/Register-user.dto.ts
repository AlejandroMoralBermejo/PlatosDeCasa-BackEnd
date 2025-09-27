import { ApiProperty, ApiRequestTimeoutResponse } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class RegisterUserDto{
    @IsString()
    @ApiProperty({example:"example@gmail.com"})
    gmail: string

    @IsString()
    @ApiProperty({example:"mySecretPassword"})
    password: string

    @IsString()
    @ApiProperty({example:"Gerald de rivia"})
    name: string
}