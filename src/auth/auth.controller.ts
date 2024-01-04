import { Controller, Get, HttpStatus, Query, Redirect, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiTags('Авторизация')
    @ApiOperation({ summary: 'Получение autorization token' })
    @Get('authorization_token')
    @ApiResponse({ status: 301, description: 'Редирект на сайт amocrm.ru для получения autorization token' })
    @Redirect()
    getAuthorizationCode() {
        return this.authService.getAuthorizationCode()
      }

    @ApiTags('Авторизация')
    @ApiOperation({ summary: 'Получение access token' })
    @Get('access_token')
      @ApiResponse({
        status: HttpStatus.OK,
        type: String,
        description: 'Access и refresh tokens',
      })
      @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Ошибка при получении access token',
      })
    async getAccessToken(@Query() query: any, @Res({ passthrough: true }) response: Response) {
        const user_token = await this.authService.getAccessToken(query)
        response.cookie('token', user_token, {httpOnly: true})
        return user_token
    } 
}
