import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  const config = new DocumentBuilder()
    .setTitle('Интеграция с amoCRM')
    .setDescription('Авторизация в приложении, поиск контактов, обновление данных контактов, создание сделки.')
    .setVersion('1.0.0')
    .addTag('Сумаревич Николай ezg2qujqs1iw@mail.ru')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document)
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}
bootstrap();
