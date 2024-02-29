const mongoose = require('mongoose');
const MNGcon = require('./configs/mongoConnection');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

mongoose.connect(MNGcon);
const db = mongoose.connection;
let gfs;

db.on('error', console.error.bind(console, ' MongoDB connection error:'));
db.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(db.db, {
        bucketName: 'photos'
    });
    console.log('Connected to MongoDB');
});

const storage = new GridFsStorage({
    db: db,
    file: (req, file) => {
        return new Promise((resolve) => {
            const fileInfo = {
                filename: `photo_${Date.now()}_${file.originalname}`,
                bucketName: 'photos',
                metadata: { userId: req.session.userId } // Add userId to metadata
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({ storage });

module.exports = { upload };
