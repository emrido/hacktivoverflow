const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title required']
    },
    content: {
        type: String,
        required: [true, 'Question content required']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'answer'
    }],
    comments: [{
        content: {
            type: String,
            required: [true, 'Comment content required']
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }]
})

const Question = mongoose.model('question', questionSchema);

module.exports = Question;
