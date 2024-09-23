var { mongoose, conn } = require('../config/db');

const brandSchema = new mongoose.Schema({
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
        collection: 'brand',
        versionKey: false
    }
);

exports.BrandModel = mongoose.model('brand', brandSchema);
