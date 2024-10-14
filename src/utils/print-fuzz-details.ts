import chalk from "chalk";
import type { Args } from "./arg-parser.ts";

export const printFuzzDetails = (args: Args, wordlistSize: number): void => {
  let info: Record<string, string> = {
    "Target URL:": args.url,
    "Wordlist:": `${args.wordlist} (${wordlistSize.toString()} lines)`,
    "Method:": args.method,
    "Threads:": args.threads.toString(),
    "Status Filter:": args.status_filter.join(", "),
  };

  if (args.extensions.length > 0) {
    info = {
      ...info,
      "Extensions:": args.extensions.join(", "),
    };
  }

  if (args.headers.length > 0) {
    info = {
      ...info,
      "Headers:": args.headers,
    };
  }

  if (args.output) {
    info = {
      ...info,
      "Output:": args.output,
    };
  }

  const longestLabelLength = Math.max(
    ...Object.keys(info).map((label) => label.length),
  );

  Object.entries(info).forEach(([label, value]) => {
    const paddedLabel = label.padEnd(longestLabelLength + 5);
    console.log(
      chalk.magentaBright.bold("[+]") + " " + chalk.white(paddedLabel) +
        " " +
        chalk.yellow(value),
    );
  });
};
