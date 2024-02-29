const User = require('../models/user');
const logger = require('../configs/logging');

exports.getMatchedUsers = async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.userId);
        if (!currentUser) {
            logger.warn(`Matched users retrieval failed: User not found with ID ${req.session.userId}`);
            return res.status(404).send('User not found.');
        }

        const matchedUsersPromises = currentUser.matched.map(userId =>
            User.findById(userId)
        );
        const matchedUsers = await Promise.all(matchedUsersPromises);

        res.render('matched', { matchedUsers, username: currentUser.username });
    } catch (error) {
        logger.error('Error retrieving matched users', { error: error.toString(), userId: req.session.userId });
        res.status(500).send('An error occurred while fetching matched users.');
    }
};
