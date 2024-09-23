const sellerService = require("../services/seller.services");
var csc = require('country-state-city').default // Returns an array of country names.
let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
var _ = require('lodash');
// const stripe = require('stripe')('sk_test_51IjUapHzjgKxAWPNJJqHWX2us5t7Sl8ABNQMtGli65vhckODix3nudYK9Fh2HWZUQEEJUqhP3mlGthnI19kbvwoW00YhjcUcYW');
const stripe = require('stripe')('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');


exports.signupSeller = async (req, res) => {
    try {
        let userData = await sellerService.signupSeller(req);
        if (userData.status == -1) {
            throw new Error(userData.message);
        } else if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        } else {
            let validTo = '2 days';
            let user = await sellerService.saveToken(userData.data, validTo);
            if (user.status == -1) {
                throw new Error(user.message);
            }
            let dataToSend = {
                full_name: user.data.full_name,
                country_code: user.data.country_code,
                mobile_number: user.data.mobile_number,
                email: user.data.email,
                password: user.data.password,
                device_type: user.data.device_type,
                token: user.data.token,
                _id: user.data._id
              }
            res.status(200).json({ response: dataToSend, messsage: "4 digit OTP has been sent to your registered mobile number" });
        }
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        let userData = await sellerService.forgotPassword(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        } 
        let dataToSend = {
            token: userData.data.token
        }
        res.status(200).json({ message: userData.message, response: dataToSend });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        let userData = await sellerService.resetPassword(req.body, req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

exports.loginSeller = async (req, res) => {
    try {
        let userData = await sellerService.loginSeller(req);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        let validTo = '30 days';
        let user = await sellerService.saveToken(userData.data, validTo);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        let dataToSend = {
            _id: user.data._id,
            token: user.data.token,
            email: user.data.email,
            full_name: user.data.full_name,
            country_code: user.data.country_code,
            mobile_number: user.data.mobile_number,
            is_seller_verified: user.data.is_seller_verified,
            is_bank_created: user.data.is_bank_created,
            business_logo: user.data.business_logo
        }
        res.status(200).json({ response: dataToSend, messsage: "Sign in successfully" });
    } catch (error) {
        res.status(401.1).json({ message: error.message });
    }
};

exports.resendOtp = async (req, res) => {
    try {
        let user = await sellerService.resendOtp(req.sellerData);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        let userData = await sellerService.verifyOtp(req.body, req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.profileDetails = async (req, res) => {
    try {
        // if (req.files.store_trading_license != undefined || req.files.store_trading_license != null) {
        //     req.body.store_trading_license = req.files.store_trading_license[0].location ? req.files.store_trading_license[0].location : '';
        // }
        // if (req.files.store_signatory_id != undefined || req.files.store_signatory_id != null) {
        //     req.body.store_signatory_id = req.files.store_signatory_id[0].location ? req.files.store_signatory_id[0].location : '';
        // }
        // if (req.files.store_vat_certificate != undefined || req.files.store_vat_certificate != null) {
        //     req.body.store_vat_certificate = req.files.store_vat_certificate[0].location ? req.files.store_vat_certificate[0].location : '';
        // }
        // if (req.files.iban_certificate != undefined || req.files.iban_certificate != null) {
        //     req.body.iban_certificate = req.files.iban_certificate[0].location ? req.files.iban_certificate[0].location : '';
        // }
        
        let userData = await sellerService.profileDetails(req.body, req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message, response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.uploadFile = async (req, res) => {
    try {
        if (req.files.upload_seller_file != undefined || req.files.upload_seller_file != null) {
            req.body.upload_seller_file = req.files.upload_seller_file[0].location ? req.files.upload_seller_file[0].location : '';
        }

        let user = await sellerService.uploadFile(req.body, req.sellerData);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        let dataToSend = {
            imageUrl: user.data
        }
        res.status(200).json({ message: user.message, response: dataToSend });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.sendCountries = async (req, res) => {
    try {
        countrys = await csc.getAllCountries();
        res.status(200).json({ response: countrys, message: "All Countries Fetch" });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

exports.sendCities = async (req, res) => {
    try {
        if (!req.body.countryCode || req.body.countryCode == '') { throw new Error("Please give country Name") }
        cities = await csc.getCitiesOfCountry(req.body.countryCode);
        res.status(200).json({ response: cities, message: "All Cities Fetch" });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

exports.getSellerData = async (req, res) => {
    try {
        let userData = await sellerService.getSellerData(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.sendEmailVerification = async (req, res) => {
    try {
        let userData = await sellerService.sendEmailVerification(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        let userData = await sellerService.logout(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ response: userData.data, message: "Logout suggessfully" });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        let userData = await sellerService.addProduct(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.editProduct = async (req, res) => {
    try {
        let userData = await sellerService.editProduct(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        let userData = await sellerService.getAllProducts(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        let userData = await sellerService.deleteProduct(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.viewProduct = async (req, res) => {
    try {
        let userData = await sellerService.viewProduct(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.blockProduct = async (req, res) => {
    try {
        let userData = await sellerService.blockProduct(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.searchProduct = async (req, res) => {
    try {
        let userData = await sellerService.searchProduct(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.sortProducts = async (req, res) => {
    try {
        let userData = await sellerService.sortProducts(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getCategoryList = async (req, res) => {
    try {
    
        let user = await sellerService.getCategoryList(req.sellerData);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};


exports.getSubCategoryList = async (req, res) => {
    try {
        let user = await sellerService.getSubCategoryList(req.sellerData, req.body);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getSubSubCategoryList = async (req, res) => {
    try {
        let user = await sellerService.getSubSubCategoryList(req.sellerData, req.body);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.addInventory = async (req, res) => {
    try {
        let user = await sellerService.addInventory(req.sellerData, req.body);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.editInventory = async (req, res) => {
    try {
        let user = await sellerService.editInventory(req.sellerData, req.body);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getInventoryDetails = async (req, res) => {
    try {
        let user = await sellerService.getInventoryDetails(req.body);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getInventoryList = async (req, res) => {
    try {
        let user = await sellerService.getInventoryList(req.sellerData);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.deleteInventory = async (req, res) => {
    try {
        let user = await sellerService.deleteInventory(req.sellerData, req.body);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.changeStockQuantity = async (req, res) => {
    try {
        let user = await sellerService.changeStockQuantity(req.sellerData, req.body);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.searchStock = async (req, res) => {
    try {
        let userData = await sellerService.searchStock(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.sortStockList = async (req, res) => {
    try {
        let userData = await sellerService.sortStockList(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getNewOrderList = async (req, res) => {
    try {
        let userData = await sellerService.getNewOrderList(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        let userData = await sellerService.getOrderDetails(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.cancelOrder = async (req, res) => {
    try {
        let userData = await sellerService.cancelOrder(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.updateOrderStatus = async (req, res) => {
    try {
        let userData = await sellerService.updateOrderStatus(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getOngoingOrderList = async (req, res) => {
    try {
        let userData = await sellerService.getOngoingOrderList(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};


exports.pastOrderList = async (req, res) => {
    try {
        let userData = await sellerService.pastOrderList(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getSellerDetails = async (req, res) => {
    try {
        let userData = await sellerService.getSellerDetails(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getPaymentDetails = async (req, res) => {
    try {
        let userData = await sellerService.getPaymentDetails(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getPaymentCancelDetails = async (req, res) => {
    try {
        let userData = await sellerService.getPaymentCancelDetails(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getOngoingReports = async (req, res) => {
    try {
        let userData = await sellerService.getOngoingReports(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getCompletedOrdersReports = async (req, res) => {
    try {
        let userData = await sellerService.getCompletedOrdersReports(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getCancelledOrdersReports = async (req, res) => {
    try {
        let userData = await sellerService.getCancelledOrdersReports(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getCommissionDetailsReports = async (req, res) => {
    try {
        let userData = await sellerService.getCommissionDetailsReports(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getDashboardReports = async (req, res) => {
    try {
        let userData = await sellerService.getDashboardReports(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getDashboardChartReports = async (req, res) => {
    try {
        let userData = await sellerService.getDashboardChartReports(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getAdminDetails = async (req, res) => {
    try {
        let userData = await sellerService.getAdminDetails(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.updateMobileNumber = async (req, res) => {
    try {
        let userData = await sellerService.updateMobileNumber(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.updateEmail = async (req, res) => {
    try {
        let userData = await sellerService.updateEmail(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.updateStoreDetails = async (req, res) => {
    try {
        let userData = await sellerService.updateStoreDetails(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getBankDetails = async (req, res) => {
    try {
        let userData = await sellerService.getBankDetails(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.updateBankDetails = async (req, res) => {
    try {
        let userData = await sellerService.updateBankDetails(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.purchaseSubscription = async (req, res) => {
    try {
        let userData = await sellerService.purchaseSubscription(req.sellerData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getFinancialReport = async (req, res) => {
    try {
        let userData = await sellerService.getFinancialReport(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getPaymentReport = async (req, res) => {
    try {
        let userData = await sellerService.getPaymentReport(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getPlanList = async (req, res) => {
    try {
        let userData = await sellerService.getPlanList(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.activePlanDetails = async (req, res) => {
    try {
        let userData = await sellerService.activePlanDetails(req.sellerData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    } 
};

exports.getTermCondition = async (req, res) => {
    try {
        let user = await sellerService.getTermCondition();

        res.status(200).send(user);

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getAboutUsPage = async (req, res) => {
    try {
        let user = await sellerService.getAboutUsPage();

        res.status(200).send(user);
        
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getContactUsPage = async (req, res) => {
    try {
        let user = await sellerService.getContactUsPage();

        res.status(200).send(user);
        
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getLegalPage = async (req, res) => {
    try {
        let user = await sellerService.getLegalPage();

        res.status(200).send(user);
        
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getHelpPage = async (req, res) => {
    try {
        let user = await sellerService.getHelpPage();

        res.status(200).send(user);
        
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getPrivacyPolicy = async (req, res) => {
    try {
        let user = await sellerService.getPrivacyPolicy();

        res.status(200).send(user);
        
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getFaqList = async (req, res) => {
    try {
        let user = await sellerService.getFaqList();
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.updateBusinessDetails = async (req, res) => {
    try {
        let user = await sellerService.updateBusinessDetails(req.sellerData, req.body);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getBusinessDetails = async (req, res) => {
    try {
        let user = await sellerService.getBusinessDetails(req.sellerData);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.raiseNewIssue = async (req, res) => {
    try {
        let user = await sellerService.raiseNewIssue(req.sellerData, req.body);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.viewIssue = async (req, res) => {
    try {
        let user = await sellerService.viewIssue(req.sellerData, req.body);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getComplaintList = async (req, res) => {
    try {
        let user = await sellerService.getComplaintList(req.sellerData);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getStoreDetails = async (req, res) => {
    try {
        let user = await sellerService.getStoreDetails(req.sellerData);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getNotificationList = async (req, res) => {
    try {
        let user = await sellerService.getNotificationList(req.sellerData);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.subscriptionNotification = async (req, res) => {
    try {
        let user = await sellerService.subscriptionNotification(req.sellerData);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};


