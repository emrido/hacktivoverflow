const express = require('express');
const router  = express.Router();
const userRoute = require('./user');
const questionRoute = require('./question');
const answerRoute = require('./answer');
const { authentication } = require('../middlewares/authentication');

router.use('/users', userRoute);
router.use('/questions', questionRoute);
router.use(authentication);
router.use('/answers', answerRoute)

module.exports = router;