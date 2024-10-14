import { HttpStatus } from "@gizmo/http-status";
import {
  type FuzzWorkerMessage,
  FuzzWorkerMessageType,
  type FuzzWorkerResponse,
} from "../types/fuzz-types.ts";
import type { Args } from "../utils/arg-parser.ts";
const ctx = self as unknown as Worker;

export function parseHeaders(headers: string): Record<string, string> {
  const headersObject: Record<string, string> = {};

  if (headers === "") {
    return headersObject;
  }

  const headerRegex = /([A-Za-z\-]+):\s*([^,]+)(?:,\s*|$)/g;
  let match;

  while ((match = headerRegex.exec(headers)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
    headersObject[key] = value;
  }

  return headersObject;
}

async function fetchTarget(
  url: string,
  word: string,
  args: Args,
): Promise<FuzzWorkerResponse> {
  const headers = parseHeaders(args.headers);
  let workerResponse: FuzzWorkerResponse = {
    status: HttpStatus.ServiceUnavailable.valueOf(),
    word: word,
    url: url,
    method: args.method.toUpperCase(),
  };

  try {
    const response = await fetch(url, {
      method: args.method.toUpperCase(),
      headers,
    });
    workerResponse = {
      status: response.status,
      word: word,
      url: url,
      method: args.method.toUpperCase(),
    };
    return workerResponse;
  } catch (_) {
    return workerResponse;
  }
}

ctx.onmessage = async (
  event: MessageEvent<FuzzWorkerMessage>,
): Promise<void> => {
  const { args, wordlist } = event.data;

  for (const word of wordlist) {
    const targetUrl = `${args.url.replace(/FUZZ/g, word)}`;
    if (!args.extensions.length) {
      const workerResponse = await fetchTarget(
        targetUrl,
        word,
        args,
      );
      ctx.postMessage(workerResponse);
    } else {
      for (const extension of args.extensions) {
        const targetUrlWithExtension = targetUrl + `.${extension}`;
        const workerResponse = await fetchTarget(
          targetUrlWithExtension,
          word,
          args,
        );
        ctx.postMessage(workerResponse);
      }
    }
  }
  ctx.postMessage(FuzzWorkerMessageType.finish);
};

export {};
