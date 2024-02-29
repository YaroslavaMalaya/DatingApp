const bcrypt = require('bcryptjs');
const User = require('../models/user');
const logger = require('../middleware/logging');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({
            $or: [{ username: username }, { email: username }]
        });

        if (!existingUser) {
            logger.warn(`Login attempt failed for non-existing user: ${username}`);
            return res.redirect(`/login?error=${encodeURIComponent('Invalid password or email/username. Please try again.')}`);
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            logger.warn(`Invalid password attempt for user: ${username}`);
            return res.redirect(`/login?error=${encodeURIComponent('Invalid password or email/username. Please try again.')}`);
        }

        req.session.userId = existingUser._id;
        logger.info(`User logged in: ${existingUser._id}`);
        res.redirect('/search');
    } catch (error) {
        logger.error('Logging in failed.', { error: error.toString(), username: username });
        res.redirect(`/login?error=${encodeURIComponent('Logging failed. Please try again.')}`);
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            logger.error('Error destroying session', { error: err.toString() });
        }
        logger.info('User session destroyed successfully.');
        res.redirect('/login');
    });
};
