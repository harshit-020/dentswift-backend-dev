var { mongoose, conn } = require('../config/db');

const subCategorySchema = new mongoose.Schema({
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: 'category'
        },
        subcategory_name: {
            type: String,
            default: ""
        },
        subcategory_image: {
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
        collection: 'subcategory',
        versionKey: false
    }
);

exports.SubCategoryModel = mongoose.model('subcategory', subCategorySchema);
