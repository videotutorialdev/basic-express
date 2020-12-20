const express = require('express');

const { v1Router } = require('./apis/v1');

const { NotFoundError } = require('./errors');
const { httpRequestLogger } = require('./middleware');

const createApp = async () => {
    const app = express();

    app.use(express.json());
    app.use(httpRequestLogger);
    
    app.get('/' ,(req, res, next) => {
        res.status(200).send(`Express Server Tutorial`);
    });
    
    app.use('/api/v1', v1Router);
    
    app.use((req, res, next) => { throw new NotFoundError() });
    
    app.use((error, req, res, next) => {
        res.status(error.statusCode).send(error);
    });

    return app;
};

module.exports.createApp = createApp;