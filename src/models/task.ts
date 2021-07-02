import DataModel from './data-model';

class Task extends DataModel {
    id;
    name;
    description;
    due_date;
    duration;
    completed;
    completed_on;
    notes;

    constructor(data) {
        super();

        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.duration = data.duration;
        this.completed = data.completed;
        this.notes = data.notes;
        this.due_date = this.formatDate(data?.due_date, 'YYYY-MM-DD');
        this.completed_on = this.formatDate(
            data?.completed_on,
            'YYYY-MM-DD HH:MM:SS'
        );
    }
}

export default Task;
