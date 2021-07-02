// Simple health check(ping).
import {Request, Response} from 'express';

class StatusController {
    static async pingResponse(_req: Request, res: Response) {
        const obj = {
            status: 'ok',
            appname: process.env.APP_NAME,
        };

        res.status(200).json(obj);
    }
}

export default StatusController;
