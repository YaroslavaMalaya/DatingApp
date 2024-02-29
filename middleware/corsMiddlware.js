const cors = require('cors');

const allowedOrigins = [
    "http://127.0.0.1:8000",
    "http://127.0.0.1:8888",
    "http://localhost:8000",
    "http://localhost:8888"
];

const corsCheck = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Your origin ' + origin + ' is not allowed by CORS'));
        }
    }
};

module.exports = cors(corsCheck);
