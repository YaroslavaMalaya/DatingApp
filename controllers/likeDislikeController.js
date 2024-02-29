const User = require('../models/user');
const logger = require('../configs/logging');

exports.processLike = async (req, res) => {
    const userId = req.session.userId;
    const targetUserId = req.body.targetUserId;

    try {
        await User.findByIdAndUpdate(userId, {
            $addToSet: { dontdisplay: targetUserId, waiting: targetUserId }
        });

        const targetUser = await User.findById(targetUserId);

        if (targetUser.waiting.includes(userId)) {
            await User.findByIdAndUpdate(userId, { $push: { matched: targetUserId }, $pull: { waiting: targetUserId } });
            await User.findByIdAndUpdate(targetUserId, { $push: { matched: userId }, $pull: { waiting: userId } });
        }

        logger.info(`User ${userId} liked user ${targetUserId}`);
        res.send({ message: 'Like processed' });
    } catch (error) {
        logger.error('Error processing like:', { error: error.toString(), userId, targetUserId });
        res.status(500).send('An error occurred while processing the like.');
    }
};

exports.processDislike = async (req, res) => {
    const userId = req.session.userId;
    const targetUserId = req.body.targetUserId;

    try {
        await User.findByIdAndUpdate(userId, {
            $addToSet: { dontdisplay: targetUserId }
        });

        logger.info(`User ${userId} disliked user ${targetUserId}`);
        res.send({ message: 'Dislike processed' });
    } catch (error) {
        logger.error('Error processing dislike:', { error: error.toString(), userId, targetUserId });
        res.status(500).send('An error occurred while processing the dislike.');
    }
};