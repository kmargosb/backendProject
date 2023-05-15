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
    status: {
        type: String,
        required: true
    },
    photoUrl: {
        type: [String],
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});

module.exports = model('Product', productSchema);