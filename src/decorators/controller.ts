import chalk from 'chalk';
import express from 'express';
import GlobalRouter from '../global-router';

function watch(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(chalk.green(chalk.blue(`[${new Date().toLocaleString()}]`) + chalk.red(`[${req.ip}]`) + ' Request: ' + req.method + ' ' + req.url));
    next();
}

export function Controller(routePrefix: string) {
    while (routePrefix.startsWith('/') && routePrefix.lastIndexOf('/') !== 0) routePrefix = routePrefix.slice(1);
    console.log(`${chalk.bold(`BEGIN ${routePrefix}`)} ${chalk.gray('Controller')}`);
    return function (constructor: Function) {
        const router = express.Router();
        Object.getOwnPropertyNames(constructor.prototype).forEach(key => {
            if (key === 'constructor') return;
            const routeHandler = constructor.prototype[key];
            const path = Reflect.getMetadata('path', constructor.prototype, key);
            const method = Reflect.getMetadata('method', constructor.prototype, key).toString();
            const middlewares = Reflect.getMetadata('middlewares', constructor.prototype, key) || [];
            if (path) {
                switch (method) {
                    case 'get':
                        router.get(`${path}`, watch, ...middlewares, routeHandler);
                        console.log(`${chalk.blueBright(`GET ${path}`)} ${chalk.gray('Route')}`);
                        break;
                    case 'post':
                        router.post(`${path}`, watch, ...middlewares, routeHandler);
                        console.log(`${chalk.blueBright(`POST ${path}`)} ${chalk.gray('Route')}`);
                        break;
                    case 'put':
                        router.put(`${path}`, watch, ...middlewares, routeHandler);
                        console.log(`${chalk.blueBright(`PUT ${path}`)} ${chalk.gray('Route')}`);
                        break;
                    case 'delete':
                        router.delete(`${path}`, watch, ...middlewares, routeHandler);
                        console.log(`${chalk.blueBright(`DELETE ${path}`)} ${chalk.gray('Route')}`);
                        break;
                    case 'patch':
                        router.patch(`${path}`, watch, ...middlewares, routeHandler);
                        console.log(`${chalk.blueBright(`PATCH ${path}`)} ${chalk.gray('Route')}`);
                        break;
                    case 'head':
                        router.head(`${path}`, watch, ...middlewares, routeHandler);
                        console.log(`${chalk.blueBright(`HEAD ${path}`)} ${chalk.gray('Route')}`);
                        break;
                    case 'options':
                        router.options(`${path}`, watch, ...middlewares, routeHandler);
                        console.log(`${chalk.blueBright(`OPTIONS ${path}`)} ${chalk.gray('Route')}`);
                        break;
                    default:
                        throw new Error(`Method ${method} not allowed`);
                }
            }
        });
        GlobalRouter.addRouter(routePrefix, router);
        console.log(`${chalk.bold(`END ${routePrefix}`)} ${chalk.gray('Controller')}`);
    }
}