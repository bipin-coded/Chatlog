const express = require('express');

// Database connection
require('./db/connection');

// Imports Files 
const auth = require('./routes/auth');


// App Use
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use('/auth', auth);

// App Listener
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('listening on port ' + port);
});