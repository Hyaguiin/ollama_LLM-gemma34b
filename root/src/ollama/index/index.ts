import WebSocket from 'ws';
import { ChatOllama } from '@langchain/ollama';
import env from 'src/env';

export const ollamaClient = new ChatOllama({
    model: 'llama3'
})
export const wss = new WebSocket.Server({port: env.PORT});


