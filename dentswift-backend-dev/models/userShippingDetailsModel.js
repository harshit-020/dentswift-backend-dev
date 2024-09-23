var { mongoose, conn } = require('../config/db');

const userShippingDetailsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    floor_number: {
        type: String,
        default: ''
    },
    shipping_address: {
        type: String,
        default: ''
    },
    street_adress: {
        type: String,
        default: ''
    },
    nearest_landmark: {
        type: String,
        default: null
    },
    building_name: {
        type: String,
        default: ''
    },
    shipping_area: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    postal_code: {
        type: String,
        default: ''
    },
    created_on: {
        type: Date
    },
    modified_on: {
        type: Date
    },
},
    {
        strict: true,
        collection: 'userShippingDetails',
        versionKey: false,
    }
);

exports.UserShippingDetailsModel = mongoose.model('userShippingDetails', userShippingDetailsSchema);
