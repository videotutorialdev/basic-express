const fs = require('fs');
const httpRequestLogger = (options) => {
    return (req, res, next) => {
        const startTime = Date.now();
        res.on('finish', () => {
            const time = Date.now() - startTime;
            const loggerMessage = `[ ${req.method} ] ${new Date()} - ${req.originalUrl} ${res.statusCode} - ${time} ms\n`;
            console.log(loggerMessage);
            fs.appendFile(options.logFilePath, loggerMessage, () => {});
        });
        next();
    }
}

module.exports.httpRequestLogger = httpRequestLogger;