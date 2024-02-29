const bcrypt = require('bcryptjs');
const User = require('../models/user');
const logger = require('../configs/logging');
const gfs = require("../mongooseConnection").gfs;

exports.register = async (req, res) => {
    try {
        const { username, email, password, name, gender, orientation, age} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            logger.info(`Registration attempt with existing username/email: ${username}/${email}`);
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
        logger.info(`New user registered: ${username}`);
        res.redirect('/register/upload');
    } catch (error) {
        logger.error('Registering the user failed.', { error: error.toString(), username, email });
        res.redirect(`/register?error=${encodeURIComponent('Registration failed. Please try again.')}`);
    }
};

exports.updateProfile = async (req, res) => {
    const { country, city, interests } = req.body;
    let selectedInterests = interests.split(',').map(interest => interest.trim());
    // const photosCollection = await gfs.collection('photos.files').find({ 'metadata.userId': req.session.userId }).toArray();
    // const photosIdArray = photosCollection.map(file => file._id);

    try {
        await User.findByIdAndUpdate(req.session.userId, {
            $set: {
                country: country,
                city: city,
                interests: selectedInterests,
            },
            // $push: { photos: { $each: photosIdArray } }
        }, { new: true, upsert: true });

        logger.info(`User profile updated: ${req.session.userId}`);
        res.redirect('/register/upload/moreinfo');
    } catch (error) {
        logger.error('Error updating user profile:', { error: error.toString(), userId: req.session.userId });
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
        logger.info(`User profile additional info updated: ${req.session.userId}`);

        res.redirect('/search');
    } catch (error) {
        logger.error('Error updating user profile with more info:', { error: error.toString(), userId: req.session.userId });
        res.redirect(`/register/upload/moreinfo?error=${encodeURIComponent('An error occurred while ' +
            'updating your profile with additional information. Please try again.')}`)
    }
};