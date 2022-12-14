import { Request, Response } from "express";
import Expose from "../decorators/expose";
import Body from "../decorators/body";
import { Controller } from "../decorators/controller";
import { Get, Post } from "../decorators/methods";
import { HttpStatusCode } from "../utils/enums";

@Controller('/')
export default class IndexController {

    @Get('/')
    @Expose()
    async hello(req: Request, res: Response, next: Function) {
        // throw new Error('Hello');
        res.status(HttpStatusCode.OK).send('Hello World!');
    }

    @Post('/test')
    @Expose()
    @Body(
        {
            name: 'name',
            type: String,
            validate: (value: string) => {
                if (value.length < 3) {
                    return 'Name must be at least 3 characters long';
                }
                return null;
            }
        }
    )
    async testPost(req: Request, res: Response, next: Function) {
        res.status(HttpStatusCode.OK).send('Hello World!');
    }
}