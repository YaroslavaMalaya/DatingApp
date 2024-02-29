const User = require('../models/user');

exports.getMatchedUsers = async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.userId);
        if (!currentUser) {
            return res.status(404).send('User not found.');
        }

        const matchedUsersPromises = currentUser.matched.map(userId =>
            User.findById(userId)
        );
        const matchedUsers = await Promise.all(matchedUsersPromises);

        res.render('matched', { matchedUsers, username: currentUser.username });
    } catch (error) {
        console.error('Error retrieving matched users:', error);
        res.status(500).send('An error occurred while fetching matched users.');
    }
};
