import express from 'express';
import GlobalRouter from '../global-router';

export function Controller(routePrefix: string) {
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
                        router.get(`${routePrefix}${path}`, ...middlewares, routeHandler);
                        break;
                    case 'post':
                        router.post(`${routePrefix}${path}`, ...middlewares, routeHandler);
                        break;
                    case 'put':
                        router.put(`${routePrefix}${path}`, ...middlewares, routeHandler);
                        break;
                    case 'delete':
                        router.delete(`${routePrefix}${path}`, ...middlewares, routeHandler);
                        break;
                    case 'patch':
                        router.patch(`${routePrefix}${path}`, ...middlewares, routeHandler);
                        break;
                    case 'head':
                        router.head(`${routePrefix}${path}`, ...middlewares, routeHandler);
                        break;
                    case 'options':
                        router.options(`${routePrefix}${path}`, ...middlewares, routeHandler);
                        break;
                    default:
                        throw new Error(`Method ${method} not allowed`);
                }
            }
        });
        GlobalRouter.addRouter(router);
    }
}