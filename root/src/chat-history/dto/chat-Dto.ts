import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ChatHistoryDTO {
  @ApiProperty({ type: [String], description: 'Histórico de mensagens do bot' })
  @IsArray()
  @IsString({ each: true })
  BotHistory: string[];

  @ApiProperty({ type: [String], description: 'Histórico de mensagens humanas' })
  @IsArray()
  @IsString({ each: true })
  humanHistory: string[];

  @ApiProperty({ type: Number, description: 'Quantidade total de mensagens' })
  @IsNumber()
  chatLenght: number;
}

export class ChatHistoryResponseDTO {
  @ApiProperty({ type: [ChatHistoryDTO], description: 'Histórico completo de chats' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatHistoryDTO)
  Data: ChatHistoryDTO[];
}
