import chalk from "chalk";
import { parseArgs } from "./src/utils/arg-parser.ts";
import { executeWorkers } from "./src/utils/execute-workers.ts";
import { printBanner } from "./src/utils/print-banner.ts";
import { readFile } from "./src/utils/read-file.ts";

printBanner() 
const args = parseArgs();
const wordlist = readFile(args.wordlist);
console.log(chalk.italic.blueBright(`Starting!`));
executeWorkers(args,wordlist)