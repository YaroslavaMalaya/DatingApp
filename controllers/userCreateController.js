const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { upload } = require('../mongooseConnection');

// const photosarray = upload.array('userPhoto');
exports.register = async (req, res) => {
    try {
        const { username, email, password, name, gender, orientation, age} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.redirect('/login');
        }

        const user = new User({
            username,
            email,
            password: hashedPassword,
            name,
            gender,
            orientation,
            age,
            waiting: [],
            matched: [],
            dontdisplay: []
        });

        user.dontdisplay.push(user._id);
        await user.save();
        req.session.userId = user._id;
        res.redirect('/register/upload');
    } catch (error) {
        console.error('Registering the user failed.', error);
        res.redirect(`/register?error=${encodeURIComponent('Registration failed. Please try again.')}`);
    }
};

exports.updateProfile = async (req, res) => {
    const { country, city, interests } = req.body;
    let selectedInterests = interests.split(',').map(interest => interest.trim());

    try {
        await User.findByIdAndUpdate(req.session.userId, {
            $set: {
                country: country,
                city: city,
                interests: selectedInterests,
            }
        }, { new: true, upsert: true });

        res.redirect('/register/upload/moreinfo');
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.redirect(`/register/upload/?error=${encodeURIComponent('An error occurred while ' +
            'updating your profile with new information. Please try again.')}`);
    }
};

exports.updateMoreInfo = async (req, res) => {
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
};