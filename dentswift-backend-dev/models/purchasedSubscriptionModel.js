var { mongoose, conn } = require('../config/db');

let purchasedSubsciptionschema = mongoose.Schema({
    created_on: {
        type: Number,
        default: Date.now()
    },
    seller_id: {
        type: mongoose.Schema.ObjectId,
        ref: "seller",
    },
    amount: {
        type: Number,
        require: true
    },
    transaction_id: {
        type: String,
        require: true
    },
    response_json: {
        
    },
    plan_detail: {
        
    },
    is_currently_active: {
        type: Boolean,
        default: false
    }
}, {
    strict: true,
    collection: 'purchased_subscription',
    versionKey: false,
});
exports.PurchasedSubscriptionModel = mongoose.model('purchased_subscription',purchasedSubsciptionschema)