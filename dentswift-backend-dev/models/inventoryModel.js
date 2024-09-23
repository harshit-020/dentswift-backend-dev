const { mongoose, conn } = require('../config/db');
const generateUniqueId = require('generate-unique-id');

const inventorySchema = mongoose.Schema(
    {
        seller_id: {
            type: mongoose.Types.ObjectId,
            ref: 'seller'
        },
        stock_name: {
            type: String,
            default: ''
        },
        stock_quantity: {
            type: Number,
            default: 0
        },
        stock_image: {
            type: String,
            default: ''
        },
        stock_description: {
            type: String,
            default: ''
        },
        product_serial_no: {
            type: String,
            default: ''
        },
        product_category: {
            type: mongoose.Types.ObjectId,
            ref: 'category'
        },
        stock_id: {
            type: String,
            default: generateUniqueId({
                length: 7,
                useLetters: true
            }).toUpperCase()
        },
        entry_date: {
            type: Number,
            default: Date.now
        },
        expiry_date: {
            type: Number,
            default: Date.now
        },
        product_name: {
            type: String,
            default: ''
        },
        sub_category: { 
            type: mongoose.Types.ObjectId,
            ref: 'subcategory'
        },
        product_expiry_date: {
            type: Number,
            default: Date.now()
        },
        sub_subcategory: {
            type: mongoose.Types.ObjectId,
            ref: 'subsubcategory'
        },
        product_identification: {
            type: String,
            default: '' 
        },
        product_quantity: {
            type: Number,
            default: 0
        },
        temp_control: {
            type: String,
            default: '' 
        },
        prod_brand_name: {
            type: String,
            default: '' 
        },
        manufacturing_country: {
            type: String,
            default: '' 
        },
        product_price: {
            type: Number,
            default: 0
        },
        product_price_currency: {
            type: String,
            default: null
        },
        is_active: {
            type: Boolean,
            default: true
        },
        created_at: {
            type: Number,
            default: Date.now()
        },
        modified_at: {
            type: Number,
            default: Date.now
        }
    }, {
    collection: 'inventory',
    versionKey: false,
    strict: true
});

exports.InventoryModel = mongoose.model('inventory', inventorySchema);
