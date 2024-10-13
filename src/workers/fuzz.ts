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
  const { args, wordlist } = event.data;

  for (const word of wordlist) {
    const targetUrl = `${args.url.replace(/FUZZ/g, word)}`;
    try {
      if (!args.extensions.length) {
        const response = await fetch(targetUrl, {
          method: args.method.toUpperCase(),
        });
        const workerResponse: FuzzWorkerResponse = {
          status: response.status,
          word: word,
          url: targetUrl,
          method: args.method.toUpperCase(),
        };
        ctx.postMessage(workerResponse);
      } else {
        for (const extension of args.extensions) {
          const targetUrlWithExtension = targetUrl + `.${extension}`;
          const response = await fetch(targetUrlWithExtension, {
            method: args.method.toUpperCase(),
          });
          const workerResponse: FuzzWorkerResponse = {
            status: response.status,
            word: word,
            url: targetUrlWithExtension,
            method: args.method.toUpperCase(),
          };
          ctx.postMessage(workerResponse);
        }
      }
    } catch (error) {
      console.log(error);
      const workerResponse: FuzzWorkerResponse = {
        status: HttpStatus.ServiceUnavailable.valueOf(),
        word: word,
        url: targetUrl,
        method: args.method.toUpperCase(),
      };
      ctx.postMessage(workerResponse);
    }
  }
  ctx.postMessage(FuzzWorkerMessageType.finish);
};

export {};
