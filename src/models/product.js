const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    photoUrl: {
        public_id:{
            type: String
        },
        imageURL:{
            type: String
        }
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});

module.exports = model('Product', productSchema);