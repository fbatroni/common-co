import * as pkg from '../package.json';

const getEnv = (key: string, optional = false): string => {
    if (!optional && typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return process.env[key] as string;
};

const normalizePort = (port: string): number | string | boolean => {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) {
        // named pipe
        return port;
    }
    if (parsedPort >= 0) {
        // port number
        return parsedPort;
    }
    return false;
};

const toBool = (value: string): boolean => value === 'true';

/**
 * Environment variables
 */
export const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: getEnv('APP_NAME'),
        appSecret: getEnv('APP_SECRET'),
        version: pkg.version,
        description: pkg.description,
        host: getEnv('APP_HOST'),
        schema: getEnv('APP_SCHEMA'),
        routePrefix: getEnv('APP_ROUTE_PREFIX'),
        port: normalizePort(process.env.PORT || getEnv('APP_PORT')),
        cookie: {
            maxAge: process.env.SESSION_CACHE_EXPIRY_MILLISECONDS || 604800000, // 1 week
        },
    },
    log: {
        level: getEnv('LOG_LEVEL'),
        json: toBool(getEnv('LOG_JSON', true)),
        output: getEnv('LOG_OUTPUT'),
    },
};
