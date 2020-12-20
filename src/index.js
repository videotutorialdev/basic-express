require('dotenv').config();
const { createApp } = require('./app');
(async() => {
    try {
        const APP_PORT = process.env.PORT || 3000;
        const app = await createApp();
        app.listen(APP_PORT, console.log(`[ APP ]: Server Is Up On Port ${APP_PORT}`));
    } catch(ex) {
        console.log(`[ APP ]: Unexpectedly error occurred!`);
        console.log(ex.message);
    }
})();