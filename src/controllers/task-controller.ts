import TaskService from '../services/task-service';

import {Request, Response} from 'express';

// simplified implementation of cache
const tasksCache = {};

class TaskController {
    static async updateTask(req: Request, res: Response) {
        //check if the request has been cached already.
        //this key would be sent as part of the request
        const trackingKey = req.headers['x-duplicate-tracking-key'] as string;

        if (tasksCache[trackingKey]) {
            res.status(304).send('Not Modified');
        }

        try {
            const taskToUpdate: any = req.body;

            const {data, errors} = await TaskService.updateTask(taskToUpdate);
            //store in cache:
            tasksCache[trackingKey] = data;

            const returnCode = errors.length > 0 ? 500 : 200;
            const response = {
                data,
                errors,
            };
            res.status(returnCode).json(response);
        } catch (error) {
            res.status(500).json('Unable to process request');
        }
    }
}

export default TaskController;
