import chalk from "chalk";

export function checkIfFileExists(path: string): boolean {
  try {
    const fileInfo = Deno.statSync(path);
    if (fileInfo.isFile) {
      return true;
    } else {
      console.log(chalk.redBright("Wordlist should be a file\n"));
      return false;
    }
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.log(chalk.redBright(`File not found at path ${path}\n`));
    } else {
      console.error("An error occurred:", error);
    }
    return false;
  }
}

export function canWriteFile(path?: string): boolean {
  if (!path) return true;

  try {
    Deno.writeTextFileSync(path, "test", { create: true, append: true });
    Deno.truncateSync(path);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.PermissionDenied) {
      console.log(
        chalk.redBright(
          `Permission denied: Cannot write to path ${chalk.yellow(path)}\n`,
        ),
      );
    } else {
      console.log(
        chalk.redBright(`Error to write file at path: ${chalk.yellow(path)}\n`),
      );
    }
    return false;
  }
}

export function validateUrl(url: string): boolean {
  const urlRegex =
    /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]{0,61}[a-zA-Z\d])?)\.)+[a-zA-Z]{2,6}|localhost|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[-a-zA-Z\d_]*)?$/i;

  if (!urlRegex.test(url)) {
    console.log(chalk.redBright("Invalid URL format\n"));
    return false;
  }

  return true;
}

export function vaildateThreads(threads: number): boolean {
  if (threads < 1) {
    console.log(chalk.redBright("Threads must be greater than 0\n"));
    return false;
  }

  return true;
}

export function validateStatusCodeList(responseFilter: number[]): boolean {
  responseFilter.forEach((code) => {
    if (code < 100 || code > 599) {
      console.log(
        chalk.redBright("Response filter values must be between 100 and 599\n"),
      );
      return false;
    }
  });

  return true;
}

export function validateHttpMethod(method: string): boolean {
  const httpMethods = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "OPTIONS",
    "HEAD",
  ];

  if (!httpMethods.includes(method.toUpperCase())) {
    console.log(chalk.redBright("Invalid HTTP method\n"));
    return false;
  }

  return true;
}

export function validateHeaders(headers: string) {
  if (headers === "") {
    return true;
  }

  const headerRegex =
    /^([A-Za-z\-]+):\s*([^,]+)(?:,\s*([A-Za-z\-]+):\s*([^,]+))*$/;

  if (!headerRegex.test(headers)) {
    console.log(
      chalk.redBright(
        "Headers should be in the format 'Header: Value, Header-value: Value2'\n",
      ),
    );
    return false;
  }

  return true;
}
