const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/like', async (req, res) => {
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

        res.send({ message: 'Like processed' });
    } catch (error) {
        console.error('Error processing like:', error);
        res.status(500).send('An error occurred while processing the like.');
    }
});

router.post('/dislike', async (req, res) => {
    const userId = req.session.userId;
    const targetUserId = req.body.targetUserId;

    try {
        await User.findByIdAndUpdate(userId, {
            $addToSet: { dontdisplay: targetUserId }
        });

        res.send({ message: 'Dislike processed' });
    } catch (error) {
        console.error('Error processing dislike:', error);
        res.status(500).send('An error occurred while processing the dislike.');
    }
});

module.exports = router;
