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

usage: main.ts [-h] [-v] [-m METHOD] [-t THREADS] -u URL -w WORDLIST

Deno fuzzer

optional arguments:
  -h, --help            show this help message and exit
  -v, --version         show program's version number and exit
  -m METHOD, --method METHOD
                        HTTP method to use
  -t THREADS, --threads THREADS
                        Quantity of threads (Default: 50)
  -u URL, --url URL     Url to fuzz
  -w WORDLIST, --wordlist WORDLIST
                        Path to wordlist
```

## Requirements

- [Deno](https://deno.land/) v2.0.0 or higher

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Henrique-Gomesz/denoFuzz
   cd denoFuzz
   ```

2. Install the dependencies:
   ```sh
   deno cache src/main.ts
   ```

## Usage

To start the project, run the following command:

```sh
deno run start main.ts [-h] [-v] [-m METHOD] [-t THREADS] -u URL -w WORDLIST
```

## To-do list

- Create output flag
- Validate inputs formats
- Ceate headers flag
- Create status response filter flag
- Create extension flag
- Fix progress counter display
