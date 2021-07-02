import {Router} from 'express';
import {StatusController, TaskController} from '../controllers';

const routes = () => {
    const apiRouter = Router();
    apiRouter.route('/health').get(StatusController.pingResponse);
    apiRouter.route('/tasks').post(TaskController.updateTask);
    return apiRouter;
};

export default routes;
