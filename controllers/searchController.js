const User = require('../models/user');

exports.searchUsers = async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.userId);
        const allUsers = await User.find();
        const filteredUsers = allUsers.filter(user => !currentUser.dontdisplay.includes(user._id.toString()));

        res.render('search', {
            users: filteredUsers,
            currentUserId: req.session.userId,
            username: currentUser.username
        });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('An error occurred while fetching users.');
    }
};
