const User = require('../models/user');

exports.removeMatch = async (req, res) => {
    const { userIdToRemove } = req.body;
    const currentUserId = req.session.userId;

    try {
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { matched: userIdToRemove }
        });

        await User.findByIdAndUpdate(userIdToRemove, {
            $pull: { matched: currentUserId }
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error removing matched user:', error);
        res.status(500).json({ success: false, message: 'An error occurred while removing the match.' });
    }
};
