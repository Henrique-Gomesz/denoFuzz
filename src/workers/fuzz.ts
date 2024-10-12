import chalk from "chalk";
import { FuzzWorkerMessageType, type FuzzWorkerMessage, type FuzzWorkerResponse } from "../types/fuzz-types.ts";
import {HttpStatus} from '@gizmo/http-status'
const ctx = self as unknown as Worker;

ctx.onmessage = async (
  event: MessageEvent<FuzzWorkerMessage>
): Promise<void> => {
  const { url, wordlist,method } = event.data;

  for (const word of wordlist) {
    try {
      const targetUrl = `${url}/${word}`
      const response = await fetch(targetUrl,{method});
      const workerResponse: FuzzWorkerResponse = {
        status: response.status,
        word: word,
        url: targetUrl,
        method:method
      };
  
      printResponse(workerResponse);
      ctx.postMessage(workerResponse);
    } catch (error) {
      console.log(chalk.redBright(`Response error: ${error}`));
    }
  }
  ctx.postMessage(FuzzWorkerMessageType.finish);
};

function printResponse(response: FuzzWorkerResponse) {
  const message = `(${response.method} ${response.status}) ${response.url}`

  switch(response.status){
      case HttpStatus.OK:
          console.log(chalk.green(message))
          break;
      case HttpStatus.NotFound:
          console.log(chalk.red(message))
          break;
      default:
          console.log(chalk.yellow(message))
          break;
  }
}

export {}
