import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './env';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT_SERVER ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`WebSocket server is running on ws://localhost:${env.PORT}`);

}


bootstrap();
