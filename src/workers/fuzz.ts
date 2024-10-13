import { HttpStatus } from "@gizmo/http-status";
import {
  type FuzzWorkerMessage,
  FuzzWorkerMessageType,
  type FuzzWorkerResponse,
} from "../types/fuzz-types.ts";
const ctx = self as unknown as Worker;

ctx.onmessage = async (
  event: MessageEvent<FuzzWorkerMessage>,
): Promise<void> => {
  const { url, wordlist, method } = event.data;

  for (const word of wordlist) {
    const targetUrl = `${url}/${word}`;
    try {
      const response = await fetch(targetUrl, { method });
      const workerResponse: FuzzWorkerResponse = {
        status: response.status,
        word: word,
        url: targetUrl,
        method: method,
      };

      ctx.postMessage(workerResponse);
    } catch (_) {
      const workerResponse: FuzzWorkerResponse = {
        status: HttpStatus.ServiceUnavailable.valueOf(),
        word: word,
        url: targetUrl,
        method: method,
      };
      ctx.postMessage(workerResponse);
    }
  }
  ctx.postMessage(FuzzWorkerMessageType.finish);
};

export {};
