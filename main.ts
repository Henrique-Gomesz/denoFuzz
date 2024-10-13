import chalk from "chalk";
import { parseArgs } from "./src/utils/arg-parser.ts";
import { executeWorkers } from "./src/utils/execute-workers.ts";
import { printBanner } from "./src/utils/print-banner.ts";
import { readFile } from "./src/utils/read-file.ts";
import { printFuzzDetails } from "./src/utils/print-fuzz-details.ts";

console.time("Execution Time");
printBanner();
const args = parseArgs();
const wordlist = readFile(args.wordlist);
printFuzzDetails(args, wordlist.length);
console.log(chalk.italic.blueBright(`Fuzzing!`));
executeWorkers(args, wordlist);
