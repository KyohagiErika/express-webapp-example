import express from 'express';

export default class GlobalRouter {
    private static router: express.Router = express.Router();
    static addRouter(router: express.Router) {
        this.router.use(router);
    }
    static getGlobalRouter(): express.Router {
        return this.router;
    }
}