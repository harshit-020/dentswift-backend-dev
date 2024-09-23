
var { mongoose, conn } = require('../config/db');

const ratingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'product'
    },
    order_id: {
        type: mongoose.Types.ObjectId,
        ref: 'order'
    },
    rating_point: {
        type: Number
    },
    review: {
        type: String
    },
    modified_at: {
        type: Number,
        default: Date.now
    },
    created_at: {
        type: Number,
        default: Date.now
    }

},
    {
        strict: true,
        collection: 'rating',
        versionKey: false
    });

exports.ratingModel = mongoose.model('rating', ratingSchema);