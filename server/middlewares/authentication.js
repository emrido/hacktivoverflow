const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
    authentication: function (req, res, next) {
        try {
            const token = req.headers.access_token
            if (token) {
                const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
                req.authenticatedUser = decoded

                if (process.env.NODE_ENV === 'test') {
                    next();
                } else {
                    User
                        .findById(req.authenticatedUser._id)
                        .then(user => {
                            if (user) {
                                next();
                            } else {
                                res.status(401).json({
                                    message: 'Token is not valid'
                                })
                            }
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: err.message
                            })
                        })
                }
            } else {
                res.status(401).json({
                    message: 'Login first'
                })
            }
        } catch (err) {
            res.status(401).json({
                message: 'Login first'
            })
        }
    }
}