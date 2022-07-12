const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/social_DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection