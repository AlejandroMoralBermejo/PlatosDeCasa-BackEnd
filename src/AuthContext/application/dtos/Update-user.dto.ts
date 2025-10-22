import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, Matches } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: "example@gmail.com" })
    gmail?: string

    @IsOptional()
    @IsString()
    @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
    @Matches(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Password must contain at least one special character' })
    @ApiPropertyOptional({ example: "MyComplexPassword@2024" })
    password?: string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: "Geralt de Rivia" })
    name?: string
}
