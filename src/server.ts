//import appConfig from './config/app';
import http from 'http';
import {Application} from 'express';
import express from 'express';
import {env} from '../src/env';
import ApplicationLoader from './app-loader';
import events from 'events';
import TaskService from './services/task-service';

module.exports = () => {
    const app: Application = express(); // Express App

    const eventEmitter = new events.EventEmitter();
    eventEmitter.on('update', TaskService.updateTask);

    // app settings
    const appLoader = new ApplicationLoader(app);
    appLoader
        .appSettings()
        .parsers()
        .compression()
        .applyHeaders()
        .session()
        .configureRoutes()
        .errorHandling();

    const server = http.createServer();
    server.on('request', app).on('listening', () => {
        console.log('Server is accepting express connections');
    });

    if (process.env.NODE_ENV !== 'test') {
        server.listen(env.app.port, () =>
            console.log(`${env.app.name} is listening on port ${env.app.port}`)
        );
    }

    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received.');
        console.log('Closing http server.');
        server.close(() => console.log('Http server closed.'));
    });

    return server;
};
