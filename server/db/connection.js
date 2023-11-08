const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/chatapp';

mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to DB')).catch(err => console.log('Error', err));