const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const { encrypt } = require('../helpers/bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function (email) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
                    email
                );
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],        
    }
})


userSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        next(new Error("Email has been taken"));
    } else {
        next();
    }
});

userSchema.pre("save", function (next) {
    this.password = encrypt(this.password);
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
