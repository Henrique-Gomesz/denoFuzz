import type { Args } from "../utils/arg-parser.ts";

export enum FuzzWorkerMessageType {
  start = "start",
  finish = "finish",
}

export interface FuzzWorkerMessage {
  args: Args;
  wordlist: string[];
}

export interface FuzzWorkerResponse {
  status: number;
  word: string;
  url: string;
  method: string;
}
