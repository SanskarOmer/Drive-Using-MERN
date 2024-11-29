const express = require('express');
const router = express.Router();
const { body,validationResult } = require('express-validator');



router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', 

    body('email').trim().isEmail().isLength({ min:10}),
    body('password').isLength({ min: 8 }),
    body('username').trim().isLength({ min:5}),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(), 
                message: 'Invalid Data',
            });
        }
    console.log(req.body);
    res.send(errors);
});






module.exports = router;