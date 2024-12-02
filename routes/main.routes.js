const express = require('express');
const router = express.Router();

const upload = require('../config/multer.config');
const fileModel = require('../models/file.model');

const authTokenMiddleware = require('../middleware/auth');
const file = require('../models/file.model');

router.get('/home', authTokenMiddleware, (req, res) => {

    const userFiles = await fileModel.find({
        user: req.user.userId
    }) I


    res.render('home',{
        files: userFiles,
    });


});

router.post('/upload', authTokenMiddleware, upload.single('file'), async (req, res) => {
    const newFile = await fileModel.create({
        path: req.file.path,
        originalname: req.file.originalname,
        user: req.user.userId,

    });

    res.json(newFile);
});

router.get('/download/:path', authTokenMiddleware, async (req, res) => {
        const loggedUser = req.user.userId;
        const path = req.params.path;

        const file = await fileModel.findOne({
            path:path,
            user: loggedUser,
        });

        if (!file) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
});
module.exports = router;