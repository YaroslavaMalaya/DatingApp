const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({
            $or: [{ username: username }, { email: username }]
        });

        if (!existingUser) {
            return res.redirect(`/login?error=${encodeURIComponent('Invalid password or email/username. Please try again.')}`);
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.redirect(`/login?error=${encodeURIComponent('Invalid password or email/username. Please try again.')}`);
        }

        req.session.userId = existingUser._id;
        res.redirect('/search');
    } catch (error) {
        console.error('Logging in failed.', error);
        res.redirect(`/login?error=${encodeURIComponent('Logging failed. Please try again.')}`);
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session', err);
        }
        res.redirect('/login');
    });
};
