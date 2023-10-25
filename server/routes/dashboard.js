const express = require('express');
const Conversations = require('../models/Conversations');
const Users = require('../models/Users');
const Messages = require('../models/Messages');

const router = express.Router();

// Add Conversation
router.post('/conversation', async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const newConversation = new Conversations({ members: [senderId, receiverId] });
        await newConversation.save();
        res.status(200).send('Conversation saved successfully');
    } catch (error) {
        console.error(error, "Error");
    }
});

// Get conversation by user ID
router.get('/conversation/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversation.find({ members: { $in: [userId] } });
        const conversationUserData = Promise.all(conversations.map(async (conversation) => {
            const reciverId = conversation.members.find(member => member !== userId);
            const user = await Users.findById(reciverId);
            return { user: { email: user.email, fullName: user.fullName }, conversationId: conversation._id }
        }));
        res.status(200).json(await conversationUserData);
    } catch (error) {
        console.error(error, "Error");
    }
});

// Send message
router.post('/message', async (req, res) => {
    try {
        const { conversationId, senderId, message, receiverId = '' } = req.body;
        if (!senderId || !message) return res.status(404).send("Please fill all required fields.");
        if (!conversationId && receiverId) {
            const newConversation = new Conversations({ members: [senderId, receiverId] });
            await newConversation.save();
            const newMessage = new Conversations({ conversationId, senderId, message });
            await newMessage.save();
            return res.status(200).send('Message sent successfully.');
        } else {
            return res.status(400).send("Please fill all required fields.");
        }
        const newMessage = new Messages({ conversationId, senderId, message });
        await newMessage.save();
        res.status(200).send('Message sebt successfully.');
    } catch (error) {
        console.error(error, "Error");
    }
});

// Get all messages by conversation ID
router.get('/message/:conversationId', async (req, res) => {
    try {
        const conversationId = req.params.conversationId;
        if (!conversationId) return res.status(200).json([]);
        const messages = await Messages.find({ conversationId });
        const messageUserData = Promise.all(messages.map(async (message) => {
            const user = await Users.findById(message.senderId);
            return { user: { email: user.email, fullName: user.fullName }, message: message.message };
        }));
        res.status(200).json(await messageUserData);
    } catch (error) {
        console.error(error, "Error");
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await Users.find();
        const usersData = Promise.all(users.map(async (user) => {
            return { user: { email: user.email, fullName: user.fullName }, userId: user._id };
        }));
        res.status(200).json(await usersData);
    } catch (error) {
        console.error(error, "Error");
    }
});

module.exports = router;