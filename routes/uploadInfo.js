const express = require('express');
const router = express.Router();
const User = require("../models/user");
const { upload } = require('../mongooseConnection');

// const uploadMiddleware = upload.array('userPhoto');
router.post('/register/upload', async (req, res) => {
    const { country, city, interests } = req.body;
    let selectedInterests = interests;
    selectedInterests = selectedInterests.split(',').map(interest => interest.trim());
    try {
        await User.findByIdAndUpdate(req.session.userId, {
            $set: {
                country: country,
                city: city,
                interests: selectedInterests,
            }
        }, { new: true, upsert: true  });

        res.redirect('/register/upload/moreinfo');
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.redirect(`/register/upload/?error=${encodeURIComponent('An error occurred while ' +
            'updating your profile with new information. Please try again.')}`)
    }
});

module.exports = router;
