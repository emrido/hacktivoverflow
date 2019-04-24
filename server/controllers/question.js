const Question = require('../models/question');
const { ObjectId } = require('mongoose').Types;

class QuestionContoller {
    static create(req, res) {
        const { title, content } = req.body;
        Question
            .create({
                title,
                content,
                owner: req.authenticatedUser._id
            })
            .then(newQuestion => {
                res.status(201).json(newQuestion)
            })
            .catch(err => {
                if (RegExp('validation').test(err.message)) {
                    res
                        .status(403)
                        .json({
                            message: err.message
                        })
                } else {
                    res
                        .status(500)
                        .json({
                            message: err.message
                        });
                }
            })
    }

    static upvote(req, res) {
        Question
            .updateOne({
                _id: req.params.id
            }, {
                    $addToSet: {
                        upvotes: ObjectId(req.authenticatedUser._id)
                    },
                    $pull: {
                        downvotes: ObjectId(req.authenticatedUser._id)
                    }
                })
            .then(result => {
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json(result)
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Question not found'
                        })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    });
            })
    }

    static downvote(req, res) {
        Question
            .updateOne({
                _id: req.params.id
            },
                {
                    $addToSet: {
                        downvotes: ObjectId(req.authenticatedUser._id)
                    },
                    $pull: {
                        upvotes: ObjectId(req.authenticatedUser._id)
                    }
                }
            )
            .then(result => {
                console.log(result)
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json(result)
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Question not found'
                        })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    });
            })
    }

    static getAll(req, res) {
        Question
            .find()
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    });
            })
    }

    static questionDetail(req, res) {
        Question
            .findOne({
                _id: req.params.id
            })
            .populate('owner')
            .populate('upvotes')
            .populate('downvotes')
            .populate('comments.userId')
            .populate({
                path: 'answers',
                populate: {
                    path: 'upvotes'
                }
            })
            .populate({
                path: 'answers',
                populate: {
                    path: 'downvotes'
                }
            })
            .populate({
                path: 'answers',
                populate: {
                    path: 'comments.userId'
                }
            })
            .then(questions => {
                res
                    .status(200)
                    .json(questions)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    });
            })
    }

    static comment(req, res) {
        const obj = {
            content: req.body.content,
            userId: ObjectId(req.authenticatedUser._id)
        }
        Question
            .updateOne({
                _id: req.params.id
            }, {
                $push: {
                    comments: obj
                }
            })
            .then(result => {
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json(result)
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Question not found'
                        })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    });
            })
    }

    static deleteOne(req, res) {
        Question
            .deleteOne({
                _id: req.params.id
            })
            .then(result => {
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json(result)
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Question not found'
                        })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    });
            })
    }
}

module.exports = QuestionContoller;
