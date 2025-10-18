import WebSocket from 'ws';
import { ChatOllama } from '@langchain/ollama';
import env from 'src/env';

export const ollamaClient = new ChatOllama({
    model: 'gemma3:4b'
})
export const wss = new WebSocket.Server({port: env.PORT});
console.log(`WebSocket server is running on ws://localhost:${env.PORT}`);



