var { mongoose, conn } = require('../config/db');

const couponSchema = new mongoose.Schema({
        name: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        // product_type: {
        //     type: String,
        //     default: ""
        // },
        minimum_purchase_amount: {
            type: Number,
            default: 0
        },
        start_date: {
            type: Number,
            default: Date.now()
        },
        end_date: {
            type: Number,
            default: Date.now()
        },
        discount_type: {
            type: String,
            default: null
        },
        discount_amount: {
            type: Number,
            default: 0
        },
        maxm_use_limit: {
            type: Number,
            default: 0
        },
        is_active: {
            type: Boolean,
            default: true
        },
        date_created: {
            type: Number,
            default: Date.now()
        },
    },
    {
        strict: true,
        collection: 'coupon',
        versionKey: false
    }
);

exports.CouponModel = mongoose.model('coupon', couponSchema);
