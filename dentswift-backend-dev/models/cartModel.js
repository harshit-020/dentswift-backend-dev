var { mongoose, conn } = require('../config/db');

const cartSchema = new mongoose.Schema({
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'product'    
        },
        seller_id: {
            type: mongoose.Types.ObjectId,
            ref: 'seller'    
        },
        status: {
            type: Number,
            default: 0 //0 for cart and 1 for wishlist, 2 for buyNow, 3 for orderPlacedForCart,  4 for intransit, 5 for readyForDispatch, 6 for Shipping, 7 for arriving, 8 out for delivery, 9 for delivered, 10 for cancelled
        },
        currency: {
            type: String,
            default: ''
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
        },
        modified_at: {
            type: Number,
            default: Date.now
        },
        order_id: {
            type: mongoose.Types.ObjectId,
            ref: 'order'    
        },
        booking_id: {
            type: mongoose.Types.ObjectId,
            ref: 'orderBooking'
        },
        reason: {
            type: String
        },
        note: {
            type: String
        },
    },
    {
        strict: true,
        collection: 'cart',
        versionKey: false
    }
);

exports.CartModel = mongoose.model('cart', cartSchema);
