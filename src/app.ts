import express from 'express';
import AppConfig from './utils/app-config';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import SocketIO from 'socket.io';
import GlobalRouter from './global-router';
import { IndexController } from './controllers';

class AppSocketEvent {
    static readonly CONNECTION = 'connection';
    static readonly DISCONNECT = 'disconnect';
    static readonly MESSAGE = 'message';
}

class AppSocketEventListener {
    static initalize(socket: SocketIO.Socket) {
        console.log(`Socket ${socket.id} connected`);
        socket.on(AppSocketEvent.DISCONNECT, () => {
            console.log(`Socket ${socket.id} disconnected`);
        });
        socket.on(AppSocketEvent.MESSAGE, this.onMessage);
    }

    static onMessage(socket: SocketIO.Socket, message: string) {
        console.log(`Socket ${socket.id} sent message: ${message}`);
    }
}

class App {
    private app: express.Application;
    private server: http.Server;
    private io: SocketIO.Server;

    constructor(...controllers: Function[]) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new SocketIO.Server(this.server, {
            cors: {
                origin: '*',
            },
        });
        this.config();
        this.configSocket();
        controllers.forEach((controller) => {
            controller.constructor();
        });
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/', GlobalRouter.getGlobalRouter());
    }

    private configSocket(): void {
        this.io.on(AppSocketEvent.CONNECTION, AppSocketEventListener.initalize);
    }

    listen(): void {
        this.server.listen(AppConfig.PORT, () => {
            console.log(`Server started on port ${AppConfig.PORT}`);
        });
    }
}

export default new App(IndexController);