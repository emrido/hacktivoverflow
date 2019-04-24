const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question');
const { authentication } = require('../middlewares/authentication');

router.get('/', questionController.getAll);
router.use(authentication);
router.post('/', questionController.create);
router.get('/:id', questionController.questionDetail);
router.delete('/:id', questionController.deleteOne);
router.put('/comment/:id', questionController.comment);
router.put('/upvote/:id', questionController.upvote);
router.put('/downvote/:id', questionController.downvote);

module.exports = router;
