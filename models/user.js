const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    orientation: { type: String, required: true },
    age: { type: Number, min: 18, required: true },
    photos: [{ type: ObjectId }],
    country: { type: String },
    city: { type: String },
    interests: [String],
    about: { type: String },
    education: { type: String },
    languages: { type: String },
    height: { type: String },
    zodiacSign: { type: String },
    smoker: { type: String },
    drinker: { type: String },
    sports: { type: String },
    pets: { type: String },
    socialMedia: { Instagram: { type: String, default: '' }},
    waiting: [{ type: ObjectId }],
    matched: [{ type: ObjectId }],
    dontdisplay: [{ type: ObjectId }],
});

module.exports = mongoose.model('User', userSchema);
