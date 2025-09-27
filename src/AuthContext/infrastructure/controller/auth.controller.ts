import { Controller, Post, Headers , Get, Put, Body, ValidationPipe, UnauthorizedException, Query, UseGuards, SetMetadata } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { GetAllUsersCommand } from 'src/AuthContext/application/commands/GetAllUsersCommand';
import { LoginUserCommand } from 'src/AuthContext/application/commands/LoginUserCommand';
import { RegisterUserCommand } from 'src/AuthContext/application/commands/RegisterUserCommand';
import { LoginUserDto } from 'src/AuthContext/application/dtos/Login-user.dto';
import { RegisterUserDto } from 'src/AuthContext/application/dtos/Register-user.dto';

import { JwtAuthGuard } from 'src/AuthContext/domain/auth-role-filter/JwtAuthGuard';
import { RolesGuard } from 'src/AuthContext/domain/auth-role-filter/RolesGuard';

@Controller('auth')
export class AuthController{
    constructor(
        private readonly commandBus: CommandBus
    ){}

    @Post('register')
    @ApiOperation({ summary: 'Necesitas ser admin' })
    async register(@Body() dto: RegisterUserDto){
        const command = new RegisterUserCommand(dto.gmail, dto.password, dto.name)
        const response = this.commandBus.execute(command)
        return response
    }

    @Get('users')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    @ApiOperation({ summary: 'Necesitas ser admin' })
    async getUsers(){
        const command = new GetAllUsersCommand()
        const response = this.commandBus.execute(command)
        return response
    }

    @Post('login')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    @ApiOperation({ summary: 'Necesitas ser admin' })
    async login(@Body() dto:LoginUserDto){
        const command = new LoginUserCommand(dto.gmail, dto.password)
        const response = this.commandBus.execute(command)
        return response
    }

}