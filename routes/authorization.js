const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, name, gender, orientation, age} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.redirect('/login');
        }

        const user = new User({
            username: username,
            email: email,
            password: hashedPassword,
            name: name,
            gender: gender,
            orientation: orientation,
            age: age,
            waiting: [],
            matched: [],
            dontdisplay: []
        });

        user.dontdisplay.push(user._id);
        await user.save();
        req.session.userId = user._id;
        res.redirect('/register/upload');
    } catch (error) {
        console.error('Registering the user failed.', error);
        res.redirect(`/register?error=${encodeURIComponent('Registration failed. Please try again.')}`);
    }
});

module.exports = router;
