import chalk from "chalk";
import { parseArgs } from "./utils/arg-parser.ts";
import { executeWorkers } from "./utils/execute-workers.ts";
import { printBanner } from "./utils/print-banner.ts";
import { readFile } from "./utils/read-file.ts";

printBanner() 
const args = parseArgs();
const wordlist = readFile(args.wordlist);
console.log(chalk.italic.blueBright(`Starting!`));
executeWorkers(args,wordlist)