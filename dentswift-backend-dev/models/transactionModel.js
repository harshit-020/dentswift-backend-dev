const { mongoose, conn } = require('../config/db');
const generateUniqueId = require('generate-unique-id');

const transactionSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },
        order_id: {
            type: mongoose.Types.ObjectId,
            ref: 'order'
        },
        transaction_id: {
            type: String,
            default: generateUniqueId({
                length: 7,
                useLetters: true
            }).toUpperCase()
        },
        card_id: {
            type: mongoose.Types.ObjectId,
            ref: 'user_card_details'
        },
        payment_mode: {
            type: String,
            enum: ['COD', 'CARD', 'CHEQUE', 'CREDITLINE'],
            default: 'COD'
        },
        amount: {
            type: Number,
            default:0,
        },
        date:{
            type: Number,
            default: new Date().getTime(),
        },
    }, {
    collection: 'transaction',
    versionKey: false,
    strict: true
});

exports.TransactionModel = mongoose.model('transaction', transactionSchema);
