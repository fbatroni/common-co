import {Application} from 'express';
import {env} from './env';

const defaultRoutes = require('./routes').default();
const session = require('express-session');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crossDomain = require('cors');
const errorHandler = require('errorhandler');

class AppLoader {
    app: Application;
    constructor(app: Application) {
        this.app = app;
    }

    appSettings() {
        // app settings
        this.app.set('env', env.node);
        this.app.set('port', env.app.port || 8181);
        this.app.enable('trust proxy');
        this.app.locals.pretty = true; //Prettify HTML
        this.app.set('showStackError', env.isDevelopment);

        return this;
    }

    parsers() {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw({limit: '100mb'}));
        this.app.use(cookieParser(env.app.appSecret));

        return this;
    }

    compression() {
        this.app.use(compression());

        return this;
    }

    applyHeaders() {
        this.app.use(crossDomain());

        return this;
    }

    session() {
        this.app.use(
            session({
                secret: env.app.appSecret,
                saveUninitialized: true, // save new sessions
                resave: true, // do not automatically write to the session store
                name: '_mover-api-service',
                cookie: {
                    secure: true,
                    maxAge: env.app.cookie.maxAge,
                },
            })
        );

        return this;
    }

    errorHandling() {
        this.app.use(errorHandler());

        return this;
    }

    configureRoutes() {
        this.app.use(env.app.routePrefix, defaultRoutes);

        return this;
    }
}

export default AppLoader;
