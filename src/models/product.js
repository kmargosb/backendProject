const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
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