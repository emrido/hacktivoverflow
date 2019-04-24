const Answer = require('../models/answer');
const Question = require('../models/question');
const { ObjectId } = require('mongoose').Types;

class AnswerController {
    static create(req, res) {
        Answer
            .create({
                content: req.body.content,
                owner: req.authenticatedUser._id
            })
            .then(newAnswer => {
                return Question.updateOne({
                    _id: req.params.questionId
                }, {
                        $push: {
                            answers: newAnswer._id
                        }
                    })
            })
            .then(result => {
                res.status(200).json(result)
                // res.status(201).json(newAnswer)
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
        Answer
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
                            message: 'Answer not found'
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
        Answer
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
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json(result)
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Answer not found'
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
        Answer
            .find({
                owner: req.authenticatedUser._id
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

    static getOne(req, res) {
        Answer
            .findOne({
                _id: req.params.id
            })
            .populate('upvotes')
            .populate('downvotes')
            .populate('comments.userId')
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
        Answer
            .updateOne({
                _id: req.params.id
            }, {
                    $push: {
                        comments: obj
                    }
                })
            .then(result => {
                if (result.n && result.ok) {
                    res.status(200).json(result)
                } else {
                    res.status(404).json({
                        message: 'Answer not found'
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
        Answer
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
                            message: 'Answer not found'
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

module.exports = AnswerController;
