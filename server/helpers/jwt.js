const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: function(_id, username) {
        return jwt.sign({
            _id, username
        }, process.env.JWT_SECRET);
    }
}