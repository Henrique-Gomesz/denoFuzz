import chalk from "chalk";
import { BANNER } from "./constants.ts";

export function printBanner() {
  console.log(chalk.magenta(BANNER));
}
