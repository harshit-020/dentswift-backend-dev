var { mongoose, conn } = require('../config/db');

var settingScheme = new mongoose.Schema({
    term_condition: {
        type: String
    },
    about_us: {
        type: String
    },
    contact_us: {
        type: String,
    },
    legal: {
        type: String,
    },
    help: {
        type: String,
    },
    privacy_policy: {
        type: String,
    }
}, {
        strict: true,
        collection: 'setting',
        versionKey: false
    });

exports.SettingModel = mongoose.model('setting', settingScheme);
