const { mongoose, conn } = require('../config/db');
const generateUniqueId = require('generate-unique-id');

const orderBookingSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        cart_id: [{
            type: mongoose.Types.ObjectId,
            ref: 'cart'
        }],
        order_id: [{
            type: mongoose.Types.ObjectId,
            ref: 'order'
        }],
        total_amount: {
            type: Number,
            default: 0
        },
        delivery_charge: {
            type: Number,
            default: 0
        },
        tax_amount: {
            type: Number,
            default: 0
        },
        coupon_id: {
            type: mongoose.Types.ObjectId,
            ref: 'coupon'
        },
        discount_amount: {
            type: Number,
            default: 0
        },
        transaction_id: {
            type: String,
            default: ''
        },
        booking_id: {
            type: String,
            default: ''
        },
        created_at: {
            type: Number,
            default: Date.now
        },
        modified_at: {
            type: Number,
            default: Date.now
        },
        status: {
            type: Number,
            default: 1
        }
    }, {
    collection: 'orderBooking',
    versionKey: false,
    strict: true
});

exports.OrderBookingModel = mongoose.model('orderBooking', orderBookingSchema);
