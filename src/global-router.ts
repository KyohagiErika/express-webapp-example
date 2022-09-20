import express from 'express';

export default class GlobalRouter {
    private static router: express.Router = express.Router();
    static addRouter(routePrefix: string, router: express.Router) {
        this.router.use(routePrefix, router);
    }
    static getGlobalRouter(): express.Router {
        return this.router;
    }
}