import { ArgumentParser } from "argparse";
import {
  canWriteFile,
  checkIfFileExists,
  vaildateThreads,
  validateHeaders,
  validateHttpMethod,
  validateStatusCodeList,
  validateUrl,
} from "./args-value-validators.ts";
import { VERSION } from "./constants.ts";

export type Args = {
  wordlist: string;
  url: string;
  method: string;
  threads: number;
  status_filter: number[];
  extensions: string[];
  headers: string;
  output?: string;
};

export function parseArgs(): Args {
  const parser = new ArgumentParser({
    description: "denoFuzz",
  });

  parser.add_argument("-v", "--version", {
    action: "version",
    version: VERSION,
  });
  parser.add_argument("-m", "--method", {
    help: "HTTP method to use (Default: GET)",
    default: "GET",
    type: "str",
  });
  parser.add_argument("-H", "--headers", {
    help: "Headers to be sent with the request",
    default: "",
    type: "str",
  });
  parser.add_argument("-t", "--threads", {
    help: "Quantity of threads (Default: 50)",
    type: "int",
    default: 50,
  });
  parser.add_argument("-ext", "--extensions", {
    help: "File extensions to be appended to the wordlist",
    type: "str",
    nargs: "+",
    default: [],
  });
  parser.add_argument("-sf", "--status-filter", {
    help:
      "List of response status code to be filtered (default: 200,204,301,302,307,401,403,405,500,503). In order to match all status code provide '-sf 0' flag",
    nargs: "+",
    type: "int",
    default: [200, 204, 301, 302, 307, 401, 403, 405, 500, 503],
  });
  parser.add_argument("-o", "--output", {
    help: "Output file to save the results",
    type: "str",
  });
  parser.add_argument("-u", "--url", {
    help: "Http or https url to fuzz (example: http://example.com/FUZZ)",
    required: true,
    type: "str",
  });
  parser.add_argument("-w", "--wordlist", {
    help: "Path to wordlist",
    required: true,
    type: "str",
  });

  const args = parser.parse_args() as Args;
  validateArgsValues(args);

  return args;
}

function validateArgsValues(args: Args) {
  if (
    !checkIfFileExists(args.wordlist) || !validateUrl(args.url) ||
    !vaildateThreads(args.threads) ||
    !validateStatusCodeList(args.status_filter) ||
    !validateHttpMethod(args.method) ||
    !validateHeaders(args.headers) ||
    !canWriteFile(args.output)
  ) {
    Deno.exit(1);
  }
}
