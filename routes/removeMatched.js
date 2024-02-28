const express = require('express');
const router = express.Router();
const User = require('../models/user');
router.post('/remove-match', async (req, res) => {
    const { userIdToRemove } = req.body;
    const currentUserId = req.session.userId;

    try {
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { matched: userIdToRemove }
        });

        await User.findByIdAndUpdate(userIdToRemove, {
            $pull: { matched: currentUserId }
        });

        console.log(User.findById(currentUserId).mathched);
        console.log(User.findById(userIdToRemove).mathched);

        res.json({ success: true });
    } catch (error) {
        console.error('Error removing matched user:', error);
        res.status(500).json({ success: false, message: 'An error occurred while removing the match.' });
    }
});

module.exports = router;