var { mongoose, conn } = require('../config/db');

let subscriptionschema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price:{
        type:Number,
        default:0
    },
    is_blocked:{
        type:Boolean,
        default:false
    },
    trial_period_days: {
        type: Number,
        default: 0  
    },
    created_on: {
        type: Number,
        default: new Date().getTime()
    },
    is_active:{
        type:Boolean,
        default:true
    },
}, {
    strict: true,
    collection: 'subscription',
    versionKey: false
})

exports.SubscriptionModel = mongoose.model('subscription', subscriptionschema)