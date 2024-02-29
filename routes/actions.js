const express = require('express');
const router = express.Router();
const likedisController = require('../controllers/likeDislikeController');
const matchController = require('../controllers/matchController');
const chatController = require('../controllers/chatsController');

router.post('/like', likedisController.processLike);
router.post('/dislike', likedisController.processDislike);
router.post('/remove-match', matchController.removeMatch);
router.get('/:username/chats', chatController.getMatchedUsers);

module.exports = router;
