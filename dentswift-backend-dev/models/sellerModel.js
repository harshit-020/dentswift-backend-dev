var { mongoose, conn } = require('../config/db');

const sellerSchema = new mongoose.Schema({
    user_status: {
        type: Number,
        default: 2  //Note: user_status 1 for admin, 2 for seller, 3 for user
    },
    full_name: {
        type: String,
        default: ''
    },
    country_code: {
        type: String,
        default: null
    },
    mobile_number: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: ''
    },
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    landline_no: {
        type: String,
        default: ''
    },
    authorized_signatory_email: {
        type: String,
        default: null
    },
    store_name: {
        type: String,
        default: ''
    },
    business_logo: {
        type: String,
        default: null
    },
    store_description: {
        type: String,
        default: ''
    },
    working_days: [],
    from_time: {
        type: String,
        default: ''
    },
    to_time: {
        type: String,
        default: ''
    },
    store_business_type: {
        type: String,
        default: '',
    },
    store_commercial_name: {
        type: String,
        default: '',
    },
    store_address: {
        type: String,
        default: ''
    },
    store_city: {
        type: String,
        default: ''
    },
    store_country: {
        type: String,
        default: ''
    },
    store_trading_license: {
        type: String,
        default: null
    },         
    store_signatory_id: {
        type: String,
        default: null
    },    
    store_signatory_number: {
        type: String,
        default: null
    },     
    bank_details: [{
        iban_certificate: String,
        account_number: String,
        account_holder_name: String,
        bank_name: String,
        swift_code: String
    }], 
    business_details: {
        business_name: String,
        signature: String,
        tax_id: String,
        tin_no: String,
        reg_business_address: String,
        reg_business_city: String,
        reg_business_pincode: String,
        reg_business_state: String,
        pickup_business_address: String,
        pickup_business_city: String,
        pickup_business_pincode: String,
        pickup_business_state: String
    },
    selected_plan: {
        type: String,
        default: ''
    },                  
    is_seller_verified: {
        type: Boolean,
        default: false
    },  
    is_blocked: {
        type: Number,
        default: 0,
    },      
    otp_info: {
        otp: String,
        expTime: Date  //otp expiry time
    }, 
    token: {
        type: String,
        default: ''
    },
    link_token:{
        type: String,
        default: ''
    },
    is_bank_created: {
        type: Boolean,
        default: false
    },
    device_type: {
        type: Number,
        default: 1
    },      // 1 for Android, 2 for IOS, 3 for Web
    device_token: {
        type: String,
        default: null
    },
    notification: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    },
    status: {
        type: Number,
        default: 0  // 0 for pending, 1 for accepted, 2 for rejected
    },      
    date_joined:{
        type: Number,
        default: new Date().getTime()
    },
    last_login:{
        type: Number,
        default: new Date().getTime()
    }
},
    {
        strict: true,
        collection: 'seller',
        versionKey: false
    }
);

exports.SellerModel = mongoose.model('seller', sellerSchema);
