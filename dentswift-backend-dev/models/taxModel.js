const { mongoose, conn } = require('../config/db');

const taxDeliverySchema = mongoose.Schema(
    {
        tax_percent: {
            type: Number,
            default: 0
        },
        delivery_charge: {
            type: Number,
            default: 0
        },
        added_on:{
            type: Number,
            default: new Date().getTime(),
        },
        modified_on:{
            type: Number,
            default: new Date().getTime(),
        }
    }, {
    collection: 'tax',
    versionKey: false,
    strict: true
});

exports.TaxModel = mongoose.model('tax', taxDeliverySchema);
