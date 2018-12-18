const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// get
router.get('/', function (req, res, next) {
    User.find(function (err, post) {
        if (err) return next(err);
        res.json(post);
        console.log(res.json)
    });
});

// registration
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({
                success: false, msg: 'Failed to register user'
            });
        } else {
            res.json({
                success: true, msg: 'User Register Success'
            })
        }
    })
});

// auth
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({
                success: false, msg: 'User not found'
            })
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            console.log(isMatch)
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                })
                res.json({
                    success: true, 
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({ success: false, msg: 'Wrong Password', user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,                    
                        password: user.password
                    }  
                })
            }
        })
    })
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('Profile');
});

// Validate
router.get('/validate', (req, res, next) => {
    res.send('Validate');
})

// post
router.post('/', function (req, res, next) {
    User.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// delete 
router.delete('/:id', function (req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if(err) return next(err);
        res.json(post);
    });
});

module.exports = router;