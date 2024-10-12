import chalk from 'chalk'

export function readFile(path:string):string[]{
    try {
        const decoder = new TextDecoder("utf-8");
        const file = Deno.readFileSync(path)
        return decoder.decode(file).split('\n')
    } catch (error) {
        console.error(chalk.red(`Error reading file: ${error}`))
        Deno.exit(1)
    }
}   