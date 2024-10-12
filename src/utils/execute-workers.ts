import { chunk } from "@std/collections";
import type { FuzzWorkerMessage } from "../types/fuzz-types.ts";
import { fuzzMessageHandler } from "../workers-handlers/fuzz-worker-handler.ts";
import type { Args } from "./arg-parser.ts";
import { FUZZ_WORKER_PATH } from "./constants.ts";

export function executeWorkers(args: Args, wordlist: string[]) {
  const wordsPerWorker = Math.ceil(wordlist.length / args.threads);
  const chunkedWordLIst = chunk(wordlist, wordsPerWorker);
  
  chunkedWordLIst.forEach((item) => {
    const message: FuzzWorkerMessage = {
      method: args.method,
      url: args.url,
      wordlist: item,
    };

    const worker = new Worker(new URL(FUZZ_WORKER_PATH, import.meta.url).href, {
      type: "module",
    });
    worker.onmessage = fuzzMessageHandler;
    worker.postMessage(message);
  });
}
