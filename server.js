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

app.listen(PORT, () => {
    console.log(`API server is listening on localhost:${PORT}...`);
});

// mongoDB and mongoose connections
const mongoose = require('mongoose');
mongoose.connect(
    'mongodb://localhost:27017/SocialNetworkAPI_an_db',
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
);
mongoose.set('debug', true);