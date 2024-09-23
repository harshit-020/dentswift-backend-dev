const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../config/config'); // get our config file
const { UserModel } = require('../models/userModel');
const { SellerModel } = require('../models/sellerModel');
const { AdminModel } = require('../models/adminModel');

exports.verifyUserToken = async(req, res, next) => {

    // check header or url parameters or post parameters for token
    let {access_token} = req.headers;
    if (!access_token) return res.status(401).send({ auth: false, message: 'No token provided' });

    // verifies secret and check expiration
    jwt.verify(access_token, config.JWT_PRIVATE_KEY,async function (err, decoded) {
        if (!err){
            let user = await UserModel.findOne({ token: access_token })
                if (!user) {
                    res.status(401).json({message: "Invalid access_token."});
                    return;
                }
                req.userData = user;
                next();
        }else{
            return res.status(401).json({ auth: false, message: 'Token has been expired' });
        }
        // if everything is good, save to request for use in other routes
    });
};

exports.verifyAdminToken = async(req, res, next) => {
    // check header or url parameters or post parameters for token
    let {access_token} = req.headers;
    if (!access_token) return res.status(401).send({ auth: false, message: 'No token provided' });

    // verifies secret and check expiration
    jwt.verify(access_token, config.JWT_PRIVATE_KEY,async function (err, decoded) {
        if (!err){
            let user = await AdminModel.findOne({ token: access_token });
            // if (!user) {
            //     res.status(401).json({message: "Invalid access_token."});
            //     return;
            // }
            // req.adminData = user;
            // next();

            if(user){
                req.adminData = user;
                next();
            } else {
                let use = await SellerModel.findOne({ token: access_token })
                if (!use) {
                    res.status(401).json({message: "Invalid access_token."});
                    return;
                }
                req.sellerData = use;
                next();
            }
        }else{
            return res.status(401).json({ auth: false, message: 'Token has been expired' });
        }
        // if everything is good, save to request for use in other routes
    });
};

exports.verifySellerToken = async(req, res, next) => {

    // check header or url parameters or post parameters for token
    let {access_token} = req.headers;
    if (!access_token) return res.status(401).send({ auth: false, message: 'No token provided' });

    // verifies secret and check expiration
    jwt.verify(access_token, config.JWT_PRIVATE_KEY,async function (err, decoded) {
        if (!err){
            let user = await SellerModel.findOne({ token: access_token })
                if (!user) {
                    res.status(401).json({message: "Invalid access_token."});
                    return;
                }
                req.sellerData = user;
                next();
        }else{
            return res.status(401).json({ auth: false, message: 'Token has been expired' });
        }
        // if everything is good, save to request for use in other routes
    });
};



exports.generateToken = (days) => {
    let token = jwt.sign({ access: 'access-' }, config.JWT_PRIVATE_KEY, { expiresIn: days });
    return token;
}
