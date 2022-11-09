import express from 'express';
import { HttpStatusCode } from './utils/enums';

export default function notFoundHandler(req: express.Request, res: express.Response) {
    res.status(HttpStatusCode.NotFound).send("Not found!");
}