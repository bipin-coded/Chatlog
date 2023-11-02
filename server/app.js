const express = require('express');
var cors = require('cors');

// Database connection
require('./db/connection');

// Imports Files 
const auth = require('./routes/auth');
const dashboard = require('./routes/dashboard');


// App Use
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use('/api', auth);
app.use('/api', dashboard);

// App Listener
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('listening on port ' + port);
});