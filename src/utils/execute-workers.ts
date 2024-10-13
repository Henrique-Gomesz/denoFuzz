import { chunk } from "@std/collections";
import type { FuzzWorkerMessage } from "../types/fuzz-types.ts";
import {
  FuzzWorkerMessageType,
  type FuzzWorkerResponse,
} from "../types/fuzz-types.ts";
import type { Args } from "./arg-parser.ts";
import { FUZZ_WORKER_PATH } from "./constants.ts";
import { HttpStatus } from "@gizmo/http-status";
import chalk from "chalk";
import { stdout } from "node:process";

let counter = 1;
let wordlistSize = 0;

export function executeWorkers(args: Args, wordlist: string[]) {
  wordlistSize = wordlist.length;
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

export function fuzzMessageHandler(
  this: Worker,
  e: MessageEvent<FuzzWorkerMessageType | FuzzWorkerResponse>,
) {
  if (
    e.data == FuzzWorkerMessageType.finish ||
    e.data == FuzzWorkerMessageType.start
  ) {
    return this.terminate();
  }

  printResponse(e.data);
  counter++;
}

function printResponse(response: FuzzWorkerResponse) {
  // if(response.status === HttpStatus.ServiceUnavailable || response.status === HttpStatus.NotFound) {
  //   return
  // }

  const message = `[${response.method} ${response.status}] ${response.url}\n`;
  const progress = `Progress: [${counter}/${wordlistSize}]\r`;
  saveResultsToFile(message, "./results.txt");
  switch (response.status) {
    case HttpStatus.OK:
      stdout.write(chalk.green(message));
      break;
    case HttpStatus.NotFound:
      stdout.write(chalk.red(message));
      break;
    case HttpStatus.ServiceUnavailable:
      stdout.write(chalk.red(message));
      break;
    default:
      stdout.write(chalk.yellow(message));
      break;
  }

  if (counter === wordlistSize) {
    stdout.write(chalk.blueBright(`\n${progress}`));
    stdout.write(chalk.cyan("\nFinished!\n"));
    console.timeEnd("Execution Time");
  } else {
    stdout.write(chalk.blueBright(progress));
  }
}

function saveResultsToFile(message: string, filePath: string): void {
  try {
    Deno.writeFileSync(filePath, new TextEncoder().encode(message), {
      append: true,
    });
  } catch (error) {
    console.error(chalk.red("Error saving results to file:"), error);
  }
}
