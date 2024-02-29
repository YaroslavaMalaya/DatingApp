const express = require('express');
const session = require('express-session');
const SECRET_KEY = require('./secret-key');

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(session({
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: 'auto',
            httpOnly: true,
            maxAge: 10800000 // 3 hours
        }
    }));
    app.set('view engine', 'pug');
    app.set('views', './views');
    app.use(express.static('public'));
};
