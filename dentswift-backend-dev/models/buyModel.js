var { mongoose, conn } = require('../config/db');

const buySchema = new mongoose.Schema({
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'product'    
        },
        price: {
            type: Number,
            required: true
        },
        quantity: { 
            type: Number,
            default: 1
        },
        unit_price:{
            type: Number,
            default: 0
        },
        is_deleted: {
            type: Boolean,
            default: false
        },
        created_at: {
            type: Number,
            default: Date.now
        }
    },
    {
        strict: true,
        collection: 'buy',
        versionKey: false
    }
);

exports.BuyModel = mongoose.model('buy', buySchema);
