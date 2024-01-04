import { BadRequestException, Injectable, NotFoundException, Redirect, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) {}

    /**
   * Получение кода авторизации.
   * @returns Редирект на сайт amocrm.ru, получение кода авторизации, редирект на endpoint /auth/access_token
   */
    getAuthorizationCode() {
        const DATA = {
            client_id: process.env.ID_INTEGRATION,
            state: process.env.STATE,
        }

        return {url: `https://www.amocrm.ru/oauth?client_id=${DATA.client_id}&state=${DATA.state}&mode=popup`}
    }

    /**
   * Получение access token.
   * @param query - query, содержащий в себе autorization token
   * @returns access и refresh token
   */
    async getAccessToken(query: any): Promise<any> {
        
        if(query.state !== process.env.STATE) {
            throw new Error('Ошибка авторизации')
        }

        const DATA = {
            client_id: process.env.ID_INTEGRATION,
            client_secret: process.env.SECRET_KEY,
            grant_type: "authorization_code",
            code: query.code,
            redirect_uri: `${process.env.REDIRECT_URI}/auth/access_token`
        }

        let response = await fetch('https://8f1pov0ret6b.amocrm.ru/oauth2/access_token', {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(DATA)
            })

        if(response.ok) {
            let result = await response.json()
            if (result.access_token && result.refresh_token) {
                process.env.access_token = result.access_token
                return  result.refresh_token
            } else {
                throw new UnauthorizedException();
            }
        } else {
            throw new BadRequestException('Ошибка при получении access token');
        }
    }

    /**
   * Проверка наличия access token и его срока действия.
   * @param token - access token
   * @returns access token при его наличии, либо пустую строку
   */
    async cheсkAccessToken(token: string): Promise<string> {
        
        if (token) {
            const user_token = this.jwtService.decode(token)
            if ((user_token.exp*1000 - Date.now()) > 0) return token
        } 
        
        return
    }

    /**
   * Проверка наличия access token и его срока действия.
   * @param refresh_token - refresh_token
   * @returns получение новой пары access и refresh tokens
   */
    async getRefreshToken(refresh_token: string) {
        const DATA = {
            client_id: process.env.ID_INTEGRATION,
            client_secret: process.env.SECRET_KEY,
            grant_type: "refresh_token",
            refresh_token: refresh_token,
            redirect_uri: `${process.env.REDIRECT_URI}/auth/access_token`
        }

        let response = await fetch('https://8f1pov0ret6b.amocrm.ru/oauth2/access_token', {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
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
            throw new BadRequestException('Ошибка при получении refresh token');
        }
    }
}
