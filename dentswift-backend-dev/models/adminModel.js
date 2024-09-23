var { mongoose, conn } = require('../config/db');

const adminSchema = new mongoose.Schema({
    user_status: {
      type: Number,
      default: 1  //Note: user_type 1 for admin,
    },
    email: {
      type: String,
      required: true
    },
    full_name: {
      type: String,
      default: "Admin"
    },
    profile_image: {
      type: String,
      default: ''
    },
    about: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    mobile_no: {
      type: String,
      default: ''
    },
    token: {
      type: String,
      default: ''
    },
    link_token:{
      type: String,
      default: ''
    },
    password: {
      type: String,
      required: true
    },
    device_type: {
      type: Number,
      default: 1
    },      // 1 for Android, 2 for IOS, 3 for Web
    device_token: {
        type: String,
        default: null
    }
  },
  {
    strict: true,
    collection: 'admin',
    versionKey: false
  }
);

exports.AdminModel = mongoose.model('admin', adminSchema);
