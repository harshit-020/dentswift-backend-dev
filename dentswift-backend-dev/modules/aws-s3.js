const config = require('../config/config');

var aws = require('aws-sdk');
var multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: config.S3_SecretKey,
    accessKeyId: config.S3_AccessKey,
    region: config.S3_Region
});

var s3 = new aws.S3();

//console.log(" data :",config.S3_AccessKey);
let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.S3_BucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        LocationConstraint: multerS3.AWS_DEFAULT_REGION,
        acl: 'private',
        metadata: function (req, file, cb) {
            cb(null, {
                fieldName: file.fieldname
            });
        },
        key: function (req, file, cb) {
            console.log("Original Image :",file.originalname);
            cb(null,"Uploads/" + Date.now() + "/" + file.originalname)

        }
    })
});

exports.uploadProfileImages = async (req, res, next) => {
    await upload.fields([
        {
            name: 'store_trading_license',
            maxCount: 5
        },
        {
            name: 'store_signatory_id',
            maxCount: 5
        },
        {
            name: 'store_vat_certificate',
            maxCount: 5
        },
        {
            name: 'iban_certificate',
            maxCount: 5
        }
    ])
        (req, res, (err, some) => {
            if (err) {
                return res.status(422).send({
                    message: err.message,
                    response: null
                });
            }
            next();
        });
};

exports.uploadImage = async (req, res, next) => {
    await upload.fields([
        {
            name: 'upload_file',
            maxCount: 5
        }
    ])
        (req, res, (err, some) => {
            if (err) {
                return res.status(422).send({
                    message: err.message,
                    response: null
                });
            }
            next();
        });
};

exports.uploadFile = async (req, res, next) => {
    await upload.fields([
        {
            name: 'upload_seller_file',
            maxCount: 5
        }
    ])
        (req, res, (err, some) => {
            if (err) {
                return res.status(422).send({
                    message: err.message,
                    response: null
                });
            }
            next();
        });
};

// exports.userProfileImage = async (req, res, next) => {
//     await upload.fields([
//         {
//             name: 'profile_pic',
//             maxCount: 5
//         }
//     ])
//         (req, res, (err, some) => {
//             if (err) {
//                 return res.status(422).send({
//                     message: err.message,
//                     response: null
//                 });
//             }
//             next();
//         });
// };

// exports.userDetailsImage = async (req, res, next) => {
//     await upload.fields([
//         {
//             name: 'authorized_signature',
//             maxCount: 5
//         }
//     ])
//         (req, res, (err, some) => {
//             if (err) {
//                 return res.status(422).send({
//                     message: err.message,
//                     response: null
//                 });
//             }
//             next();
//         });
// };

exports.uploadAdminFile = async (req, res, next) => {
    await upload.fields([
        {
            name: 'upload_admin_file',
            maxCount: 5
        }
    ])
        (req, res, (err, some) => {
            if (err) {
                return res.status(422).send({
                    message: err.message,
                    response: null
                });
            }
            next();
        });
};

