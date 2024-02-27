const express = require('express');
const router = express.Router();
const User = require("../models/user");
router.post('/register/upload/moreinfo', async (req, res) => {
    const {about, education, language, height, zodiac, smoking, drink, training, pet, socialMedia } = req.body;
    try {
        await User.findByIdAndUpdate(req.session.userId, {
            $set: {
                about: about,
                education: education,
                language: language,
                height: height,
                zodiac: zodiac,
                smokingHabits: smoking,
                drinkingHabits: drink,
                trainingFrequency: training,
                petPreference: pet,
                socialMediaLinks: { Instagram: socialMedia }
            }
        }, { new: true, upsert: true  });

        res.redirect('/search');
    } catch (error) {
        console.error('Error updating user profile with more info:', error);
        res.redirect(`/register/upload/moreinfo?error=${encodeURIComponent('An error occurred while ' +
            'updating your profile with additional information. Please try again.')}`)
    }
});

module.exports = router;
