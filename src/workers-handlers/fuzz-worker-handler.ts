
import {
  FuzzWorkerMessageType,
  type FuzzWorkerResponse,
} from "../types/fuzz-types.ts";
import {stdout} from 'node:process'
let counter = 0

export function fuzzMessageHandler(
  this: Worker,
  e: MessageEvent<FuzzWorkerMessageType | FuzzWorkerResponse>
) {
  if (
    e.data == FuzzWorkerMessageType.finish ||
    e.data == FuzzWorkerMessageType.start
  )
    return this.terminate();
  

    stdout.write(`[${counter}/${2500}]\r`);
    counter++
}
