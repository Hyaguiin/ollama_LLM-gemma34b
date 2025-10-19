import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebScocket } from './ollama/wss';
import { verifyArrays } from './ollama/wss';
import { ValidationPipe } from '@nestjs/common';
import env from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT_SERVER ?? 5001);
  await WebScocket();
  console.log(`Application is running on: ${await app.getUrl()}`);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades não especificadas no DTO
      forbidNonWhitelisted: true, // lança erro se receber campos extras
      transform: true, // transforma payloads em instâncias de classes (class-transformer)
    }),
  );
}

bootstrap();
verifyArrays();
