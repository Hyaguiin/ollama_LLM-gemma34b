import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatHistoryModule } from './chat-history/chat-history.module';
import { OllamaModule } from './ollama/ollama.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import env from './env';
const dbType = env.DB_TYPE as string;

console.log("Database Type:", dbType);

@Module({
  imports: [TypeOrmModule.forRoot({
    type: dbType as any,
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    ssl: env.DB_SSL ? {
      rejectUnauthorized: env.DB_SSL_REJECT_UNAUTHORIZED,
    } : false,
    logging: env.DB_LOGGING,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),OllamaModule, ChatHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
