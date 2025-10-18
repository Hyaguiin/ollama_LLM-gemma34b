import { wss, ollamaClient } from '../index/index';
import { prompt } from '../../context/prompt';
import { extractText } from 'src/utils/extText';
let humanMessage: string[] = [];
let ollamaResponse: string[] = [];

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

        ws.send(JSON.stringify({ response: responseString }));

        ollamaResponse.push(responseString);
        humanMessage.push(text);

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
