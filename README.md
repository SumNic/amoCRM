<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Интеграция backEnd созданного на NestJs  с amoCRM.</p>

## Description

BackEnd позволяет получить доступ к виджету, созданному в amoCRM, добавлять новые контакты, редактировать существующие, заключать сделки с контактами.

## Авторизация


<a href="https://verified-closely-eel.ngrok-free.app/auth/authorization_token" target="_blank">https://verified-closely-eel.ngrok-free.app/auth/authorization_token</a>

```bash
# Перейдя по нему, произойдет редирект на кнопку amoCRM для предоставления доступа к Виджету интеграции.
# После ввода регистрационных данных произойдет редирект на страницу
```
<a href="https://verified-closely-eel.ngrok-free.app/auth/access_token" target="_blank">https://verified-closely-eel.ngrok-free.app/auth/access_token</a>
```bash
# В который, в качестве query параметра будет передан authorization_token, который будет обменян на access и refresh tokens.
# Access token сохраняется в памяти приложения, а refresh token сохраняется в в ccokies с флагом httpOnly.
# После этого становится доспупным раздел работы с контактами.
```

## Контакты

<a href="https://verified-closely-eel.ngrok-free.app/contacts/get-contact?name=sddf&email=sdfggeee@mail.ru&phone=98754732132" target="_blank">https://verified-closely-eel.ngrok-free.app/contacts/get-contact?name=sddf&email=sdfggeee@mail.ru&phone=98754732132</a>

```bash
# Данный endpoint позволяет создать нового контакта. Если контакт с таким email и/или phone существует, то данные о нём обновляются. 
# Затем происходит заключение сделки с этим контактом.
# Поля name, email и phone обязательны к заполнению.
```

<a href="https://verified-closely-eel.ngrok-free.app/contacts/get-all-contacts" target="_blank">https://verified-closely-eel.ngrok-free.app/contacts/get-all-contacts</a>

```bash
# Данный endpoint позволяет увидеть список всех контактов.
```

## Документация Swagger

```bash
# Документация Swagger доступна по следующему адресу: 
```
<a href="https://verified-closely-eel.ngrok-free.app/docs" target="_blank">https://verified-closely-eel.ngrok-free.app/docs</a>

## Тестирование приложения

```bash
# Приложение можно протестировать непосредственно в браузере, либо Postman или Swagger.
```

