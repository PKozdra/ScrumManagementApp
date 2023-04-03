const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');
const jwt = require('jsonwebtoken');

exports.getUserByToken = (req, res) => {
    token = req.headers.authorization;
    console.log('token', token);
    // if there is bearer in the token, remove it
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Invalid Token'
            });
        } else {
            console.log('decoded', decoded)
            User.findById(decoded._id, (err, user) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Invalid Token'
                    });
                } else {
                    res.json(user);
                }
            });
            }
        });
      };

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err || !users) {
            return res.status(400).json({
                error: 'No users found'
            });
        }
        res.json(users);
    });
};


exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.update = (req, res) => {
    console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name, password, id, role } = req.body;

    User.findOne({ _id: req.profile._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.name = name;
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            } else {
                user.password = password;
            }
        }

        if (id) {
            user.id = id;
        }

        if (role) {
            user.role = role;
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};