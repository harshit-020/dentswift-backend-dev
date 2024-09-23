var { mongoose, conn } = require('../config/db');

const productSchema = new mongoose.Schema({
        seller_id: {
            type: mongoose.Types.ObjectId,
            ref: 'seller'
        },
        product_name: {
            type: String,
            default: ""
        },
        product_description: {
            type: String,
            default: ""
        },
        product_image: [{
            image: "",
            main_image: false
        }],
        product_currency: {
            type: String,
            default: ""
        },
        product_price: {
            type: Number,
            default: 0
        },
        price_after_offer: {
            type: Number,
            default: 0
        },
        product_category: {
            type: mongoose.Types.ObjectId,
            ref: 'category'
        },
        sub_category: {
            type: mongoose.Types.ObjectId,
            ref: 'subcategory'
        },
        sub_subcategory: {
            type: mongoose.Types.ObjectId,
            ref: 'subsubcategory'
        },
        offer_applicable: {
            type: Number,
            default: 0
        },
        stock_available: {
            type: Number,
            default: 0
        },
        product_expiry_date: {
            type: Number,
            default: Date.now()
        },
        return_replacement_applicable: {
            type: Boolean,
            default: false
        },
        maxm_replacement_days: {
            type: Number,
            default: 0
        },
        maxm_return_days: {
            type: Number,
            default: 0
        },
        product_identification: {
            type: String,
            default: ""
        },
        brand_name: {
            type: String,
            default: ""
        },
        manufacturing_company: {
            type: String,
            default: null
        },
        temp_control: {
            type: String,
            default: null
        },
        delivery_in_days: {
            type: Number,
            default: 0
        },
        is_favourite: {
            type: Boolean,
            default: false
        },
        is_blocked: {
            type: Number,
            default: 0,
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
        collection: 'product',
        versionKey: false
    }
);

exports.ProductModel = mongoose.model('product', productSchema);
