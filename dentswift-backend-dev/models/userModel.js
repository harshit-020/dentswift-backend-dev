var { mongoose, conn } = require('../config/db');

const userSchema = new mongoose.Schema({
    user_status: {
        type: Number,
        default: 3  //Note: user_status 1 for admin, 2 for seller, 3 for user
    },
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: null
    },
    country_code: {
        type: String,
        default: null
    },
    mobile_number: {
        type: String,
        default: null
    },
    full_name: {
        type: String,
        default: ''
    },
    profile_pic: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    user_type: {
        type: Number,
        default: 1  // Hoshpital – 1, Student = 2, Consumer = 3, Dental Clinic = 4,  Dentist = 5
    },
    user_details: {
        hospital_name: {
            type: String,
            default: null
        },
        license_number: {
            type: String,
            default: null
        },
        authorized_signature: {
            type: String,
            default: null
        },
        landline_extension_number: {
            type: String,
            default: null
        },
        manager_name: {
            type: String,
            default: null
        },
        user_city: {
            type: String,
            default: null
        },
        user_country:  {
            type: String,
            default: null
        },
        user_mobile_number:  {
            type: String,
            default: null
        },
        user_email:  {
            type: String,
            default: null
        },
        user_country_code: {
            type: String,
            default: null
        },
        vat_number: {
            type: String,
            default: null
        },
        user_name: {
            type: String,
            default: ''
        },
        user_surname: {
            type: String,
            default: ''
        },
        university_name: {
            type: String,
            default: ''
        },
        student_id: {
            type: String,
            default: null
        },
        nationality: {
            type: String,
            default: ''
        },
        workplace: {
            type: String,
            default: ''
        },
        office_number: {
            type: String,
            default: null
        },
        clinic_name: {
            type: String,
            default: ''
        }
    },
    social_id: {
        type: String,
        default: ''
    },
    is_user_verified: {
        type: Boolean,
        default: false
    },              
    is_basic_details_added: {
        type: Boolean,
        default: false
    },
    is_user_type_details_added: {
        type: Boolean,
        default: false
    },
    is_shipping_added: {
        type: Boolean,
        default: false
    },
    user_permissions: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
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
    shipping_details: [{
        type: mongoose.Types.ObjectId,
        ref: 'usershippingdetails'
    }],
    app_version: {
        type: String,
        default: null
    }, 
    is_active: {
        type: Boolean,
        default: true
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
        collection: 'user',
        versionKey: false,
    }
);

exports.UserModel = mongoose.model('user', userSchema);
