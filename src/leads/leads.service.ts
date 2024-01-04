import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class LeadsService {

    constructor() {}

    async conclusionOfDeal(id: number): Promise<any> {

        const DATA = [{
            _embedded: {
                contacts: [
                    {id: id}
                ]
            }
        }]

        let response = await fetch(`https://8f1pov0ret6b.amocrm.ru/api/v4/leads`, {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.access_token}`
                },
                body: JSON.stringify(DATA)
            })

        if(response) {
            let result = await response.json()
            if (result) {
                return result
            } else {
                throw new BadRequestException();
            }
        } else {
            throw new Error(`Ошибка при добавлении сделки: ${response}`)
        }
    } 
}
