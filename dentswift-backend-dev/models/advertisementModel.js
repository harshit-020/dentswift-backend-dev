var { mongoose, conn } = require('../config/db');

const advertisementSchema = new mongoose.Schema({
        // name: {
        //     type: String
        // },
        // discription: {
        //     type: String
        // },
        image: {
            type: String
        },
        start_date: {
            type: Number,
            default: Date.now()
        },
        end_date: {
            type: Number,
            default: Date.now()
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
        collection: 'advertisement',
        versionKey: false
    }
);

exports.AdvertisementModel = mongoose.model('advertisement', advertisementSchema);
