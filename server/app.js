const express = require('express');
var cors = require('cors');
const io = require('socket.io')(8001, {
    cors: {
        origin: SOCKET_ORIGIN_URL, // http://localhost:3000
    }
});
require("dotenv").config();

// Database connection
require('./db/connection');

// Imports Files 
const auth = require('./routes/auth');
const dashboard = require('./routes/dashboard');
const Users = require('./models/Users');

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

// Socket.io
let users = [];
io.on('connection', socket => {
    socket.on('addUser', userId => {
        const isUserExist = users.find(user => user.userId === userId);
        if (!isUserExist) {
            const user = { userId, socketId: socket.id };
            users.push(user);
            io.emit('getUsers', users);
        }
    });

    socket.on('sendMessage', async ({ conversationId, senderId, message, receiverId }) => {
        const receiver = users.find(user => user.userId === receiverId);
        const sender = users.find(user => user.userId === senderId);
        const user = await Users.findById(senderId);

        const payload = {
            conversationId,
            senderId,
            message,
            receiverId,
            user: { id: user._id, fullName: user.fullName, email: user.email }
        };

        if (receiver) {
            io.to(receiver.socketId).to(sender.socketId).emit('getMessage', payload);
        } else {
            io.to(sender.socketId).emit('getMessage', payload);
        }
    });

    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users);
    });
});

app.listen(port, () => {
    console.log('listening on port ' + port);
});