import { ApiProperty } from "@nestjs/swagger";

export class CreateContactDto {
    @ApiProperty({example: 'Андрей Андреевич Андреев', description: 'ФИО клиента'})
    readonly name: string;
    @ApiProperty({example: 'dfgd@mail.ru', description: 'почтовый ящик'})
    readonly email: string;
    @ApiProperty({example: '89874531258', description: 'номер телефона'})
    readonly phone: string;
}