import { Controller, Post, Headers , Get, Put, Body, ValidationPipe, UnauthorizedException, Query, UseGuards, SetMetadata } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/AuthContext/domain/auth-role-filter/JwtAuthGuard';
import { RolesGuard } from 'src/AuthContext/domain/auth-role-filter/RolesGuard';

@Controller('auth')
export class AuthController{
    constructor(
        private readonly commandBus: CommandBus
    ){}

    @Post('register')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    @ApiOperation({ summary: 'Necesitas ser admin' })
    async register(){}

}