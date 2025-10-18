  import { wss, ollamaClient} from '../index/index';
  let humanMessage: string[] = [];
  let ollamaResponse: string[] = [];
   wss.on('connection', async function connectionClientOllama(ws){
    ws.on('message', async function messageClientOllama(message: string): Promise<string | undefined>{
      try{
        if(typeof message !== 'string') throw new Error("Message must be a string");
        if(!message || message === undefined) throw new Error("Message cannot be empty");
        const input = message.toString().trim();
        const response = await ollamaClient.invoke(['human', input]);
        ws.send(JSON.stringify({response: response}));
        const responseString = response.toString().trim();
        ollamaResponse.push(responseString);
        humanMessage.push(input);
        return responseString;
        }catch(err){
        if(err instanceof Error){
          console.error("Error processing message:", err.message);
          ws.send(JSON.stringify({error: err.message}));
      }
    }})
  }  
)

export default wss;