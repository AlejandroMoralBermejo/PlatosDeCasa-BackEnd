import { Controller, Post, Get, Put, Body, ValidationPipe, UnauthorizedException, UseGuards, SetMetadata, Patch, Param, Request } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation } from '@nestjs/swagger';
import { GetAllUsersCommand } from 'src/AuthContext/application/commands/GetAllUsersCommand';
import { LoginUserCommand } from 'src/AuthContext/application/commands/LoginUserCommand';
import { RegisterUserCommand } from 'src/AuthContext/application/commands/RegisterUserCommand';
import { LoginUserDto } from 'src/AuthContext/application/dtos/Login-user.dto';
import { RegisterUserDto } from 'src/AuthContext/application/dtos/Register-user.dto';
import { UpdateUserProfileCommand } from 'src/AuthContext/application/commands/UpdateUserProfileCommand';
import { ChangeUserRoleCommand } from 'src/AuthContext/application/commands/ChangeUserRoleCommand';
import { UpdateUserDto } from 'src/AuthContext/application/dtos/Update-user.dto';
import { ChangeUserRolDto } from 'src/AuthContext/application/dtos/Change-user-rol.dto';

import { JwtAuthGuard } from 'src/AuthContext/domain/auth-role-filter/JwtAuthGuard';
import { RolesGuard } from 'src/AuthContext/domain/auth-role-filter/RolesGuard';

@Controller('auth')
export class AuthController{
    constructor(
        private readonly commandBus: CommandBus
    ){}

    @Post('register')
    @ApiOperation({ summary: 'Registro de usuarios' })
    async register(
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
        dto: RegisterUserDto
    ){
        const command = new RegisterUserCommand(dto.gmail, dto.password, dto.name)
        const response = await this.commandBus.execute(command)
        return response
    }

    @Get('users')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    @ApiOperation({ summary: 'Listado de usuarios (solo administradores)' })
    async getUsers(){
        const command = new GetAllUsersCommand()
        const response = await this.commandBus.execute(command)
        return response
    }

    @Post('login')
    @ApiOperation({ summary: 'Inicio de sesión' })
    async login(
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
        dto:LoginUserDto
    ){
        const command = new LoginUserCommand(dto.gmail, dto.password)
        const response = await this.commandBus.execute(command)
        return response
    }

    @Put('users/:id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Actualiza los datos del usuario autenticado o de un usuario si eres administrador' })
    async updateUser(
        @Param('id') userId: string,
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
        dto: UpdateUserDto,
        @Request() req: any
    ){
        const requester = req.user
        if(requester.id !== userId && requester.rol !== 'admin'){
            throw new UnauthorizedException('You are not allowed to modify this user')
        }

        const command = new UpdateUserProfileCommand(
            userId,
            dto.gmail,
            dto.password,
            dto.name
        )

        const response = await this.commandBus.execute(command)
        return response
    }

    @Patch('users/:id/role')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    @ApiOperation({ summary: 'Actualiza el rol de un usuario (solo administradores)' })
    async changeUserRol(
        @Param('id') userId: string,
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
        dto: ChangeUserRolDto
    ){
        const command = new ChangeUserRoleCommand(
            userId,
            dto.rol
        )

        const response = await this.commandBus.execute(command)
        return response
    }

}
