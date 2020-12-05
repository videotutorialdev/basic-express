const { firstMiddleware } = require('./firstMiddleware');
const { secondMiddleware } = require('./secondMiddleware');
const { httpRequestLogger } = require('./httpRequestLogger');

module.exports = { firstMiddleware, secondMiddleware, httpRequestLogger };