const mongoose = require('mongoose');
const { use } = require('../routes/main.routes');


const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, 'File path is required'],

    },
    originalname: {
        type: String,
        required: [true, 'Original name is required'],
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    }
});

const file = mongoose.model('File', fileSchema);
module.exports = file;