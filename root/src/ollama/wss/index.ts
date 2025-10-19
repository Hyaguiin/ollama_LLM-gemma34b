import { wss, ollamaClient } from '../index/index';
import { prompt } from '../../context/prompt';
import { extractText } from 'src/utils/extText';
export let humanMessage: string[] = [];
export let ollamaResponse: string[] = [];

export async function WebScocket() {
  wss.on('connection', async function connectionClientOllama(ws) {
    ws.on('message', async function messageClientOllama(message): Promise<
      string | undefined
    > {
      try {
        let text: string;

        if (typeof message === 'string') {
          text = message;
        } else if (message instanceof Buffer) {
          text = message.toString('utf8');
        } else {
          text = String(message);
        }

        text = text.trim();

        if (!text) throw new Error('Message cannot be empty');

        const inputPrompt = prompt(text);

        const response = await ollamaClient.invoke(['human', inputPrompt]);

        if (!response) throw new Error('No response from model');

        const responseString = extractText(response.content);

        if (!responseString) throw new Error('Resposta do modelo vazia');

       ws.send(JSON.stringify({ sender: 'bot', text: responseString }));
        ollamaResponse.push(responseString);
        humanMessage.push(text);
        verifyArrays();

        return responseString;
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error processing message:', err.message);
          ws.send(JSON.stringify({ error: err.message }));
        }
      }
    });
  });
}

export async function verifyArrays() {
  console.log('\n======= Histórico de Conversa =======\n');

  const length = Math.max(humanMessage.length, ollamaResponse.length);

  for (let i = 0; i < length; i++) {
    const user = humanMessage[i] ?? '[Mensagem humana ausente]';
    const bot = ollamaResponse[i] ?? '[Resposta do bot ausente]';

    console.log(`Usuário: ${user}\n`);
    console.log(`Bot: ${bot}\n`);
    console.log('+===============================+\n');
  }
}

