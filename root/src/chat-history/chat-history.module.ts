import { Module } from '@nestjs/common';
import ChatService from './services/chat-service';
import ChatRepository from './repository';
import ChatController from './controller/chat-Controller';
import { EntityChat } from './Model/chat-Entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([EntityChat]),
    ChatHistoryModule],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
})
export class ChatHistoryModule {

}
