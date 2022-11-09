import chalk from "chalk";

export default function Expose() {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const req = args[0];
            console.log(chalk.redBright('Headers:'));
            console.log(chalk.cyan(JSON.stringify(req.headers, null, 2)));
            console.log(chalk.redBright('Body:'));
            console.log(chalk.cyan(JSON.stringify(req.body, null, 2)));
            console.log(chalk.redBright('Params:'));
            console.log(chalk.cyan(JSON.stringify(req.params, null, 2)));
            console.log(chalk.redBright('Query:'));
            console.log(chalk.cyan(JSON.stringify(req.query, null, 2)));
            console.log(chalk.redBright('Cookies:'));
            console.log(chalk.cyan(JSON.stringify(req.cookies, null, 2)));
            await originalMethod.apply(this, args);
        }
    }
}