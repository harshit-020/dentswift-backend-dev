var { mongoose, conn } = require('../config/db');

const complaintSchema = new mongoose.Schema({
        seller_id: {
            type: mongoose.Types.ObjectId,
            ref: 'seller'
        },
        complaint_id: {
            type: String,
            default: ""
        },
        complaint_regarding: {
            type: String,
            default: null
        },
        complaint_type: {
            type: String,
            default: null
        },
        complaint_description: {
            type: String,
            default: ""
        },
        complaint_status: {
            type: Number,
            default: 1 // 1 for open, 2 for closed
        },
        is_active: {
            type: Boolean,
            default: true
        },
        date_created: {
            type: Number,
            default: new Date().getTime()
        },
        date_updated: {
            type: Number,
            default: new Date().getTime()
        },
    },
    {
        strict: true,
        collection: 'complaint',
        versionKey: false
    }
);

exports.ComplaintModel = mongoose.model('complaint', complaintSchema);
