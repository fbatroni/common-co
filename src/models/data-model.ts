import moment from 'moment';

class DataModel {
    constructor() {}

    formatDate(dateString: string, format: string) {
        return dateString
            ? moment(dateString).utc().format(format)
            : moment(new Date().getTime());
    }
}

export default DataModel;
