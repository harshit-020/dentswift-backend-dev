var { mongoose, conn } = require('../config/db');

const subSubCategorySchema = new mongoose.Schema({
        subcategory_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'subcategory'
        },
        sub_subcategory_name: {
            type: String,
            default: ""
        },
        sub_subcategory_image: {
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
        collection: 'subsubcategory',
        versionKey: false
    }
);

exports.SubSubCategoryModel = mongoose.model('subsubcategory', subSubCategorySchema);
