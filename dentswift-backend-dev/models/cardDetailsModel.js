var { mongoose, conn } = require('../config/db');

let card_detail_Schema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
    },
    bank_name: {
        type: String,
        default: null
    },
    card_number: {
        type: String,
        require: true
    },
    validity_date: {
        type: String,
        require: true
    },
    cvv: {
        type: String,
        require: true
    },
    customer_id: {
        type: String,
        require: true,
        default: "N/A"
    },
    card_id: {
        type: String,
        require: true,
        default: "N/A"
    },
    card_type: {
        type: String,
        default: "N/A"
    },
    card_name: {
        type: String,
        default: "N/A"
    },
    default_card:{
        type:Number,
        default:0
    },
}, {
        strict: true,
        collection: 'user_card_details',
        versionKey: false
    });

exports.UserCardDetailsModel =  mongoose.model('user_card_details', card_detail_Schema);