const User = require('../models/user');
const logger = require('../middleware/logging');

exports.searchUsers = async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.userId);
        const allUsers = await User.find();
        const filteredUsers = allUsers.filter(user => !currentUser.dontdisplay.includes(user._id.toString()));

        logger.info(`User ${req.session.userId} searched for users.`);
        res.render('search', {
            users: filteredUsers,
            currentUserId: req.session.userId,
            username: currentUser.username
        });
    } catch (error) {
        logger.error('Error retrieving users:', { error: error.toString(), userId: req.session.userId });
        res.status(500).send('An error occurred while fetching users.');
    }
};
