import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LeadsService } from 'src/leads/leads.service';
import { CreateContactDto } from './dto/create_contact.dto';

@Injectable()
export class ContactsService {

    constructor(private leadsService: LeadsService) {}

    /**
   * Создание/редактирование данных о пользователе, заключение с ним сделки.
   * @param {CreateContactDto} - DTO для создания и обновления данных о пользователе
   * @returns Заключение сделки с пользователем
   */
    async getOneContact(dto: CreateContactDto): Promise<any> {

        let id_Contact: number
        let id_NewContact: number
        let contactEmailExist = await this.getContactFetch(dto.email)
        let contactPhoneExist = await this.getContactFetch(dto.phone)
        if (contactEmailExist || contactPhoneExist) {
            id_Contact = contactEmailExist ? contactEmailExist._embedded.contacts[0].id : contactPhoneExist._embedded.contacts[0].id
            await this.updateContact(dto, id_Contact)
            return this.leadsService.conclusionOfDeal(id_Contact)
        }

        const newContact = await this.addContact(dto)
        id_NewContact = newContact._embedded.contacts[0].id
        return this.leadsService.conclusionOfDeal(id_NewContact)
    }

    /**
   * Получение списка всех контактов.
   * @returns список всех контактов.
   */
    async getAllContactFetch(): Promise<any> {
        let response = await fetch(`https://8f1pov0ret6b.amocrm.ru/api/v4/contacts`, {
                method:"GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.access_token}`
                }
            })

        if(response.status === 200) {
            let result = await response.json()
            return result
        } else if (response.status === 204) {
            return
        } else {
            throw new BadRequestException('Ошибка при получении списка всех контактов');
        }
    }

    async getContactFetch(query: string): Promise<any> {
        let response = await fetch(`https://8f1pov0ret6b.amocrm.ru/api/v4/contacts?query=${query}`, {
                method:"GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.access_token}`
                }
            })

        if(response.status === 200) {
            let result = await response.json()
            return result
        } else if (response.status === 204) {
            return
        } else {
            throw new BadRequestException('Ошибка при получении данных контакта');
        }
    }

    async addContact(dto: CreateContactDto): Promise<any> {

        const DATA = [{
            name: dto.name,
            custom_fields_values: [
                {
                    field_code: "EMAIL",
                    values: [
                        {
                            enum_code: "WORK",
                            value: dto.email
                        }
                    ]
                },
                {
                    field_code: "PHONE",
                    values: [
                        {
                            enum_code: "WORK",
                            value: dto.phone
                        }
                    ]
                },
            ],
        }]

        let response = await fetch('https://8f1pov0ret6b.amocrm.ru/api/v4/contacts', {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.access_token}`
                },
                body: JSON.stringify(DATA)
            })

        if(response.ok) {
            let result = await response.json()
            if (result) {
                return result
            } else {
                throw new NotFoundException();
            }
        } else {
            throw new BadRequestException('Ошибка при добавлении нового контакта');
        }
    }

    async updateContact(dto: CreateContactDto, id: number): Promise<any> {
        
        const DATA = {
            id: id,
            name: dto.name,
            custom_fields_values: [
                {
                    field_code: "EMAIL",
                    values: [
                        {
                            enum_code: "WORK",
                            value: dto.email
                        }
                    ]
                },
                {
                    field_code: "PHONE",
                    values: [
                        {
                            enum_code: "WORK",
                            value: dto.phone
                        }
                    ]
                },
            ],
        }

        let response = await fetch(`https://8f1pov0ret6b.amocrm.ru/api/v4/contacts/${id}`, {
                method:"PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.access_token}`
                },
                body: JSON.stringify(DATA)
            })

        if(response.ok) {
            let result = await response.json()
            if (result) {
                return result
            } else {
                throw new NotFoundException();
            }
        } else {
            throw new BadRequestException('Ошибка при обновлении данных контакта');
        }
    }
}
