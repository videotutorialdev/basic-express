const { HttpError } = require('../HttpError');
class TooManyRequestsError extends HttpError {
    constructor(message = 'Too Many Requests') {
        super(429, message);
    }
}

module.exports.TooManyRequestsError = TooManyRequestsError;