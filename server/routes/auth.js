const express = require('express');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            res.status(400).send('Please fill all required fields.');
        } else {
            const isAlreadyExist = await Users.findOne({ email });
            if (isAlreadyExist) {
                res.status(400).send('User already exists.');
            } else {
                const newUser = new Users({ fullName, email, password });
                newUser.save();
                res.status(200).send('User registered successfully.');
            }
        }

    } catch (error) {
        console.log(error, "Error");
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send('Please fill all required fields.');
        } else {
            const user = await Users.findOne({ email });
            if (!user) {
                res.status(400).send('User email or password is incorrect.');
            } else {
                const validPassword = bcrypt.compareSync(password, user.password);
                if (!validPassword) {
                    res.status(400).send('User email or password is incorrect');
                } else {
                    const payload = {
                        userId: user._id,
                        email: user.email
                    };

                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "THIS_IS_A_JWT_SECRET_KEY";

                    jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 84600 }, async (err, token) => {
                        await Users.updateOne({ _id: user._id }, {
                            $set: { token }
                        })
                        Users.save();
                        next();
                    });

                    res.status(200).json({ user: { fullName: user.fullName, email: user.email }, token: user.token });
                }
            }
        }
    } catch (error) {
        console.log(error, "Error");
    }
});


module.exports = router;