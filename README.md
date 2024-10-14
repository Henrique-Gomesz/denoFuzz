# denoFuzz

A web fuzzer made with TS and Deno

```sh
▓█████▄ ▓█████  ███▄    █  ▒█████    █████▒█    ██ ▒███████▒▒███████▒
▒██▀ ██▌▓█   ▀  ██ ▀█   █ ▒██▒  ██▒▓██   ▒ ██  ▓██▒▒ ▒ ▒ ▄▀░▒ ▒ ▒ ▄▀░
░██   █▌▒███   ▓██  ▀█ ██▒▒██░  ██▒▒████ ░▓██  ▒██░░ ▒ ▄▀▒░ ░ ▒ ▄▀▒░
░▓█▄   ▌▒▓█  ▄ ▓██▒  ▐▌██▒▒██   ██░░▓█▒  ░▓▓█  ░██░  ▄▀▒   ░  ▄▀▒   ░
░▒████▓ ░▒████▒▒██░   ▓██░░ ████▓▒░░▒█░   ▒▒█████▓ ▒███████▒▒███████▒
 ▒▒▓  ▒ ░░ ▒░ ░░ ▒░   ▒ ▒ ░ ▒░▒░▒░  ▒ ░   ░▒▓▒ ▒ ▒ ░▒▒ ▓░▒░▒░▒▒ ▓░▒░▒
 ░ ▒  ▒  ░ ░  ░░ ░░   ░ ▒░  ░ ▒ ▒░  ░     ░░▒░ ░ ░ ░░▒ ▒ ░ ▒░░▒ ▒ ░ ▒
 ░ ░  ░    ░      ░   ░ ░ ░ ░ ░ ▒   ░ ░    ░░░ ░ ░ ░ ░ ░ ░ ░░ ░ ░ ░ ░
   ░       ░  ░         ░     ░ ░            ░       ░ ░      ░ ░
 ░                                                 ░        ░

                        by: Henrique-Gomesz
                               v0.0.1

usage: main.ts [-h] [-v] [-m METHOD] [-H HEADERS] [-t THREADS]
               [-ext EXTENSIONS [EXTENSIONS ...]]
               [-sf STATUS_FILTER [STATUS_FILTER ...]] -u URL -w WORDLIST

denoFuzz

optional arguments:
  -h, --help            show this help message and exit
  -v, --version         show program's version number and exit
  -m METHOD, --method METHOD
                        HTTP method to use (Default: GET)
  -H HEADERS, --headers HEADERS
                        Headers to be sent with the request
  -t THREADS, --threads THREADS
                        Quantity of threads (Default: 50)
  -ext EXTENSIONS [EXTENSIONS ...], --extensions EXTENSIONS [EXTENSIONS ...]
                        File extensions to be appended to the wordlist
  -sf STATUS_FILTER [STATUS_FILTER ...], --status-filter STATUS_FILTER [STATUS_FILTER ...]
                        List of response status code to be filtered (default:
                        200,204,301,302,307,401,403,405,500)
  -u URL, --url URL     Http or https url to fuzz (example:
                        http://example.com/FUZZ)
  -w WORDLIST, --wordlist WORDLIST
                        Path to wordlist
```

## Requirements

- [Deno](https://deno.land/) v2.0.0 or higher

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Henrique-Gomesz/denoFuzz &&
   cd denoFuzz
   ```
2. Install the dependencies:
   ```sh
   deno install
   ```
3. Use:
   ```sh
   deno run start -u http://google.com/FUZZ -w /path/to/wordlist.txt
   ```

## Usage

To start the project, run the following command:

```sh
# Requests with custom amount of threads.
deno run start -u http://google.com/FUZZ -w /path/to/wordlist.txt -t 100

# Requests with custom authorization headers.
deno run start -u  http://google.com/FUZZ -w /path/to/wordlist.txt -H "Authorization: Bearer YOUR_ACCESS_TOKEN,User-Agent: MyCustomUserAgent/1.0"

# Allow display only requests with matcher response status code.
deno run start -u  http://google.com/FUZZ -w /path/to/wordlist.txt -sf 200 203

# Write output file with the request.
deno run start -u  http://google.com/FUZZ -w /path/to/wordlist.txt -o /tmp/fuzz.txt
```

## To-do list

- Improve output format
