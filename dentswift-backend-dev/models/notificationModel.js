var { mongoose, conn } = require('../config/db');

const notificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        default: ''   
    },
    body: {
        type: String,
        default: ''   
    },
    type: {
        type: Number,
        default: 0 // 0 for user, 1 for seller, 2 for admin   
    },
    created_at:{
        type: String,
        default: new Date().getTime()
    }
},
    {
        strict: true,
        collection: 'notification',
        versionKey: false
    }
);

exports.NotificationModel = mongoose.model('notification', notificationSchema);

