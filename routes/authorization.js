const express = require('express');
const router = express.Router();
const userController = require('../controllers/userCreateController');
const interestsArray = require('../public/scripts/allinterests');

router.post('/register', userController.register);
router.post('/register/upload', userController.updateProfile);
router.post('/register/upload/moreinfo', userController.updateMoreInfo);

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register | Yama', query: req.query });
});
router.get('/register/upload', (req, res) => {
    res.render('register2', { title: 'Register - Upload Photos | Yama', interests: interestsArray, userId: req.query.userId, query: req.query});
});
router.get('/register/upload/moreinfo', (req, res) => {
    res.render('register3', { title: 'Register - More Info | Yama', query: req.query, userId: req.query.userId});
});

module.exports = router;
