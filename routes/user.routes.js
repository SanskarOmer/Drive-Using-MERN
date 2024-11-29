const express = require('express');
const router = express.Router();
const { body,validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', 

    body('email').trim().isEmail().isLength({ min:10}),
    body('password').isLength({ min: 8 }),
    body('username').trim().isLength({ min:5}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(), 
                message: 'Invalid Data',
            });
        }
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
             username,
             email,
             password : hashedPassword,
    });

    res.json(newUser);
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',

    body('password').trim().isLength({ min: 8 }),
    body('username').trim().isLength({ min:5}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(), 
                message: 'Invalid Data',
            });
        }

        const { username, password } = req.body;

        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid Credentials',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid Credentials',
            });
        }

        const token = jwt.sign({ 
            id: user._id,
            username: user.username,
            email: user.email,
         }, process.env.JWT_SECRET,

        );

        res.json({ token });

});






module.exports = router;