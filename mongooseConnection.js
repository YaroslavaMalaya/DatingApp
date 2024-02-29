const mongoose = require('mongoose');
const MNGcon = require('./configs/mongoConnection');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

mongoose.connect(MNGcon);
const db = mongoose.connection;

db.on('error', console.error.bind(console, ' MongoDB connection error:'));
const gfs = db.once('open', () => {
    const photosGrid = new mongoose.mongo.GridFSBucket(db.db, {
        bucketName: 'photos'
    });
    console.log('Connected to MongoDB');
    return photosGrid;
});

const storage = new GridFsStorage({
    db: db,
    file: (req, file) => {
        return {
            filename: `photo_${Date.now()}_${file.originalname}`,
            bucketName: 'photos',
            metadata: { userId: req.session.userId }
        };
    }
});

const upload = multer({ storage });

module.exports = { gfs, upload, db };
