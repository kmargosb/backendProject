const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    username: {
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
        public_id:{
          type: String  
        },
        secure_url:{
            type: String
        }
    }
});

module.exports = model('User', userSchema);