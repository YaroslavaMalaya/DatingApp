const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { mongoose, upload } = require('./mongooseConnection');
const PORT = require('./configs/port');
const userController = require('./controllers/userController');
const SECRET_KEY = require('./configs/secret-key');
const authRoutes = require('./routes/authorization');
const uploadRoutes = require('./routes/uploadInfo');
const uploadMoreRoutes = require('./routes/uploadmoreinfo');
const interestsArray = require('./public/scripts/allinterests');
const app = express();

app.use(express.urlencoded({ extended: true }));
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
app.use(express.json());
app.use(authRoutes);
app.use(uploadRoutes);
app.use(uploadMoreRoutes);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.get(['/', '/home'], (req, res) => {
    res.render('home', { title: 'Home Page' });
});
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register | Yama', query: req.query });
});
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login | Yama', query: req.query || {} });
});

app.get('/register/upload', (req, res) => {
    res.render('register2', { title: 'Register - Upload Photos | Yama', interests: interestsArray, userId: req.query.userId, query: req.query});
});

app.get('/register/upload/moreinfo', (req, res) => {
    res.render('register3', { title: 'Register - More Info | Yama', query: req.query, userId: req.query.userId});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
