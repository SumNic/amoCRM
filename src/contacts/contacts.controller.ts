import { Controller, Get, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { ContactsService } from './contacts.service';
import { Response } from 'express';
import { CreateContactDto } from './dto/create_contact.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('contacts')
export class ContactsController {

    constructor(private contactsService: ContactsService,
                private authService: AuthService) {}

    @ApiTags('Контакты')
    @ApiOperation({ summary: 'Создание/обновление контакта, заключение с ним сделки' })
    @Get('get-contact')
    @ApiResponse({
        status: HttpStatus.OK,
        type: String,
        description: 'Параметры сдлеки',
    })
    @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка при создании или редактировании контакта, либо ошибка при заключении сделки',
    })
    async getUser(@Query() dto: CreateContactDto, @Req() request: Request, @Res({ passthrough: true }) response: Response) {

        const user_token = await this.authService.cheсkAccessToken(process.env.access_token)

        if (!user_token && request.cookies) {
            const getNewTokens = await this.authService.getRefreshToken(request.cookies.token)
            process.env.access_token = getNewTokens.access_token
            response.cookie('token', getNewTokens.refresh_token, {httpOnly: true})
        }

        return this.contactsService.getOneContact(dto)
         
    }

    @ApiTags('Контакты')
    @ApiOperation({ summary: 'Получение списка всех контактов' })
    @Get('get-all-contacts')
    @ApiResponse({
        status: HttpStatus.OK,
        type: String,
        description: 'Список всех контактов',
    })
    @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка при получении контактов',
    })
    async getAllContacts(@Req() request: Request, @Res({ passthrough: true }) response: Response) {

        const user_token = await this.authService.cheсkAccessToken(process.env.access_token)
        if (!user_token && request.cookies) {
            const getNewTokens = await this.authService.getRefreshToken(request.cookies.token)
            process.env.access_token = getNewTokens.access_token
            response.cookie('token', getNewTokens.refresh_token, {httpOnly: true})
        }

        return this.contactsService.getAllContactFetch()
    }
}
