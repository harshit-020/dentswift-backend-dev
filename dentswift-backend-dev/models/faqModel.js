var { mongoose, conn } = require('../config/db');

let faqSchema =  new mongoose.Schema({
    question:{
        type:String,
        require:true
    },
    answer:{
        type:String,
        require:true
    },
    created_on: {
        type: Number,
        default: new Date()
    }
},{
    strict: true,
    collection: 'faq',
    versionKey: false
})

exports.FaqModel = mongoose.model('faq' , faqSchema)