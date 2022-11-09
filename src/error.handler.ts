import chalk from 'chalk';
import express from 'express';
import { HttpStatusCode } from './utils/enums';

// This function handles exceptions thrown in the request handlers
export default async function errorHandler(this: Function, req: express.Request, res: express.Response, next: express.NextFunction) {
    await this(req, res, next).catch((err: any) => {
        switch (typeof(err)) {
            default: {
                console.log(chalk.red("There was an error occurred:"));
                console.error(err);
                res.status(HttpStatusCode.InternalServerError).send("Server error!");
                break;
            }
        }
    });
}