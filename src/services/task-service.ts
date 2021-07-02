import {every} from 'lodash';
import Task from '../models/task';
import defineAbilityFor from '../lib/abac';

// user permissions
const user1 = {
    id: 1,
    accessSpecs: [
        {
            action: 'update',
            model: 'Task',
            fieldList: ['status'],
            //TODO: implement in update checks
            valuesMap: {
                field: 'status',
                allowed: ['in-progress'],
            },
        }
    ],
};

// example of a user with a different set of access credentials
// const user2 = {
//     id: 1,
//     accessSpecs: {
//         action: 'update',
//         model: 'Task',
//         fieldList: ['status'],
//         valuesMap: {
//             field: 'status',
//             allowed: ['in-progress', 'completed'],
//         },
//     },
// };

class TaskService {
    static async updateTask(taskToUpdate) {

        // perform RBAC check
        const effectivePermissions = Object.keys(taskToUpdate).map(
            (field: any) => {
                return defineAbilityFor(user1).can('update', 'Task', field);
            }
        );

        const errors = [];
        let data = {};
        try {
            if (every(effectivePermissions)) {
                data = new Task(taskToUpdate);
            } else {
                errors.push(new Error('Invalid Permissions'));
            }
        } catch (error) {
            errors.push(error);
        }
        const response = {
            data,
            errors,
        };

        return response;
    }
}

export default TaskService;
