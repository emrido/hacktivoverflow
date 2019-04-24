const User              = require('../models/user');
const { decrypt }       = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
    static create(req, res) {
        User
            .create(req.body)
            .then(newUser => {
                res.status(201).json(newUser);
            })
            .catch(err => {
                if (err.message === 'Email has been taken') {
                    res
                        .status(409)
                        .json({
                            message: err.message
                        })
                } else if (RegExp('validation').test(err.message)) {
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

    static login(req, res) {
        User
            .findOne({
                email: req.body.email
            })
            .then(foundUser => {
                if (!foundUser) {
                    res
                        .status(404)
                        .json({
                            message: 'User not found'
                        })
                } else {
                    if (decrypt(req.body.password, foundUser.password)) {
                        const access_token = generateToken(foundUser._id, foundUser.name);

                        res
                            .status(200)
                            .json({ access_token });
                    } else {
                        res
                            .status(401)
                            .json({
                                message: 'Wrong password'
                            });
                    }
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        message: err.message
                    })
            })
    }
}

module.exports = UserController;
