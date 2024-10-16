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
import type {
  FileOutputType,
  FileRequestItemOutput,
} from "../types/file-output-type.ts";
import { VERSION } from "./constants.ts";

let counter = 0;
let wordlistSize = 0;
let userArgs: Args;
let animationFrame: number = 0;

export function executeWorkers(args: Args, wordlist: string[]) {
  userArgs = args;
  wordlistSize = wordlist.length;
  const wordsPerWorker = Math.ceil(wordlist.length / args.threads);
  const chunkedWordLIst = chunk(wordlist, wordsPerWorker);
  const workerUrl = new URL(FUZZ_WORKER_PATH, import.meta.url).href;

  for (let i = 0; i < chunkedWordLIst.length; i++) {
    const item = chunkedWordLIst[i];
    const message: FuzzWorkerMessage = {
      args,
      wordlist: item,
    };

    const worker = new Worker(workerUrl, {
      type: "module",
    });
    worker.onmessage = fuzzMessageHandler;
    worker.postMessage(message);
  }
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

  if (shouldPrintResponse(e.data)) {
    printResponse(e.data);
    if (userArgs.output) {
      saveResultsToFile(e.data, userArgs.output);
    }
  }
  counter++;
  printProgress();
}

function printResponse(response: FuzzWorkerResponse): void {
  const message = `[${response.method} ${response.status}] ${response.url}\n`;
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
}

function getLoadingAnimation(): string {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  if (animationFrame === frames.length) {
    animationFrame = 0;
  }
  return frames[animationFrame++];
}

function printProgress(): void {
  const progress =
    `${getLoadingAnimation()} Progress: [${counter}/${wordlistSize}]\r`;

  stdout.write(chalk.blueBright(progress));
  if (counter === wordlistSize) {
    stdout.write(chalk.cyan("\nFinished!\n"));
    console.timeEnd(chalk.cyan("Execution Time"));
  }
}
function saveResultsToFile(
  message: FileRequestItemOutput,
  filePath: string,
): void {
  let existingData: FileOutputType = {
    createdAt: new Date().toISOString(),
    version: `denoFuzz v${VERSION}`,
    requests: [],
  };

  try {
    const fileContent = Deno.readFileSync(filePath);
    try {
      existingData = JSON.parse(
        new TextDecoder().decode(fileContent),
      ) as FileOutputType;
    } catch (_) {
      Deno.removeSync(filePath);
    }
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      existingData.requests = [];
    } else {
      console.error(chalk.red("Error reading existing file:"), error);
      return;
    }
  }
  existingData.requests.push(message);

  Deno.writeFileSync(
    filePath,
    new TextEncoder().encode(JSON.stringify(existingData, null, 2)),
  );
}

function shouldPrintResponse(response: FuzzWorkerResponse): boolean {
  if (userArgs.status_filter[0] === 0) {
    return true;
  }

  return userArgs.status_filter.includes(response.status);
}
