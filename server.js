const express = require('express');

const routes = require('./routes');

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded(
    {
        extended: true
    }
));
app.use(routes);

const db = require('./config/connection');
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is listening on localhost:${PORT}...`);
    });
});
