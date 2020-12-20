const fs = require('fs');
const path = require('path');

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const dateNumber = date.getDate();
const logFileName = [year, month, dateNumber, 'logs.log'].join('-');
const logFilePath = path.join(path.resolve(), 'src/logs', logFileName)
const isFileExists = fs.existsSync(logFilePath);
if (!isFileExists) fs.createWriteStream(logFilePath);

const httpRequestLogger = (req, res, next) => {
    const startTime = Date.now();
    res.on('finish', () => {
        const time = Date.now() - startTime;
        const loggerMessage = `[ ${req.method} ] ${new Date()} - ${req.originalUrl} ${res.statusCode} - ${time} ms\n`;
        console.log(loggerMessage);
        fs.appendFile(logFilePath, loggerMessage, () => {});
    });
    next();
}

module.exports.httpRequestLogger = httpRequestLogger;