import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString } from "class-validator";

export class ChangeUserRolDto{
    @IsString()
    @IsIn(['admin', 'user'])
    @ApiProperty({ example: "admin", enum: ['admin', 'user'] })
    rol: string
}
