const express = require('express');
const router = express.Router();

router.get('/:username/chat/:targetUsername', (req, res) => {
    res.render('chat', {
        username: req.params.username,
        targetUsername: req.params.targetUsername
    });
});

module.exports = router;
