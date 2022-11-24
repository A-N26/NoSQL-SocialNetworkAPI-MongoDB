const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/SocialNetworkAPI_an_db',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

mongoose.set('debug', true);

module.exports = mongoose.connection;
