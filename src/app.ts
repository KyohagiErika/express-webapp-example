import express from 'express';
import AppConfig from './utils/app-config';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import GlobalRouter from './global-router';
import IndexController from './controllers';
import chalk from 'chalk';
import notFoundHandler from './not-found-handler';

class App {
    private app: express.Application;
    private server: http.Server;

    constructor(...controllers: Function[]) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.config();
        controllers.forEach((controller) => {
            controller.constructor();
        });
    }

    // Add configs here
    private config(): void {
        this.app.use(cors({
            origin: '*'
        }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(GlobalRouter.getGlobalRouter());
        this.app.use(notFoundHandler);
    }

    listen(): void {
        this.server.listen(AppConfig.PORT, () => {
            console.log(chalk.green(`Server started on port ${chalk.yellow(AppConfig.PORT)}`));
        });
    }
}

// Add controllers here
export default new App(
    IndexController
);