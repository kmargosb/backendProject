const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    
    username: {
        type: String,
        required: false        
    },
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    picture: {
        type: String,
        required: false
    }
});

module.exports = model('User', userSchema);