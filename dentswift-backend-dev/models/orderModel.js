const { mongoose, conn } = require('../config/db');
const generateUniqueId = require('generate-unique-id');

const orderSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        cart_id: {
            type: mongoose.Types.ObjectId,
            ref: 'cart'
        },
        // delivery_charge: {
        //     type: Number,
        //     default: 0
        // },
        // transaction_id: {
        //     type: String,
        //     default: ''
        // },
        order_id: {
            type: String,
            default: generateUniqueId({
                length: 7,
                useLetters: true
            }).toUpperCase()
        },
        price: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: ''
        },
        quantity: {
            type: Number,
            default: 1
        },
        address_id: {
            type: mongoose.Types.ObjectId,
            ref: 'address'
        },
        payment_options: {
            type: String,
            enum: ['COD', 'CARD', 'CHEQUE', 'CREDITLINE','PICKUPORDER','PAYPAL'],
            default: 'COD'
        },
        coupon_id: {
            type: mongoose.Types.ObjectId,
            ref: 'coupon'
        },
        // discount_amount: {
        //     type: Number,
        //     default: 0
        // },
        // tax_amount: {
        //     type: Number,
        //     default: 0
        // },
        cheque_image: {
            type: String,
            default: ''
        },
        created_at: {
            type: Number,
            default: Date.now
        },
        intransit_on: {
            type: Number,
            default: Date.now
        },
        dispatch_on: {
            type: Number,
            default: Date.now
        },
        shipping_on: {
            type: Number,
            default: Date.now
        },
        arriving_on: {
            type: Number,
            default: Date.now
        },
        out_for_delivery_on: {
            type: Number,
            default: Date.now
        },
        delivered_on: {
            type: Number,
            default: Date.now
        },
        cancelled_on: {
            type: Number,
            default: Date.now
        },
        modified_at: {
            type: Number,
            default: Date.now
        },
        deliverby: {
            type: String,
            default: '5 Days'
        },
        delivery_on: {
            type: Number,
            default: Date.now() + 5 * 24 * 60 * 60 * 60
        },
        card_id: {
            type: mongoose.Types.ObjectId,
            ref: 'user_card_details'
        },
        booking_id: {
            type: mongoose.Types.ObjectId,
            ref: 'orderBooking'
        },
        is_rated: {
            type: Boolean,
            default: false
        },
        reason: {
            type: String
        },
        status: {
            type: Number,
            default: 0 // 0 for pending, 1 for new order confirm, 2 for intransit, 3 for readyForDispatch, 4 for Shipping, 5 for arriving, 6 out for delivery, 7 for delivered, 8 for cancelled
        }
    }, {
    collection: 'order',
    versionKey: false,
    strict: true
});

exports.OrderModel = mongoose.model('order', orderSchema);
