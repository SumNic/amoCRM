<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Интеграция backEnd созданного на NestJs  с amoCRM.</p>

## Description

BackEnd позволяет получить доступ к виджету, созданному в amoCRM, добавлять новые контакты, редактировать существующие, заключать сделки с контактами.

## Авторизация

```bash
# https://verified-closely-eel.ngrok-free.app/auth/authorization_token
# Перейдя по нему, произойдет редирект на кнопку amoCRM для предоставления доступа к Виджету интеграции.
# После ввода регистрационных данных произойдет редирект на страницу
# https://verified-closely-eel.ngrok-free.app/auth/access_token 
# В который, в качестве query параметра будет передан authorization_token, который будет обменян на access и refresh tokens.
# Access token сохраняется в памяти приложения, а refresh token сохраняется в в ccokies с флагом httpOnly.
# После этого становится доспупным раздел работы с контактами.
```

## Контакты

```bash
# https://verified-closely-eel.ngrok-free.app/contacts/get-contact?name={sddf}&email={sdfggeee@mail.ru}&phone={98754732132}
# Данный endpoint позволяет создать нового контакта. Если контакт с таким email и/или phone существует, то данные о нём обновляются. 
# Затем происходит заключение сделки с этим контактом.
# Поля name, email и phone обязательны к заполнению.
#
# https://verified-closely-eel.ngrok-free.app/contacts/get-all-contacts
# Данный endpoint позволяет увидеть список всех контактов.
```

## Документация Swagger

```bash
# Документация Swagger доступна по следующему адресу: 
# https://verified-closely-eel.ngrok-free.app/docs
```
