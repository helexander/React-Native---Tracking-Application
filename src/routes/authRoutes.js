const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    // Error handling
    try {
        const user = new User({ email, password });

        // This is an asynchronous action/operation
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token: token });
    } catch (err) {
        // Indicates that the user has sent invalid data to create a new user 
        return res.status(422).send(err.message);
    }
});

// To manipulate user data in the User database

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password' });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
});

module.exports = router;