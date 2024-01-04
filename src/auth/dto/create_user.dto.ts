import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'asdasdqw', description: 'access_token'})
    readonly access_token: string;
    @ApiProperty({example: 'wefsdfs', description: 'refresh_token'})
    readonly refresh_token: string;
}