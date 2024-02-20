class ExpressError extends Error {
    constructor(error, message) {
        super();
        this.status = status;
        this.message = message;
    }
}
module.exports = ExpressError;