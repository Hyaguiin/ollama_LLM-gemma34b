import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebScocket } from './ollama/wss';
import { verifyArrays } from './ollama/wss';
import env from './env';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT_SERVER ?? 3000);
  await WebScocket();
  console.log(`Application is running on: ${await app.getUrl()}`);
  

}


bootstrap();
verifyArrays();
