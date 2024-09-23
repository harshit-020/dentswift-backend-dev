var { mongoose, conn } = require('../config/db');

const addressSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    building_number: {
        type: String,
        default: ''
    },
    flat_number: {
        type: String,
        default: ''
    },
    street_number: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    zip_code: {
        type: String,
        default: ''
    },
    default_address:{
        type:Number,
        default:0
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
},
    {
        strict: true,
        collection: 'address',
        versionKey: false
    }
);

exports.AddressModel = mongoose.model('address', addressSchema);