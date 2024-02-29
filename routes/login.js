const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login | Yama', query: req.query || {} });
});

module.exports = router;
