const User = require('../models/user');
const logger = require('../configs/logging');

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

        logger.info(`User ${currentUserId} removed match with user ${userIdToRemove}`);
        res.json({ success: true });
    } catch (error) {
        logger.error('Error removing matched user:', { error: error.toString(), currentUserId, userIdToRemove });
        res.status(500).json({ success: false, message: 'An error occurred while removing the match.' });
    }
};
