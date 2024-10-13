import { ArgumentParser } from "argparse";
import { VERSION } from "./constants.ts";

export type Args = {
  wordlist: string;
  url: string;
  method: string;
  threads: number;
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
    help: "HTTP method to use",
    default: "GET",
    type: "str",
  });
  parser.add_argument("-t", "--threads", {
    help: "Quantity of threads (Default: 50)",
    type: "int",
    default: 50,
  });
  parser.add_argument("-u", "--url", {
    help: "Url to fuzz",
    required: true,
    type: "str",
  });
  parser.add_argument("-w", "--wordlist", {
    help: "Path to wordlist",
    required: true,
    type: "str",
  });

  return parser.parse_args() as Args;
}
