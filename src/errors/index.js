const { HttpError } = require('./HttpError');
// Client Error: 400^
const { BadRequestError } = require('./400/BadRequestError');
const { ForbiddenError } = require('./400/ForbiddenError');
const { MethodNotAllowedError } = require('./400/MethodNotAllowedError');
const { NotFoundError } = require('./400/NotFoundError');
const { RequestTimeoutError } = require('./400/RequestTimeoutError');
const { TooManyRequestsError } = require('./400/TooManyRequestsError');
const { UnauthorizedError } = require('./400/UnauthorizedError');
// Server Error: 500^
const { BadGatewayError } = require('./500/BadGatewayError');
const { InternalServerError } = require('./500/InternalServerError');

module.exports = {
    HttpError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    MethodNotAllowedError,
    TooManyRequestsError,
    RequestTimeoutError,
    BadGatewayError,
    InternalServerError
}