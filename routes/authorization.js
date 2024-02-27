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
            age: age
        });

        await user.save();
        req.session.userId = user._id;
        // console.log(req.session.userId);
        res.redirect('/register/upload');
    } catch (error) {
        console.error('Registering the user failed.', error);
        res.redirect(`/register?error=${encodeURIComponent('Registration failed. Please try again.')}`);
    }
});

router.post('/login', (req, res) => {
    try {
        // const { username, password} = req.body;
        // const existingUser = await User.findOne({ $or: [{ username }, { password }] });
        // req.session.userId = existingUser._id;
        res.redirect('/search');
    } catch (error) {
        console.error('Logging failed.', error);
        res.redirect(`/login?error=${encodeURIComponent('Logging failed. Please try again.')}`);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session', err);
        }
        res.redirect('/login');
    });
});

module.exports = router;
