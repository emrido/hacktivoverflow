const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answer');

router.get('/', answerController.getAll);
router.get('/:id', answerController.getOne);
router.delete('/:id', answerController.deleteOne);
router.post('/:questionId', answerController.create);
router.put('/upvote/:id', answerController.upvote);
router.put('/downvote/:id', answerController.downvote);
router.put('/comment/:id', answerController.comment);

module.exports = router;
