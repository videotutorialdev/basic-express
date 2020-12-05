require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

const { v1Router } = require('./apis/v1');
const { NotFoundError } = require('./errors');
const { httpRequestLogger } = require('./middleware');
const APP_PORT = process.env.PORT || 3000;

const IN_PROD = process.env === 'production';

const app = express();

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const dateNumber = date.getDate();
const logFileName = [year, month, dateNumber, 'logs.log'].join('-');
const logFilePath = path.join(__dirname, 'logs', logFileName)
const isFileExists = fs.existsSync(path.join(__dirname, 'logs', logFileName));
if (!isFileExists) fs.createWriteStream(logFilePath);

app.use(express.json());
app.use(httpRequestLogger({ logFilePath }));

app.get('/' ,(req, res, next) => {
    res.status(200).send(`Express Server Tutorial`);
});

app.use('/api/v1', v1Router);

app.use((req, res, next) => { throw new NotFoundError() });

app.use((error, req, res, next) => {
    res.status(error.statusCode).send(error);
})

app.listen(APP_PORT, console.log(`Server is up on port ${APP_PORT}`));