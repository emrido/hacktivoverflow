const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const answerSchema = new Schema({
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

const Answer = mongoose.model('answer', answerSchema);

module.exports = Answer;
