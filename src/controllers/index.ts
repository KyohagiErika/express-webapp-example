import { Request, Response } from "express";
import { Controller } from "../decorators/controller";
import { Get } from "../decorators/methods";

@Controller('/')
export class IndexController {

    @Get('/')
    async hello(req: Request, res: Response, next: Function) {
        res.send('Hello World!');
    }
}