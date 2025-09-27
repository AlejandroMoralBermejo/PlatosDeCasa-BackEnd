import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class LoginUserDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:"example@gamil.com"})
    gmail: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:"mySecretPassword"})
    password: string
}