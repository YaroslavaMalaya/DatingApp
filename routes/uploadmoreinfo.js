const express = require('express');
const router = express.Router();
const User = require("../models/user");

router.post('/register/upload/moreinfo', async (req, res) => {
    const updateData = {};
    const fields = ['about', 'education', 'language', 'height', 'zodiac', 'smoking', 'drink', 'training', 'pet', 'socialMedia'];
    fields.forEach(field => {
        if (req.body[field] !== undefined) {
            if (field === 'socialMedia') {
                updateData['socialMedia'] = { Instagram: req.body[field] };
            } else {
                updateData[field] = req.body[field];
            }
        }
    });

    try {
        await User.findByIdAndUpdate(req.session.userId, { $set: updateData }, { new: true, upsert: true });

        res.redirect('/search');
    } catch (error) {
        console.error('Error updating user profile with more info:', error);
        res.redirect(`/register/upload/moreinfo?error=${encodeURIComponent('An error occurred while ' +
            'updating your profile with additional information. Please try again.')}`)
    }
});

module.exports = router;
