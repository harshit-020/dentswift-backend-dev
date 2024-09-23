const userService = require("../services/user.services");
var csc = require('country-state-city').default // Returns an array of country names.
var _ = require('lodash');

exports.registerUser = async (req, res) => {
    try {
        let userData = await userService.registerUser(req);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }else if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        } else {
            let validTo = '2 days';
            let user = await userService.saveToken(userData.data, validTo);
            if (user.status == -1) {
                throw new Error(user.message);
            }
            if (user.status == 0) {
                return res.status(403).json({ message: user.message });
            }

            let dataToSend = {
                first_name: user.data.first_name,
                last_name: user.data.last_name,
                email: user.data.email,
                country_code: user.data.country_code,
                mobile_number: user.data.mobile_number,
                password: user.data.password,
                device_type: user.data.device_type,
                token: user.data.token,
                _id: user.data._id
              }
            res.status(200).json({ response: dataToSend, messsage: "4 digit OTP has been sent to your registered mobile number and verification link has been sent to your email address to get it verified" });
        }
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        let userData = await userService.forgotPassword(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        let dataToSend = {
            token: userData.data
        }
        res.status(200).json({ message: userData.message, response: dataToSend });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        let userData = await userService.resetPassword(req.body, req.userData);
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

exports.verifyOtp = async (req, res) => {
    try {
        let userData = await userService.verifyOtp(req.body, req.userData);
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

exports.resendOtp = async (req, res) => {
    try {
        let user = await userService.resendOtp(req.userData);
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

exports.uploadImage = async (req, res) => {
    try {
        if (req.files.upload_file != undefined || req.files.upload_file != null) {
            req.body.upload_file = req.files.upload_file[0].location ? req.files.upload_file[0].location : '';
        }

        let user = await userService.uploadImage(req.body, req.userData);
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

exports.loginUser = async (req, res) => {
    try {
        let userData = await userService.loginUser(req);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        let validTo = '30 days';
        let user = await userService.saveToken(userData.data, validTo);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        let dataToSend = {
            _id: user.data._id,
            token: user.data.token,
            email: user.data.email,
            first_name: user.data.first_name,
            last_name: user.data.last_name,
            country_code: user.data.country_code,
            mobile_number: user.data.mobile_number,
            profile_pic: user.data.profile_pic,
            user_type: user.data.user_type,
            is_user_verified: user.data.is_user_verified,
            is_basic_details_added: user.data.is_basic_details_added,
            is_user_type_details_added: user.data.is_user_type_details_added,
            is_shipping_added: user.data.is_shipping_added,
        }
        res.status(200).json({ response: dataToSend, messsage: "Sign in successfully" });
    } catch (error) {
        res.status(401.1).json({ message: error.message });
    }
};

exports.updateBasicDetails = async (req, res) => {
    try {
    
        let user = await userService.updateBasicDetails(req.userData, req.body);
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

exports.addShippingDetails = async (req, res) => {
    try {
        let user = await userService.addShippingDetails(req.userData, req.body);
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

exports.addUserDetails = async (req, res) => {
    try {
        
        let user = await userService.addUserDetails(req.userData, req.body);
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


exports.loginWithSocialAccount = async (req, res) => {
    try {
        
        let userData = await userService.loginWithSocialAccount(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        let validTo = '30 days';
        let user = await userService.saveToken(userData.data, validTo);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }

        let dataToSend = {
            _id: user.data._id,
            token: user.data.token,
            first_name: user.data.first_name,
            profile_pic: user.data.profile_pic,
            email: user.data.email,
            last_name: user.data.last_name,
            country_code: user.data.country_code,
            mobile_number: user.data.mobile_number,
            is_basic_details_added: user.data.is_basic_details_added,
            is_user_type_details_added: user.data.is_user_type_details_added,
            is_shipping_added: user.data.is_shipping_added,
        }

        res.status(200).json({ response: dataToSend, messsage: "Social sign up successfully" });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
}

exports.getCategoryList = async (req, res) => {
    try {
    
        let user = await userService.getCategoryList(req.userData);
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
        let user = await userService.getSubCategoryList(req.userData, req.body);
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
        let user = await userService.getSubSubCategoryList(req.userData, req.body);
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

exports.getCouponList = async (req, res) => {
    try {
        let user = await userService.getCouponList(req.userData);
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

exports.getBrandList = async (req, res) => {
    try {
        let user = await userService.getBrandList(req.userData);
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

exports.searchSubCategory = async (req, res) => {
    try {
        let user = await userService.searchSubCategory(req.body);
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

exports.searchSubSubCategory = async (req, res) => {
    try {
        let user = await userService.searchSubSubCategory(req.body);
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

exports.getProductList = async (req, res) => {
    try {
        let user = await userService.getProductList(req.body, req.userData);
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

exports.addProductRating = async (req, res) => {
    try {
        let user = await userService.addProductRating(req.userData, req.body);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getProductDetails = async (req, res) => {
    try {
        let user = await userService.getProductDetails(req.userData, req.body);
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

exports.getFavoriteProductList = async (req, res) => {
    try {
        let user = await userService.getFavoriteProductList(req.userData);
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

exports.changeFavoriteStatus = async (req, res) => {
    try {
        let user = await userService.changeFavoriteStatus(req.body, req.userData);
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

exports.searchProductList = async (req, res) => {
    try {
        let user = await userService.searchProductList(req.body);
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

exports.searchFavouriteProducts = async (req, res) => {
    try {
        let user = await userService.searchFavouriteProducts(req.body);
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


exports.getAllAdvertisemt = async (req, res) => {
    try {
        let user = await userService.getAllAdvertisemt(req.userData);
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

exports.addProductToCart = async (req, res) => {
    try {
        let user = await userService.addProductToCart(req.userData, req.body);
        if (user.status == -1) {
            return res.status(403).json({ message: user.message });
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.showCartProducts = async (req, res) => {
    try {
        let user = await userService.showCartProducts(req.userData, req.body);
        if (user.status == -1) {
            res.status(403).json({ message: user.message });
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data  });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.changeProductQuantity = async (req, res) => {
    try {
        let user = await userService.changeProductQuantity(req.userData, req.body);
        if (user.status == -1) {
            res.status(403).json({ message: user.message });
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message  });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.removeProductFromCart = async (req, res) => {
    try {
        let user = await userService.removeProductFromCart(req.body);
        if (user.status == -1) {
            res.status(403).json({ message: user.message });
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message  });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.moveProductToWishlist = async (req, res) => {
    try {
        let user = await userService.moveProductToWishlist(req.body);
        if (user.status == -1) {
            // throw new Error(user.message);
            res.status(403).json({ message: user.message });
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message  });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.addAddress = async (req, res) => {
    try {
        let user = await userService.addAddress(req.userData, req.body);
        if (user.status == -1) {
            res.status(403).json({ message: user.message });
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.editAddress = async (req, res) => {
    try {
        let user = await userService.editAddress(req.userData, req.body);
        if (user.status == -1) {
            res.status(403).json({ message: user.message });
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        let user = await userService.deleteAddress(req.userData, req.body);
        if (user.status == -1) {
            res.status(403).json({ message: user.message });
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getAllAddressList = async (req, res) => {
    try {
        let user = await userService.getAllAddressList(req.userData);
        if (user.status == -1) {
            res.status(403).json({ message: user.message });
        }
        if (user.status == 0) {
            res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.sendCountries = async (req, res) => {
    try {
        let countrys = await csc.getAllCountries();
        let dataToSend = {
            countryList: countrys
        }
        res.status(200).json({ response: dataToSend, message: "All countries fetch" });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

exports.sendStateList = async (req, res) => {
    try {
        if (!req.body.countryCode || req.body.countryCode == '') { throw new Error("Please provide country code") }
        let states = await csc.getStatesOfCountry(req.body.countryCode);
        let dataToSend = {
            stateList: states
        }
        res.status(200).json({ response: dataToSend, message: "All state Fetch" });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

exports.sendCityList = async (req, res) => {
    try {
        if (!req.body.countryCode || req.body.countryCode == '') { throw new Error("Please provide country code") }
        if (!req.body.stateCode || req.body.stateCode == '') { throw new Error("Please provide state code") }
        let cities = await csc.getCitiesOfState(req.body.countryCode, req.body.stateCode);
        let dataToSend = {
            cityList: cities
        }
        res.status(200).json({ response: dataToSend, message: "All cities fetch" });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

exports.buyProduct = async (req, res) => {
    try {
        let user = await userService.buyProduct(req.userData, req.body);
        if (user.status == -1) {
            return res.status(403).json({ message: user.message });
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.setDefaultAddress = async (req, res) => {
    try {
        let user = await userService.setDefaultAddress(req.userData, req.body);
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

exports.placeProductsOrder = async (req, res) => {
    try {
        let user = await userService.placeProductsOrder(req.userData, req.body);
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

exports.applyCoupon = async (req, res) => {
    try {
        let user = await userService.applyCoupon(req.userData, req.body);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.confirmChequeTransaction = async (req, res) => {
    try {
        let user = await userService.confirmChequeTransaction(req.userData, req.body);
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

exports.createToken = async (req, res) => {
    try {
        let user = await userService.createToken(req.userData);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.addUserCard = async (req, res) => {
    try {
        let user = await userService.addUserCard(req.userData, req.body);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getCardList = async (req, res) => {
    try {
        let user = await userService.getCardList(req.userData);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, response: user.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.deleteCard = async (req, res) => {
    try {
        let user = await userService.deleteCard(req.userData, req.body);
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

exports.makeStripePayment = async (req, res) => {
    try {
        let user = await userService.makeStripePayment(req.userData, req.body);
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

exports.getOrderSummary = async (req, res) => {
    try {
        let user = await userService.getOrderSummary(req.userData, req.body);
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

exports.ongoingOrderList = async (req, res) => {
    try {
        let user = await userService.ongoingOrderList(req.userData);
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

exports.pastOrderList = async (req, res) => {
    try {
        let user = await userService.pastOrderList(req.userData);
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

exports.trackOrder = async (req, res) => {
    try {
        let user = await userService.trackOrder(req.userData, req.body);
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

exports.getOrderDetails = async (req, res) => {
    try {
        let user = await userService.getOrderDetails(req.userData, req.body);
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

exports.getOrderRating = async (req, res) => {
    try {
        let user = await userService.getOrderRating(req.userData, req.body);
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

exports.getTemplates = async (req, res) => {
    try {
        let user = await userService.getTemplates(req.body);
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

exports.getProfileDetails = async (req, res) => {
    try {
        let user = await userService.getProfileDetails(req.userData);
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

exports.updateProfileDetails = async (req, res) => {
    try {
        let user = await userService.updateProfileDetails(req.userData, req.body);
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

exports.changePassword = async (req, res) => {
    try {
        let user = await userService.changePassword(req.userData, req.body);
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

exports.logoutUser = async (req, res) => {
    try {
        let user = await userService.logoutUser(req.userData);
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

exports.logoutUser = async (req, res) => {
    try {
        let user = await userService.logoutUser(req.userData);
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

exports.getTermCondition = async (req, res) => {
    try {
        let user = await userService.getTermCondition();

        res.status(200).send(user);

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getAboutUsPage = async (req, res) => {
    try {
        let user = await userService.getAboutUsPage();

        res.status(200).send(user);
        
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getContactUsPage = async (req, res) => {
    try {
        let user = await userService.getContactUsPage();

        res.status(200).send(user);
        
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getLegalPage = async (req, res) => {
    try {
        let user = await userService.getLegalPage();

        res.status(200).send(user);
        
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getHelpPage = async (req, res) => {
    try {
        let user = await userService.getHelpPage();

        res.status(200).send(user);
        
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getPrivacyPolicy = async (req, res) => {
    try {
        let user = await userService.getPrivacyPolicy();

        res.status(200).send(user);
        
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getFaqList = async (req, res) => {
    try {
        let user = await userService.getFaqList();
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

exports.getMostPurchashedProducts = async (req, res) => {
    try {
        let user = await userService.getMostPurchashedProducts();
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
        let user = await userService.getNotificationList(req.userData);
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

exports.updateAppVersion = async (req, res) => {
    try {
        let user = await userService.updateAppVersion(req.body);
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