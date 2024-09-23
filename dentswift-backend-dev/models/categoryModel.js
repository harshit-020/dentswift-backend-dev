var { mongoose, conn } = require('../config/db');

const categorySchema = new mongoose.Schema({
        category_name: {
            type: String,
            default: ""
        },
        category_image: {
            type: String,
            default: null
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
        collection: 'category',
        versionKey: false
    }
);

exports.CategoryModel = mongoose.model('category', categorySchema);
