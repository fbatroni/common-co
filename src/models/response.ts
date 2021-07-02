class ApiResponse {
    data;
    errors;

    constructor(context) {
        const {data, errors} = context;
        this.data = data;
        this.errors = errors;
    }
}

export default ApiResponse;
