export enum FuzzWorkerMessageType {
  start = "start",
  finish = "finish",
}

export interface FuzzWorkerMessage {
  url: string;
  wordlist: string[];
  method:string
}

export interface FuzzWorkerResponse {
  status: number;
  word: string;
  url: string;
  method:string
}
