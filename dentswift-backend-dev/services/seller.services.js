const { SellerModel } = require("../models/sellerModel");
const { ProductModel } = require("../models/productModel");
const { CategoryModel } = require("../models/categoryModel");
const { SubCategoryModel } = require("../models/subCategoryModel");
const { SubSubCategoryModel } = require("../models/subSubCategoryModel");
const { InventoryModel } = require("../models/inventoryModel");
const { OrderModel } = require("../models/orderModel");
const { CartModel } = require("../models/cartModel");
const { ratingModel } = require("../models/ratingModel");
const { AdminModel } = require("../models/adminModel");
const { SettingModel } = require("../models/settingModel");
const { FaqModel } = require("../models/faqModel");
const { SubscriptionModel } = require("../models/subscriptionModel");
const { PurchasedSubscriptionModel } = require("../models/purchasedSubscriptionModel");
const { ComplaintModel } = require("../models/complaintModel");
const { UserModel } = require("../models/userModel");
const { NotificationModel } = require("../models/notificationModel");
  const moment = require('moment');
  var _ = require('lodash');
  const utils = require("../modules/utils");
  const authentication = require("../middlewares/authentication");
  const config = require("../config/config");
  const { randomStringGenerator, randomreferralCode, sendPushNotification } = require("../modules/utils");
  const mongoose = require('mongoose');
  var _ = require('lodash');
  const generateUniqueId = require('generate-unique-id');
  const { msg } = require("../modules/message");
  // const stripe = require('stripe')('sk_test_51IjUapHzjgKxAWPNJJqHWX2us5t7Sl8ABNQMtGli65vhckODix3nudYK9Fh2HWZUQEEJUqhP3mlGthnI19kbvwoW00YhjcUcYW');
  const stripe = require('stripe')('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');

  const Joi = require('joi');

  let sendOtpDuringRegistration = async (userData) => {
    try {
      let otp = await randomStringGenerator();
      let otpExpTime = new Date(Date.now() + config.defaultOTPExpireTime);
      userData.otp_info = {
        otp: otp,
        expTime: otpExpTime
      }
      let mobileNumber = userData.country_code + userData.mobile_number;
      //Send message via Twillio
      let send = await utils.sendotp(userData.otp_info.otp, mobileNumber);
      return {
        status: 1,
        message: "OTP send successfully",
        data: userData
      };
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  exports.signupSeller = async (req) => {
  
    try {
      let data = req.body;
      if (!data.email || data.email == '')
        return {
          status: 0,
          message: "Please enter the email address"
        };
  
      if (!data.mobile_number || data.mobile_number == '') {
        return {
          status: 0,
          message: "Please enter the mobile number"
        }
      }

      if (!data.country_code || data.country_code == '') {
        return {
          status: 0,
          message: "Please enter the country code"
        }
      }

      if (!data.password || data.password == '') {
        return {
          status: 0,
          message: "Please enter the password"
        }
      }
  
      data.user_type = 2; //Note: user_status 1 for admin, 2 for seller, 3 for user
      data.mobile_number = data.mobile_number;
      data.is_seller_verified = false;
      let password = await utils.encryptText(data.password);
      if (
        !data.country_code ||
        data.country_code == null ||
        data.country_code == "NA" ||
        data.country_code == undefined
      )
        return {
          status: 0,
          message: msg.mobileNumAndCountryCodeRequire
        };
      //check if given number is already exist
        let isMobileExist = await SellerModel.findOne({
            $or: [{
                mobile_number: data.mobile_number
            }, {
                email: { $regex: new RegExp("^" + data.email.toLowerCase(), "i") }
            }]
        }).lean();
        if (isMobileExist) {
            if (isMobileExist.mobile_number == data.mobile_number)
            return {
                status: 0,
                message: msg.mobileAlreadyExist
            };
            if (isMobileExist.email.toLowerCase()  == data.email.toLowerCase() )
            return {
                status: 0,
                message: "Provided email id is already registered with us"
            };
        }
        /**
         * if Seller is registered without errors
         * create a token
         */
        let dataToSave = {
          full_name: data.full_name,
          country_code: data.country_code,
          mobile_number: data.mobile_number,
          email: data.email,
          password: password,
          device_type: data.device_type,
          device_token: data.device_token,
          date_joined: new Date().getTime()
        }
        let res = new SellerModel(Object.assign({}, dataToSave));
        let result = await res.save();
        if (result) {
          let sendOtp = await sendOtpDuringRegistration(result);
          if (sendOtp.status == -1) {
            return {
              status: -1,
              message: sendOtp.message
            };
          } else {
            return {
              status: 1,
              data: sendOtp.data
            };
          }
        } else {
          return {
            status: -1,
            message: 'Something went wrong, please try again later'
          };
        }
    } catch (error) {
      throw new Error(error.message);
    }
};

exports.saveToken = async (data, days) => {
    try {
        data.token = authentication.generateToken(days);
        let userData = await SellerModel.findOneAndUpdate({ mobile_number: data.mobile_number },{ $set: data }, { new :true }).lean();
        // let userData = await data.save();
        if (!userData) {
            return {
            status: -1,
            message: "Something went wrong"
            };
        } else {
            return {
            status: 1,
            data: Object.assign({}, JSON.parse(JSON.stringify(userData))),
            message: "Seller found"
            };
        }
    } catch (error) {
      throw new Error(error.message);
    }
};


exports.forgotPassword = async (data) => {
  try {
    // if (!data.email || data.email == '')
    //   throw new Error("Please enter the email");

    // let seller = await SellerModel.findOne({ email: data.email }).exec();
    // if (!seller) {
    //   return { status: -1, message: "Email not exist" };
    // }

    let seller;
    if(data.email){
      seller = await SellerModel.findOne({ email: data.email }).exec();
    }
      if(!seller){
        seller = await SellerModel.findOne({
          $and: [{
            country_code: data.country_code
          }, {
            mobile_number: data.mobile_number  
          }]
        }).exec();
      }
    if (!seller) {
      return { status: 0, message: "Email or mobile number does not exist" };
    }

    let tokenForLinkValidation = authentication.generateToken('2 days');
    // seller.link_token = tokenForLinkValidation;
    // let saveseller = await seller.save();

    let baseUrl =   `${config.HOST}/reset-password/`;
    let url = baseUrl + tokenForLinkValidation;
    let subject = "Forgot Password Email";
    let html =
      "<p>Hey! welcome  please Click " +
      ` <a href=${url}>here</a>` +
      " to change your password.</p>";
    let sendData = {
      toEmail: data.email,
      subject: subject,
      html: html,
    };
    // console.log(sendData);
    // await sendEmailUsingSendgrid(sendData);

    //Code to send otp on mobile no and email
    // let sendOtp = await sendOtpDuringRegistration(user);
    // if (sendOtp.status == -1) {
    //   return {
    //     status: -1,
    //     message: sendOtp.message
    //   };
    // } else {}
    return { status: 1, message: "4 digit OTP will be sent to your registered mobile number and email	address successfully", data: seller  }

  } catch (error) {
    throw new Error(error.message);
  }
};

exports.resetPassword = async (data, userData) => {
  try {
   
    if (!data.newPassword || data.newPassword == '')
      return { status: 0, message: "New password not be blank" };

    let seller = await SellerModel.findOne({ email: userData.email  });
    if (!seller || seller == null) {
      return { status: 0, message: "Seller does not exist" };
    }

    if (userData.is_seller_verified == false) {
      return { status: 0, message: "OTP is not verified, please verify to proceed with reset password" };
    }

    // if (data.confirmNewPassword === data.newPassword) {
      var password = await utils.encryptText(data.newPassword);
      seller.password = password;
      // seller.link_token = '' //remove
      let saveseller = seller.save();
      if (!saveseller) {
        return { status: 0, message: "Something went wrong" };
      }
      return { status: 1, message: "Password reset successfully" };
    // } else {
    //   throw { message: msg.fieldNotMatch };
    // }

  } catch (error) {
    throw new Error(error.message);
  }
};

exports.loginSeller = async (req) => {
    try {
        let data = req.body;
        let userData;

        if ((!data.mobile_number || data.mobile_number == '') && (!data.email || data.email == '')) {
            return {
                status: 0,
                message: "Please enter the valid mobile number or email"
            };
        } else if (!data.password || data.password == '') {
          return {
              status: 0,
              message: "Please enter the password"
          };
        }else {
            userData = await SellerModel.findOne({
              $or: [{
                  mobile_number: data.mobile_number
              }, {
                  email: { $regex: new RegExp("^" + data.email.toLowerCase(), "i") }
              }]
            });
        }
        if (userData) {
            // let sendOtp = await sendOtpDuringRegistration(userData);
            // if (sendOtp.status == -1) {
            //     return {
            //         status: -1,
            //         message: sendOtp.message
            //     };
            // } else {
            //     let user = sendOtp.data;
                if (userData.status === 0) {
                  return {
                    status: 0,
                    message: "Your profile is not approved by admin"
                  };
                }
                if (userData.status === 2) {
                  return {
                    status: 0,
                    message: "Your profile has been rejected by admin"
                  };
                }
                if (userData.is_blocked === 1) {
                  return {
                    status: 0,
                    message: "You are blocked by admin"
                  };
                }

                if (userData.is_active == false) {
                  return {
                    status: 0,
                    message: "Your account has been deleted"
                  };
                }
                let check = await utils.compare(data.password, userData.password);
                if (!check) {
                  return {
                    status: 0,
                    message: msg.invalidPass
                  };
                }
                let user = userData;
                let saveUser = await user.save();
                if (!saveUser) {
                    return {
                        status: -1,
                        // message: sendOtp.message
                        message: "Something sent wrong"
                    };
                }
                if (data.device_type && data.device_type !== '') {
                    userData.device_type = data.device_type;
                    userData.device_token = data.device_token;
                }
                return {
                    status: 1,
                    data: userData,
                    message: "Seller found"
                };
            // }  
        } else {
            return {
            status: 0,
            message: "Seller does not exist"
            };
        }
    } catch (error) {
      throw new Error(error.message);
    }  
};

exports.resendOtp = async (data) => {
    try {
  
      let sendOtp = await sendOtpDuringRegistration(data);
      if (sendOtp.status == -1) {
        return {
          status: 0,
          message: sendOtp.message
        };
      } else {
        let user = sendOtp.data;
        let saveUser = await user.save();
        if (!saveUser) {
          return {
            status: 0,
            message: sendOtp.message
          };
        }
        return {
          status: 1,
          data: saveUser,
          message: "OTP send successfully"
        };
      }
  
    } catch (err) {
      throw new Error(err.message);
    }  
};

exports.verifyOtp = async (data, user) => {
    try {
      let otp = user.otp_info.otp;
      // if (otp != data.otp_value && data.otp_value !== '1234') {
      if (otp != data.otp_value) {
        return {
          status: 0,
          message: "OTP not match"
        };
      }
      let otpExpTime = user.otp_info.expTime;
      let currentTime = new Date(Date.now());
      // if (data.otp_value !== '1234') {
        if (currentTime > otpExpTime) {
          return {
            status: -1,
            message: "Otp has been Expired"
          };
        }
      // }
      user.is_seller_verified = true;
      user.otp_info = {
        otp: null,
        expTime: Date.now()
      };
      let userData = await user.save();
      if (!userData) {
        return {
          status: -1,
          message: "Something went wrong please try after sometime"
        }
      }
      return {
        status: 1,
        message: "OTP verified successfully"
      };
    } catch (error) {
      throw new Error(error.message);
    }
};

exports.profileDetails = async (data, user) => {
  try {
    let { first_name, last_name, country_code, mobile_number,landline_no, email,authorized_signatory_email, store_name, store_business_type, 
      store_commercial_name, store_address,store_city, store_country, store_trading_license, store_signatory_id, store_signatory_number,
      iban_certificate ,account_number,account_holder_name,bank_name,swift_code, selected_plan  } = data;
        
    if (!first_name || first_name == '')
      return { status: 0, message: "First name is required" };
    if (!country_code || country_code == '')
      return { status: 0, message: "Country code is required" };
    if (!mobile_number || mobile_number == '')
      return { status: 0, message: "Mobile number is required" };
    if (!email || email == '')
      return { status: 0, message: "Email is required" };
    if (!authorized_signatory_email || authorized_signatory_email == '')
      return { status: 0, message: "Authorized signatory email is required" };
    if (!store_name || store_name == '')
      return { status: 0, message: "Store name is required" };
    if (!store_business_type || store_business_type == '')
      return { status: 0, message: "Store business type is required" };
    if (!store_commercial_name || store_commercial_name == '')
      return { status: 0, message: "Store commercial name is required" };
    if (!store_address || store_address == '')
      return { status: 0, message: "Store address is required" };
    if (!store_city || store_city == '')
      return { status: 0, message: "Store city is required" };
    if (!store_country || store_country == '')
      return { status: 0, message: "Store country is required" };
    if (!store_trading_license || store_trading_license == '')
      return { status: 0, message: "Store trading license is required" };
    if (!store_signatory_id || store_signatory_id == '')
      return { status: 0, message: "Store signatory id is required" };
    // if (!store_signatory_number || store_signatory_number == '')
    //   return { status: 0, message: "Store signatory number is required" };
    // if (!iban_certificate || iban_certificate == '')
    //   return { status: 0, message: "IBAN certificate is required" };
    if (!account_number || account_number == '')
      return { status: 0, message: "Account number is required" }; 
    if (!account_holder_name || account_holder_name == '')
      return { status: 0, message: "Account holder name is required" };
    if (!bank_name || bank_name == '')
      return { status: 0, message: "Bank name is required" };
    if (!swift_code || swift_code == '')
      return { status: 0, message: "Swift code is required" };
    if (!selected_plan || selected_plan == '')
      return { status: 0, message: "Please select the plan" };

    if (user.is_seller_verified == false) {
      return { status: 0, message: "OTP is not verified, please verify to proceed with reset password" };
    }

    // password = await utils.encryptText(password);

    let profileData = {
      first_name,
      last_name,
      country_code,
      mobile_number,
      landline_no,
      email,
      authorized_signatory_email,
      store_name,
      store_business_type,
      store_commercial_name,
      store_address,
      store_city,
      store_country,
      store_trading_license,
      store_signatory_id,
      store_signatory_number,
      bank_details: [{
        iban_certificate,
        account_number,
        account_holder_name,
        bank_name,
        swift_code
      }],
      selected_plan,
      is_bank_created: true
    }
    
    let updateProfile = await SellerModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(user._id)}, profileData, { new: true });
    if (!updateProfile) {
      return {
        status: -1,
        message: "Something went wrong please try after sometime"
      }
    }
    return { status: 1, message: "Profile updated successfully", data: updateProfile };
    
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.uploadFile = async (data, user) => {
  try {
    let { upload_seller_file } = data;
    if (!upload_seller_file || upload_seller_file == '')
      return { status: 0, message: "File is required" };

    return { status: 1, message: "File uploaded successfully", data: upload_seller_file };
    
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getSellerData = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("unsufficient Parameters"); }
    let seller = await SellerModel.findById(mongoose.Types.ObjectId(data._id));
    if (!seller) {
      return { status: 0, message: "Something went Wrong,Please try later." };
    }
    return { status: 1, message: "Seller data fetched successfully", data: seller };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.sendEmailVerification = async (sellerData) => {
  try {
    let seller;
      seller = await SellerModel.findOne({ email: sellerData.email }).exec();
     
    if (!seller) {
      return { status: 0, message: "Seller does not exist" };
    }

    let tokenForLinkValidation = authentication.generateToken('2 days');
    seller.link_token = tokenForLinkValidation;
    // let saveseller = await seller.save();

    let baseUrl =   `${config.HOST}/email-verification/`;
    let url = baseUrl + tokenForLinkValidation;
    let subject = "Forgot Password Email";
    let html =
      "<p>Hey! welcome  please Click " +
      ` <a href=${url}>here</a>` +
      " to change your password.</p>";
    let sendData = {
      toEmail: seller.email,
      subject: subject,
      html: html,
    };
    // console.log(sendData);
    // await sendEmailUsingSendgrid(sendData);

    return { status: 1, message: "Email verification link has been sent on your email address" }

  } catch (error) {
    throw new Error(error.message);
  }
};

exports.logout = async (user) => {
  let userId = user._id
  if (!user || user == null) throw { message: msg.userNotExist };

  let updateSeller = await SellerModel.findOneAndUpdate({ _id: userId }, { $set: { token: '' } }, { new: true });
  if (!updateSeller) {
    return { status: -1, message: "Something went Wrong" };
  }
  return { status: 1, message: "Logout suggessfully" };
};

exports.addProduct = async (seller, data) => {
  try {
    let { product_name, product_description, product_image, product_currency,
      product_price, product_category, sub_category, sub_subcategory, offer_applicable, 
      product_expiry_date, return_replacement_applicable, maxm_replacement_days, maxm_return_days,
      product_identification, brand_name, manufacturing_company, temp_control, delivery_in_days,
      stock_available } = data;
      
    if (!product_name || product_name == '')
      return { status: 0, message: "Product name is required" };
    if (!product_description || product_description == '')
      return { status: 0, message: "Product description is required" };
    if (!product_image || product_image.length == 0)
      return { status: 0, message: "Product image is required" };
    if (!product_currency || product_currency == '')
      return { status: 0, message: "Product currency is required" };
    if (!product_price || product_price == '')
      return { status: 0, message: "Product price is required" };
    if (!product_category || product_category == '')
      return { status: 0, message: "Product category is required" };
    if (!sub_category || sub_category == '')
      return { status: 0, message: "Product subcategory is required" };
    if (!sub_subcategory || sub_subcategory == '')
      return { status: 0, message: "Product sub subcategory is required" };
    if (!offer_applicable || offer_applicable == '')
      return { status: 0, message: "Offer applicable is required" };
    if (!product_expiry_date || product_expiry_date == '')
      return { status: 0, message: "Product expiry date is required" };
    if (!return_replacement_applicable || return_replacement_applicable == '')
      return { status: 0, message: "Return replacement applicable is required" };
    if (!maxm_replacement_days || maxm_replacement_days == '')
      return { status: 0, message: "Maxm replacement days is required" };
    if (!maxm_return_days || maxm_return_days == '')
      return { status: 0, message: "Maxm return days is required" };
    if (!product_identification || product_identification == '')
      return { status: 0, message: "Product identification is required" };
    if (!brand_name || brand_name == '')
      return { status: 0, message: "Brand name is required" };
    if (!manufacturing_company || manufacturing_company == '')
      return { status: 0, message: "Manufacturing company is required" };
    if (!temp_control || temp_control == '')
      return { status: 0, message: "Temperature control is is required" };
    if (!delivery_in_days || delivery_in_days == '')
      return { status: 0, message: "Delivery days is required" };
    if (!stock_available || stock_available == '')
      return { status: 0, message: "No of product units available is required" };

    let product = await ProductModel.findOne({ product_name: product_name, is_active: true });
    if(product){
      return { status: 0, message: "Product already exist" };
    }
    let productData = {
      seller_id: seller._id,
      product_name,
      product_description,
      product_currency,
      product_price,
      product_category,
      sub_category,
      sub_subcategory,
      offer_applicable,
      product_expiry_date,
      return_replacement_applicable,
      maxm_replacement_days,
      maxm_return_days,
      product_identification,
      brand_name,
      manufacturing_company,
      temp_control,
      delivery_in_days,
      stock_available
    }
    
    if(typeof (product_image) == "string") {
      JSON.parse(product_image)
    }
    let price_after_offer = product_price;
    let discountAmount = 0;
    if(offer_applicable > 0 && product_price > 0){
      discountAmount =  ((offer_applicable * product_price) / 100);
      price_after_offer = price_after_offer - discountAmount;
    }
    productData['product_image']=  product_image
    productData['price_after_offer']=  price_after_offer
    // productData['product_image']=  [{ image: product_image, main_image: false }]

    let res = new ProductModel(Object.assign({}, productData));
    let saveProduct = await res.save();

    if (!saveProduct) {
      return {
        status: -1,
        message: "Something went wrong please try after sometime"
      }
    }

    return { status: 1, message: "Product added successfully", data: saveProduct };
    
  } catch (error) {
    throw new Error(error.message);
  }
}

exports.editProduct = async (seller, data) => {
  try {
    let { product_name, product_description, product_image, product_currency,
      product_price, product_category, sub_category, sub_subcategory, offer_applicable, 
      product_expiry_date, return_replacement_applicable, maxm_replacement_days, maxm_return_days,
      product_identification, brand_name, manufacturing_company, temp_control, delivery_in_days, stock_available } = data;
    
    if (!data._id || data._id == '')
      return { status: 0, message: "Insufficient parameter, product id is required" };
    if (!product_name || product_name == '')
      return { status: 0, message: "Product name is required" };
    if (!product_description || product_description == '')
      return { status: 0, message: "Product description is required" };
    if (!product_image || product_image.length == 0)
      return { status: 0, message: "Product image is required" };
    if (!product_currency || product_currency == '')
      return { status: 0, message: "Product currency is required" };
    if (!product_price || product_price == '')
      return { status: 0, message: "Product price is required" };
    if (!product_category || product_category == '')
      return { status: 0, message: "Product category is required" };
    if (!sub_category || sub_category == '')
      return { status: 0, message: "Product subcategory is required" };
    if (!sub_subcategory || sub_subcategory == '')
      return { status: 0, message: "Product sub subcategory is required" };
    if (!offer_applicable || offer_applicable < 0)
      return { status: 0, message: "Offer applicable is required" };
    if (!product_expiry_date || product_expiry_date == '')
      return { status: 0, message: "Product expiry date is required" };
    if (!return_replacement_applicable || return_replacement_applicable == '')
      return { status: 0, message: "Return replacement applicable is required" };
    if (!maxm_replacement_days || maxm_replacement_days == '')
      return { status: 0, message: "Maxm replacement days is required" };
    if (!maxm_return_days || maxm_return_days == '')
      return { status: 0, message: "Maxm return days is required" };
    if (!product_identification || product_identification == '')
      return { status: 0, message: "Product identification is required" };
    if (!brand_name || brand_name == '')
      return { status: 0, message: "Brand name is required" };
    if (!manufacturing_company || manufacturing_company == '')
      return { status: 0, message: "Manufacturing company is required" };
    if (!temp_control || temp_control == '')
      return { status: 0, message: "Temperature control is is required" };
    if (!delivery_in_days || delivery_in_days == '')
      return { status: 0, message: "Delivery days is required" };
    if (!stock_available || stock_available == '')
      return { status: 0, message: "No of product units available is required" };

    let product = await ProductModel.findOne({ _id: mongoose.Types.ObjectId(data._id), is_active: true });
    if(!product){
      return { status: 0, message: "Product does not exist" };
    }
    let dataToUpdate = {
      seller_id: seller._id,
      product_name,
      product_description,
      product_currency,
      product_price,
      product_category,
      sub_category,
      sub_subcategory,
      offer_applicable,
      product_expiry_date,
      return_replacement_applicable,
      maxm_replacement_days,
      maxm_return_days,
      product_identification,
      brand_name,
      manufacturing_company,
      temp_control,
      delivery_in_days,
      stock_available
    }
    if(typeof (product_image) == "string") {
      JSON.parse(product_image)
    }
    let price_after_offer = product_price;
    let discountAmount = 0;
    if(offer_applicable > 0 && product_price > 0){
      discountAmount =  ((offer_applicable * product_price) / 100);
      price_after_offer = price_after_offer - discountAmount;
    }
    dataToUpdate['price_after_offer']=  price_after_offer
    dataToUpdate['product_image']=  product_image

    let updateProduct = await ProductModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data._id)}, dataToUpdate, { new: true } );
    if (!updateProduct) {
      return { status: 0, message: "something went wrong try after sometime" };
    }

    return { status: 1, message: "Product updated successfully", data: updateProduct };
    
  } catch (error) {
    throw new Error(error.message);
  }
}

exports.getAllProducts = async (seller) => {
  try {
    if (!seller._id || seller._id == '')
      return { status: 0, message: "Seller does not exist" };

    let products = await ProductModel.find({ seller_id: mongoose.Types.ObjectId(seller._id), is_active: true }).populate('seller_id', "first_name last_name")
    .populate('product_category', "category_name").populate('sub_category', "subcategory_name").populate('sub_subcategory', "sub_subcategory_name");
      if (!products) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      
      return { data: products, message: "Products fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteProduct = async (seller, data) => {
  try {
    if (!seller._id || seller._id == '')
      return { status: 0, message: "Seller does not exist" };
    if (!data._id || data._id == '')
      return { status: 0, message: "Product id is required" };

    let product = await ProductModel.findOneAndUpdate({ _id: data._id }, { $set: { is_active: false } }, { new: true })
      if (!product) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      
      return { message: "Product deleted successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.viewProduct = async (seller, data) => {
  try {
    if (!seller._id || seller._id == '')
      return { status: 0, message: "Seller does not exist" };
    if (!data._id || data._id == '')
      return { status: 0, message: "Product id is required" };

    let product = await ProductModel.findOne({ _id: data._id, is_active: true }).populate('seller_id', "first_name last_name")
    .populate('product_category', "category_name").populate('sub_category', "subcategory_name").populate('sub_subcategory', "sub_subcategory_name");
      if (!product) {
        return { status: 0, message: "Product does not exist" };
      }
      
      return { data: product, message: "Product fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.blockProduct = async (seller, data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("unsufficient Parameters"); }
    let product = await ProductModel.findByIdAndUpdate(mongoose.Types.ObjectId(data._id), { is_blocked: data.status }, { new: true });
    if (!product) {
      return { status: -1, message: "Something went Wrong,Please try later." };
    }
    let stat = data.status == "1" ? 'blocked' : 'unblocked';
    return { status: 1, message: `Product ${stat} successfully` };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.searchProduct = async (seller, data) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to search product" };

    let productData;
    if (!data.searchKey || data.searchKey == '') {
      productData = await ProductModel.find({
        seller_id: mongoose.Types.ObjectId(seller._id), is_active: true
      }).populate('seller_id', "first_name last_name")
      .populate('product_category', "category_name").populate('sub_category', "subcategory_name").populate('sub_subcategory', "sub_subcategory_name");
    } else {
      productData = await ProductModel.find({
        $and: [{
          'product_name': {
            $regex: data.searchKey,
            $options: 'i'
          }
        }, {
          is_active: true
        }, {
          is_blocked: 0
        },{
          seller_id: mongoose.Types.ObjectId(seller._id)
        }]
      }).populate('seller_id', "first_name last_name")
      .populate('product_category', "category_name").populate('sub_category', "subcategory_name").populate('sub_subcategory', "sub_subcategory_name");
    }
    return { data: productData, message: "Product list fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.sortProducts = async (seller, data) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to search product" };

    if (!data.sortType || data.sortType == '')
      return { status: 0, message: "Please select product type to sort products" }; 

    let productData;
      productData = await ProductModel.find({
        seller_id: mongoose.Types.ObjectId(seller._id), is_active: true
      }).populate('seller_id', "first_name last_name")
      .populate('product_category', "category_name").populate('sub_category', "subcategory_name").populate('sub_subcategory', "sub_subcategory_name");
      
    if(productData.length > 0){
      if (data.sortType == "asc") {
        productData =  _.orderBy(productData, item => item.product_name, ['asc']);
      } else if (data.sortType == "desc") {
        productData = _.orderBy(productData, item => item.product_name, ['desc']);
      } else {
        productData = productData;
      }
    }

    return { data: productData, message: "Product list sorted successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getCategoryList = async (user) => {
  try {
    let category = await CategoryModel.find({ is_active: true },{ is_active:0, date_created:0 }).lean();
      if (!category) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      
      return { data: category, message: "Category fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getSubCategoryList = async (user, data) => {
  try {
    let subcategory = await SubCategoryModel.find({ category_id: mongoose.Types.ObjectId(data.categoryId), is_active: true },{ is_active:0, date_created:0, category_id:0 }).lean();
      if (!subcategory) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
     
      return { data: subcategory, message: "Sub category fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getSubSubCategoryList = async (user, data) => {
  try {
    let subsubcategory = await SubSubCategoryModel.find({ subcategory_id: mongoose.Types.ObjectId(data.subCategoryId), is_active: true },{ is_active:0, date_created:0, subcategory_id:0 }).lean();
      if (!subsubcategory) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
     
      return { data: subsubcategory, message: "Sub sub category fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.addInventory = async (seller, data) => {
  try {
    let { stock_name, stock_quantity,stock_image, expiry_date, stock_description, product_serial_no, product_category, entry_date, 
      product_name,sub_category,product_expiry_date,sub_subcategory,product_identification,product_quantity,temp_control,
      prod_brand_name,manufacturing_country,product_price,product_price_currency } = data;
      
    if (!stock_name || stock_name == '')
      return { status: 0, message: "Stock name is required" };
    if (!stock_quantity || stock_quantity == '')
      return { status: 0, message: "Stock quantity is required" };
    if (!stock_image || stock_image == '')
      return { status: 0, message: "Stock image is required" };
    if (!expiry_date || expiry_date == '')
      return { status: 0, message: "Expiry date is required" };
    if (!stock_description || stock_description == '')
      return { status: 0, message: "Stock description is required" };
    if (!product_category || product_category == '')
      return { status: 0, message: "Product category is required" };
    if (!entry_date || entry_date == '')
      return { status: 0, message: "Entry date is required" };

    let inventory = await InventoryModel.findOne({ stock_name: stock_name, is_active: true }).lean();
    if(inventory){
      return { status: 0, message: "Inventory already exist" };
    }
    let inventoryData = {
      seller_id: seller._id,
      stock_name,
      stock_quantity,
      product_serial_no,
      product_category,
      stock_image,
      expiry_date,
      stock_description,
      entry_date,
      product_name,
      sub_category,
      product_expiry_date,
      sub_subcategory,
      product_identification,
      product_quantity,
      temp_control,
      prod_brand_name,
      manufacturing_country,
      product_price,
      product_price_currency
    }
 
    let res = new InventoryModel(Object.assign({}, inventoryData));
    let saveInventory = await res.save();

    if (!saveInventory) {
      return {
        status: -1,
        message: "Something went wrong please try after sometime"
      }
    }

    return { status: 1, message: "Inventory added successfully", data: saveInventory };
    
  } catch (error) {
    throw new Error(error.message);
  }
}

exports.editInventory = async (seller, data) => {
  try {
    let { stock_name, stock_quantity,stock_image, expiry_date, stock_description, product_serial_no, product_category, entry_date,
      product_name,sub_category,product_expiry_date,sub_subcategory,product_identification,product_quantity,temp_control,
      prod_brand_name,manufacturing_country,product_price,product_price_currency } = data;
    
    if (!data._id || data._id == '')
      return { status: 0, message: "Stock id is required" };
    if (!stock_name || stock_name == '')
      return { status: 0, message: "Stock name is required" };
    if (!stock_quantity || stock_quantity == '')
      return { status: 0, message: "Stock quantity is required" };
    if (!stock_image || stock_image == '')
      return { status: 0, message: "Stock image is required" };
    if (!expiry_date || expiry_date == '')
      return { status: 0, message: "Expiry date is required" };
    if (!stock_description || stock_description == '')
      return { status: 0, message: "Stock description is required" };
    if (!product_category || product_category == '')
      return { status: 0, message: "Product category is required" };
    if (!entry_date || entry_date == '')
      return { status: 0, message: "Entry date is required" };

      let inventory = await InventoryModel.findOne({ _id: mongoose.Types.ObjectId(data._id), is_active: true }).lean();
      if(!inventory){
        return { status: 0, message: "Inventory does not exist" };
      }

      let dataToUpdate = {
        seller_id: seller._id,
        stock_name,
        stock_quantity,
        stock_image,
        expiry_date,
        stock_description,
        product_serial_no,
        product_category,
        entry_date,
        product_name,
        sub_category,
        product_expiry_date,
        sub_subcategory,
        product_identification,
        product_quantity,
        temp_control,
        prod_brand_name,
        manufacturing_country,
        product_price,
        product_price_currency
      }

    let updateInventory = await InventoryModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data._id)}, dataToUpdate, { new: true } );
    if (!updateInventory) {
      return { status: 0, message: "something went wrong try after sometime" };
    }

    return { status: 1, message: "Inventory updated successfully", data: updateInventory };
    
  } catch (error) {
    throw new Error(error.message);
  }
}

exports.getInventoryDetails = async (data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "Inventory id is required" };

    let inventory = await InventoryModel.findOne({ _id: mongoose.Types.ObjectId(data._id), is_active: true }).lean();
      if (!inventory) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
     
      return { data: inventory, message: "Inventory fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getInventoryList = async (seller) => {
  try {
    if (!seller._id || seller._id == '')
      return { status: 0, message: "Login first to get inventory list" };

    let inventories = await InventoryModel.find({ seller_id: mongoose.Types.ObjectId(seller._id), is_active: true }).lean();
      if (!inventories) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
     
      return { data: inventories, message: "Inventory list fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteInventory = async (seller, data) => {
  try {
    if (!seller._id || seller._id == '')
      return { status: 0, message: "Seller does not exist" };
    if (!data._id || data._id == '')
      return { status: 0, message: "Inventory id is required" };

    let inventory = await InventoryModel.findOneAndUpdate({ _id: data._id }, { $set: { is_active: false } }, { new: true })
      if (!inventory) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      
      return { message: "Inventory deleted successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.changeStockQuantity = async (seller, data) => {
  try {
    if (!data.id || data.id == '') {
      return {
        status: -1,
        message: "Unsufficient perameter"
      };
    }


    let inventory = await InventoryModel.findOne({
      _id: mongoose.Types.ObjectId(data.id), is_active: true
    });
    if (!inventory) {
      return {
        status: 0,
        message: "Inventory does not exist"
      }
    }

    if (data.status == 0) {
      if (inventory.stock_quantity == 1) {
        inventory.stock_quantity = 0;
        inventory.modified_at = Date.now();
        let inventoryData = await inventory.save();
        if (!inventoryData) {
          return {
            status: 0,
            message: "Something went wrong, please try later"
          }
        }
        return {
          status: 1,
          message: "Stock updated successfully"
        };
      } else if(inventory.stock_quantity == 0){
        return {
          status: 1,
          message: "Item not in stock"
        };
      }else {
        inventory.stock_quantity = inventory.stock_quantity - 1;
        inventory.modified_at = Date.now();
        let inventoryData = await inventory.save();
        if (!inventoryData) {
          return {
            status: -1,
            message: "Something went wrong, Please try later"
          }
        }
        return {
          status: 1,
          message: "Stock updated successfully"
        };
      }
    } else {
      inventory.stock_quantity = inventory.stock_quantity + 1;
      inventory.modified_at = Date.now();
      let inventoryData = await inventory.save();
      if (!inventoryData) {
        return {
          status: -1,
          message: "Something went wrong, please try later"
        }
      }
      return {
        status: 1,
        message: "Stock updated successfully"
      };
    }

  } catch (err) {
    throw new Error(err.message);
  }
};

exports.searchStock = async (seller, data) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to search stock" };

    let inventoryData = [];
    if (!data.searchKey || data.searchKey == '') {
      inventoryData = await InventoryModel.find({
        seller_id: mongoose.Types.ObjectId(seller._id), is_active: true
      });
    } else {
      inventoryData = await InventoryModel.find({
        $and: [{
          'stock_name': {
            $regex: data.searchKey,
            $options: 'i'
          }
        }, {
          is_active: true
        },{
          seller_id: mongoose.Types.ObjectId(seller._id)
        }]
      });
    }
    return { data: inventoryData, message: "Inventory list fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.sortStockList = async (seller, data) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to sort stock" };

    if (!data.sortType || data.sortType == '')
      return { status: 0, message: "Please select sort type" }; 

    let stockData = [];
      stockData = await InventoryModel.find({
        seller_id: mongoose.Types.ObjectId(seller._id), is_active: true
      });
      
    if(stockData.length > 0){
      if (data.sortType == "asc") {
        stockData =  _.orderBy(stockData, item => item.stock_name, ['asc']);
      } else if (data.sortType == "desc") {
        stockData = _.orderBy(stockData, item => item.stock_name, ['desc']);
      } else {
        stockData = stockData;
      }
    }

    return { data: stockData, message: "Stock list sorted successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getNewOrderList = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get new order list" };

    let newOrderList = await CartModel.find({ seller_id: mongoose.Types.ObjectId(seller._id), is_deleted: false ,status: 3 },{ order_id: 1, unit_price: 1, quantity: 1 }).populate('order_id').lean();
    // let cartIds = _.map(newOrderList, (doc) => doc._id);
    // let cartIds = _.map(newOrderList, (doc) => doc.order_id);
    // let orderList = [];
    // let orderList = await OrderModel.find({ 'cart_id': {'$in': cartIds } ,status: 1 }).lean();
    // if(cartIds.length > 0){
    //   orderList = await OrderModel.find({ '_id': {'$in': cartIds } ,status: 1 }).lean();
    // }
    //   let query = [{
  //     $match: { status: 1 }
  //   }, {
  //     $lookup: {
  //       from: 'cart',
  //       localField: 'cart_id',
  //       foreignField: '_id',
  //       as: 'order'
  //     }
  //   }, {
  //     $unwind: {
  //       path: '$order',
  //       preserveNullAndEmptyArrays: true
  //     }
  //   }
  // ]
  //   var newOrderList = await OrderModel.aggregate(query);


    return { data: newOrderList, message: "New order list fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getOrderDetails = async (seller, data) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get new order details" };
    if (!data._id || data._id == '')
      return { status: 0, message: "Order id is required" };

    let orderDetails = await OrderModel.findOne({ _id: mongoose.Types.ObjectId(data._id) })
    .populate('user_id','first_name last_name email country_code mobile_number profile_pic')
    .populate('address_id', 'building_number flat_number street_number country state city zip_code')
    .populate('coupon_id', 'name').lean();
    if(!orderDetails){
      return {
        status: 0,
        message: "Unable to fetch order details"
      }
    }

    let sellerDetails = {
      country_code: seller.country_code,
      mobile_number: seller.mobile_number,
      first_name: seller.first_name,
      last_name: seller.last_name,
      store_name: seller.store_name,
      store_address: seller.store_address,
      store_city: seller.store_city,
      store_country: seller.store_country,
      store_commercial_name: seller.store_commercial_name
    }

    let cartDetails = [];
    cartDetails = await CartModel.find({ seller_id: mongoose.Types.ObjectId(seller._id), order_id: mongoose.Types.ObjectId(data._id) }, { currency: 1, price: 1, quantity: 1, unit_price: 1,order_id: 1 })
    .populate('product_id', 'product_name product_image').lean();
    
    orderDetails['cartProducts'] = cartDetails;
    orderDetails['sellerDetails'] = sellerDetails;

    return { data: orderDetails, message: "Order detail fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.cancelOrder = async (seller, data) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get new order details" };
    if (!data.order_id || data.order_id == '')
      return { status: 0, message: "Order id is required" };
    if (!data.cart_id || data.cart_id == '')
      return { status: 0, message: "cart id is required" };
    
    let orderDetails = await OrderModel.findOne({ _id: mongoose.Types.ObjectId(data.order_id) }).lean();
    if(!orderDetails){
      return { status: 0, message: "Order does not exist" };
    }

    let dataToUpdate =  {
      status: 10, 
      reason: (data.reason ? data.reason : '')
    }
    let updateCart = await CartModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data.cart_id) }, dataToUpdate ,{new: true});
      if (!updateCart) {
        return {
          status: 0,
          message: "Unable to update cart"
        }
      }

    let updateOrder =  {
      status: 8, 
      reason: (data.reason ? data.reason : '')
    }
    let update = await OrderModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data.order_id) }, { $set: updateOrder }, { new: true });
        if (!update) {
          return {
            status: 0,
            message: "Unable to update order"
          }
        }

    let userId = orderDetails.user_id; 
    let user = await UserModel.findOne({ _id: mongoose.Types.ObjectId(userId) }, { _id: 1, device_type: 1, device_token: 1 }).lean();

     /* Code for notification start to User */
     let title = "Order Cancelled";
     let Notificationbody = "Your order with orderId " + orderDetails.order_id + " has been cancelled";
     let device_type = user.device_type;
     let notification = {
       user_id: user._id,
       title: title,
       body: Notificationbody,
       type: 0,
       created_at: Date.now()
     }
     
     let sendNotification = await NotificationModel.create(notification);
     sendNotification.save();
     
     let payload = {
         title: title,
         body: Notificationbody,
         noti_type: 1
     }
     let notify = {
      title: title,
      body: Notificationbody,
      "color": "#f95b2c",
      "sound": true
    }
     if(user.device_token){
       utils.sendPushNotification(user.device_token, device_type, payload, notify);
     }

      /* Code for notification start to Admin */
      let admin = await AdminModel.findOne({}, { email: 1, _id: 1 });
      let adminTitle = "Order Cancelled";
      let NotiBody = "Order with orderId " + orderDetails.order_id + " has been cancelled by " + seller.full_name;
    
      let adminNotification = {
        user_id: admin._id,
        title: adminTitle,
        body: NotiBody,
        type: 2,
        created_at: Date.now()
      }
      let send_noti = await NotificationModel.create(adminNotification);
      send_noti.save();

     /* Code for notification end */

    return { message: "Order cancelled successfully", status: 1 };
    
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updateOrderStatus = async (seller, data) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get new order details" };
    if (!data.order_id || data.order_id == '')
      return { status: 0, message: "Order id is required" };
    if (!data.order_status || data.order_status == '')
      return { status: 0, message: "Order status is required" };
    
    let orderDetails = await OrderModel.findOne({ _id: mongoose.Types.ObjectId(data.order_id) }).lean();
    if(!orderDetails){
      return { status: 0, message: "Order does not exist" };
    }

    let dataToUpdate =  {
      status: (parseInt(data.order_status) + 2), 
      modified_at: Date.now()
    }

    let updateCart = await CartModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(orderDetails.cart_id) }, dataToUpdate ,{new: true});
      if (!updateCart) {
        return {
          status: 0,
          message: "Unable to update cart"
        }
      }
      
    let updateOrder;
    if(data.order_status == '1' || data.order_status == 1) {
      updateOrder =  {
        status: (parseInt(data.order_status)), 
        modified_at: Date.now()
      }
    }else if(data.order_status == '2' || data.order_status == 2){
      updateOrder =  {
        status: (parseInt(data.order_status)), 
        intransit_on: Date.now(),
        modified_at: Date.now()
      }
    }else if(data.order_status == '3' || data.order_status == 3){
      updateOrder =  {
        status: (parseInt(data.order_status)), 
        dispatch_on: Date.now(),
        modified_at: Date.now()
      }
    }else if(data.order_status == '4' || data.order_status == 4){
      updateOrder =  {
        status: (parseInt(data.order_status)), 
        shipping_on: Date.now(),
        modified_at: Date.now()
      }
    }else if(data.order_status == '5' || data.order_status == 5){
      updateOrder =  {
        status: (parseInt(data.order_status)), 
        arriving_on: Date.now(),
        modified_at: Date.now()
      }
    }else if(data.order_status == '6' || data.order_status == 6){
      updateOrder =  {
        status: (parseInt(data.order_status)), 
        out_for_delivery_on: Date.now(),
        modified_at: Date.now()
      }
    }else if(data.order_status == '7' || data.order_status == 7){
      updateOrder =  {
        status: (parseInt(data.order_status)), 
        delivered_on: Date.now(),
        modified_at: Date.now()
      }
    }else if(data.order_status == '8' || data.order_status == 8){
      updateOrder =  {
        status: (parseInt(data.order_status)), 
        cancelled_on: Date.now(),
        modified_at: Date.now()
      }
    }else{
      updateOrder =  {
        status: (parseInt(data.order_status)), 
        modified_at: Date.now()
      }
    }
   
    let update = await OrderModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data.order_id) }, { $set: updateOrder }, { new: true });
        if (!update) {
          return {
            status: 0,
            message: "Unable to update order"
          }
        }

    let userId = orderDetails.user_id; 
    let user = await UserModel.findOne({ _id: mongoose.Types.ObjectId(userId) }, { _id: 1, device_type: 1, device_token: 1 }).lean();
    let orderStatus = utils.getOrderStatus(parseInt(data.order_status));
     /* Code for notification start to User */
     let title = "Order Status Updated";
     let Notificationbody = "Your order with orderId " + orderDetails.order_id + " has been updated. Order Status:- " + orderStatus + "";
     let device_type = user.device_type;
     let notification = {
       user_id: user._id,
       title: title,
       body: Notificationbody,
       type: 0,
       created_at: Date.now()
     }
     let sendNotification = await NotificationModel.create(notification);
     sendNotification.save();
     
     let payload = {
         title: title,
         body: Notificationbody,
         noti_type: 1
     }
     let notify = {
      title: title,
      body: Notificationbody,
      "color": "#f95b2c",
      "sound": true
    }
     if(user.device_token){
       utils.sendPushNotification(user.device_token, device_type, payload, notify);
     }

      /* Code for notification start to Admin */
      let admin = await AdminModel.findOne({}, { email: 1, _id: 1 });
      let adminTitle = "Order Status Updated";
      let NotiBody = "Order with orderId " + orderDetails.order_id + " has been updated by " + seller.full_name + ". Order Status:- " + orderStatus + "";
    
      let adminNotification = {
        user_id: admin._id,
        title: adminTitle,
        body: NotiBody,
        type: 2,
        created_at: Date.now()
      }
      let send_noti = await NotificationModel.create(adminNotification);
      send_noti.save();

     /* Code for notification end */

    return { message: "Order updated successfully", status: 1 };
    
  } catch (err) {
    throw new Error(err.message);
  }
};


exports.getOngoingOrderList = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get new order list" };

    let ongoingOrderList = await CartModel.find({ seller_id: mongoose.Types.ObjectId(seller._id), is_deleted: false, $or: [{status: 4}, {status: 5}, {status: 6}, {status: 7}, {status: 8}] },{ order_id: 1, unit_price: 1, quantity: 1 }).populate('order_id').lean();
    let dataToSend = {
      ongoingOrderList: ongoingOrderList
    }
    return { data: dataToSend, message: "Ongoing order list fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.pastOrderList = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get new order list" };

    let pastOrderList = await CartModel.find({ seller_id: mongoose.Types.ObjectId(seller._id) ,is_deleted: false , $or: [{status: 9}, {status: 10}] },{ order_id: 1, unit_price: 1, quantity: 1 }).populate('order_id').lean();
    let dataToSend = {
      pastOrderList: pastOrderList
    }
    return { data: dataToSend, message: "Past order list fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getSellerDetails = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to view details" };

    // let products = await ProductModel.find({ seller_id: mongoose.Types.ObjectId(seller._id) }).select('_id').lean();
    // var totalRating = 0;
    // var avgRating = 0;
    // var totalRatingCount = 0;
    // if(products.length > 0){
    //   for(let i=0; i < products.length; i++){
    //     let ratings = await ratingModel.find({ product_id: mongoose.Types.ObjectId(products[i]._id) }).select('rating_point').lean();
    //     if((ratings || []).length > 0){
    //       for(let j=0; j < ratings.length; j++){
    //         totalRatingCount++;
    //         var element = ratings[j]
    //         totalRating = totalRating + element.rating_point
    //       }
    //     }
    //   }
    // }
    // avgRating = totalRatingCount > 0 ? ((totalRating) / totalRatingCount) : 0;


    let ratingData = await ProductModel.aggregate([
      { $match: { seller_id: mongoose.Types.ObjectId(seller._id) }},
      { $sort: { date_created: -1 } },
      {
        $lookup: {
          from: "rating",
          as: "rating",
          let: { "product_id": "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                   $eq: ["$product_id", "$$product_id"] 
                }
              }
            },{
              $project: {
                _id: 1,
                rating_point: 1
              }
            }
          ]
        }
      },
      {
        $unwind: {
          path: "$rating",
          preserveNullAndEmptyArrays: true
        }
      }, {
        $project: {
          _id: 1,
          rating: 1
        }
      }, {
        $match: {
          "rating": { $exists: true }
        }
      }
    ])

    let totalRating = _.sum(_.map(ratingData, (doc) => doc.rating.rating_point));

    let avgRating = ((totalRating > 0) && (ratingData.length > 0)) ? ((totalRating) / ratingData.length) : 0;

    let dataToSend = {
      sellerDetails: {
        first_name: seller.first_name,
        last_name: seller.last_name,
        authorized_signatory_email: seller.authorized_signatory_email,
        store_name: seller.store_name,
        store_business_type: seller.store_business_type,
        store_commercial_name: seller.store_commercial_name,
        store_address: seller.store_address,
        store_city: seller.store_city,
        store_country: seller.store_country,
        rating: avgRating.toFixed(1)
      }
    }

    return { data: dataToSend, message: "Seller details fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getPaymentDetails = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to view details" };

      var start = new Date();
          start.setUTCHours(0,0,0,0);
      let todayStart = Date.parse(start);
      var end = new Date();
          end.setUTCHours(23,59,59,999);
      let todayEnd = Date.parse(end);
      let yesterdayStart = (todayStart - 86400000);
      let yesterdayEnd = (todayEnd - 86400000);
      let weekStart = (todayStart - (7 * 86400000));

      let todayRevenue = await CartModel.find({ seller_id: mongoose.Types.ObjectId(seller._id), status: 9, modified_at: { '$gte': todayStart } },{ quantity:1, unit_price:1 }).lean();      
      let todayTotalRevenue = _.sum(_.map(todayRevenue, (doc) => (doc.quantity * doc.unit_price)));
      let yesterdayRevenue = await CartModel.find({ seller_id: mongoose.Types.ObjectId(seller._id), status: 9, $and: [{ modified_at: {'$gte': yesterdayStart}}, { modified_at: {'$lte':  yesterdayEnd }}] },{ quantity:1, unit_price:1 }).lean();    
      let yesterdayTotalRevenue = _.sum(_.map(yesterdayRevenue, (doc) => (doc.quantity * doc.unit_price)));
      let weekRevenue = await CartModel.find({ seller_id: mongoose.Types.ObjectId(seller._id), status: 9, modified_at: { '$gte': weekStart } },{ quantity:1, unit_price:1 }).lean();    
      let weekTotalRevenue = _.sum(_.map(weekRevenue, (doc) => (doc.quantity * doc.unit_price)));

      let lastThreePayments = await CartModel.find({ seller_id: mongoose.Types.ObjectId(seller._id), status: 9 },{ quantity: 1, unit_price: 1, modified_at: 1 }).sort({modified_at: -1 }).skip(0).limit(3).lean();     

      let lastThreePaymentData = [];
      if(lastThreePayments.length > 0){
        for(let i=0; i < lastThreePayments.length; i++){
          let data = { amount : (parseFloat(lastThreePayments[i].quantity) *  parseFloat(lastThreePayments[i].unit_price)), date: lastThreePayments[i].modified_at }
          lastThreePaymentData.push(data);
        }
      }

      let dataToSend = {
        todayRevenue: {
          amount: todayTotalRevenue,
          noOfOrders: todayRevenue.length
        },
        yesterdayRevenue: {
          amount: yesterdayTotalRevenue,
          noOfOrders: yesterdayRevenue.length
        },
        weekRevenue: { 
          amount: weekTotalRevenue,
          noOfOrders: weekRevenue.length
        },
        lastThreePayments: lastThreePaymentData
      }
    return { data: dataToSend, message: "Payment details fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getPaymentCancelDetails = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to view details" };

      var start = new Date();
          start.setUTCHours(0,0,0,0);
      let todayStart = Date.parse(start);
      let weekStart = (todayStart - (7 * 86400000));
      let monthStart = (todayStart - (30 * 86400000));

      let todayCancelRevenue = await CartModel.find({ seller_id: mongoose.Types.ObjectId(seller._id), status: 10, modified_at: { '$gte': todayStart } },{ quantity:1, unit_price:1 }).lean();      
      let todayTotalRevenue = _.sum(_.map(todayCancelRevenue, (doc) => (doc.quantity * doc.unit_price)));
      let weekCancelRevenue = await CartModel.find({ seller_id: mongoose.Types.ObjectId(seller._id), status: 10, modified_at: { '$gte': weekStart } },{ quantity:1, unit_price:1 }).lean();    
      let weekTotalRevenue = _.sum(_.map(weekCancelRevenue, (doc) => (doc.quantity * doc.unit_price)));
      let monthCancelRevenue = await CartModel.find({ seller_id: mongoose.Types.ObjectId(seller._id), status: 10, modified_at: { '$gte': monthStart } },{ quantity:1, unit_price:1 }).lean();    
      let monthTotalRevenue = _.sum(_.map(monthCancelRevenue, (doc) => (doc.quantity * doc.unit_price)));


      let dataToSend = {
        todayRevenue: {
          amount: todayTotalRevenue,
          noOfOrders: todayCancelRevenue.length
        },
        weekRevenue: { 
          amount: weekTotalRevenue,
          noOfOrders: weekCancelRevenue.length
        },
        monthRevenue: {
          amount: monthTotalRevenue,
          noOfOrders: monthCancelRevenue.length
        }
      }
    return { data: dataToSend, message: "Order cancel details fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getOngoingReports = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get ongoing order list" };

      let ongoingOrderReport = await CartModel.aggregate([
        { $match: { 
            $and: [{seller_id: mongoose.Types.ObjectId(seller._id) }, { is_deleted: false }, { $or: [{status: 3}, {status: 4}, {status: 5}, {status: 6}, {status: 7}, {status: 8}]}]
          }
        },
        { $sort: { created_at: -1 } },
        {
          $lookup: {
            from: "order",
            localField: "order_id",
            foreignField: "_id",
            as: "order"
          }
        },
        {
          $unwind: {
            path: "$order",
            preserveNullAndEmptyArrays: true
          }
        }, {
          $lookup: {
            from: "user",
            localField: "user_id",
            foreignField: "_id",
            as: "user"
          }
        }, {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true
          }
        }, {
          $project: {
            order_id: "$order.order_id",
            payment_options: "$order.payment_options",
            currency: "$order.currency",
            price: {
              $multiply:
                ["$unit_price", "$quantity"]
            },
            unit_price: "$unit_price",
            quantity: "$quantity",
            order_date: "$order.created_at",
            status: { $toInt: "$order.status" },
            first_name: "$user.first_name",
            last_name: "$user.last_name",
            user_email: "$user.user_email",
            user_country_code: "$user.country_code",
            user_mobile: "$user.mobile_number"
          }
        }
      ])

      if(ongoingOrderReport.length > 0){
        for(let i =0; i < ongoingOrderReport.length; i++){
          ongoingOrderReport[i].status = utils.getOrderStatus(ongoingOrderReport[i].status)
          ongoingOrderReport[i].order_date = new Date(ongoingOrderReport[i].order_date)
        }
      }

    let dataToSend = {
      ongoingOrderReport: ongoingOrderReport
    }
    return { data: dataToSend, message: "Ongoing order report fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getCompletedOrdersReports = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get completed order list" };

    let completedOrderReport = await CartModel.aggregate([
      { $match: { 
          $and: [{seller_id: mongoose.Types.ObjectId(seller._id) }, { is_deleted: false }, {status: 9}]
        }
      },
      { $sort: { created_at: -1 } },
      {
        $lookup: {
          from: "order",
          localField: "order_id",
          foreignField: "_id",
          as: "order"
        }
      },
      {
        $unwind: {
          path: "$order",
          preserveNullAndEmptyArrays: true
        }
      }, {
        $lookup: {
          from: "user",
          localField: "user_id",
          foreignField: "_id",
          as: "user"
        }
      }, {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true
        }
      }, {
        $project: {
          order_id: "$order.order_id",
          payment_options: "$order.payment_options",
          currency: "$order.currency",
          price: {
            $multiply:
              ["$unit_price", "$quantity"]
          },
          unit_price: "$unit_price",
          quantity: "$quantity",
          order_date: "$order.created_at",
          status: { $toInt: "$order.status" },
          first_name: "$user.first_name",
          last_name: "$user.last_name",
          user_email: "$user.user_email",
          user_country_code: "$user.country_code",
          user_mobile: "$user.mobile_number"
        }
      }
    ])
    if(completedOrderReport.length > 0){
      for(let i =0; i < completedOrderReport.length; i++){
        completedOrderReport[i].status = utils.getOrderStatus(completedOrderReport[i].status)
        completedOrderReport[i].order_date = new Date(completedOrderReport[i].order_date)
      }
    }

    let dataToSend = {
      completedOrderReport: completedOrderReport
    }

    return { data: dataToSend, message: "Completed order report fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getCancelledOrdersReports = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get cancelled order list" };

    let cancelledOrderReport = await CartModel.aggregate([
      { $match: { 
          $and: [{seller_id: mongoose.Types.ObjectId(seller._id) }, {status: 10}, { is_deleted: false }]
        }
      },
      { $sort: { created_at: -1 } },
      {
        $lookup: {
          from: "order",
          localField: "order_id",
          foreignField: "_id",
          as: "order"
        }
      },
      {
        $unwind: {
          path: "$order",
          preserveNullAndEmptyArrays: true
        }
      }, {
        $lookup: {
          from: "user",
          localField: "user_id",
          foreignField: "_id",
          as: "user"
        }
      }, {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true
        }
      }, {
        $project: {
          order_id: "$order.order_id",
          payment_options: "$order.payment_options",
          currency: "$order.currency",
          price: {
            $multiply:
              ["$unit_price", "$quantity"]
          },
          unit_price: "$unit_price",
          quantity: "$quantity",
          order_date: "$order.created_at",
          status: { $toInt: "$order.status" },
          first_name: "$user.first_name",
          last_name: "$user.last_name",
          user_email: "$user.user_email",
          user_country_code: "$user.country_code",
          user_mobile: "$user.mobile_number"
        }
      }
    ])

    if(cancelledOrderReport.length > 0){
      for(let i =0; i < cancelledOrderReport.length; i++){
        cancelledOrderReport[i].status = utils.getOrderStatus(cancelledOrderReport[i].status)
        cancelledOrderReport[i].order_date = new Date(cancelledOrderReport[i].order_date)
      }
    }

    let dataToSend = {
      cancelledOrderReport: cancelledOrderReport
    }

    return { data: dataToSend, message: "Cancelled order report fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getCommissionDetailsReports = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get completed order list" };

    let commissionReport = await CartModel.aggregate([
      { $match: { 
          $and: [{seller_id: mongoose.Types.ObjectId(seller._id) }, { is_deleted: false }, {status: 9}]
        }
      },
      { $sort: { created_at: -1 } },
      {
        $lookup: {
          from: "order",
          localField: "order_id",
          foreignField: "_id",
          as: "order"
        }
      },
      {
        $unwind: {
          path: "$order",
          preserveNullAndEmptyArrays: true
        }
      }, 
      {
        $lookup: {
          from: "product",
          localField: "product_id",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: true
        }
      },{
        $project: {
          product_name: "$product.product_name",
          order_id: "$order.order_id",
          payment_options: "$order.payment_options",
          currency: "$order.currency",
          price: {
            $multiply:
              ["$unit_price", "$quantity"]
          },
          unit_price: "$unit_price",
          quantity: "$quantity",
          commission: { $cond: { if: { $eq: ["$price", 0] }, then: 0, else: { $multiply: [{ $divide: ["$price", 100] }, 5] } } },
          amountToBePaid: { $cond: { if: { $eq: ["$price", 0] }, then: 0, else: { $subtract: ["$price", { $multiply: [{ $divide: ["$price", 100] }, 5] }] } } },
          order_date: "$order.created_at",
          status: { $toInt: "$order.status" }
        }
      }
    ])
    if(commissionReport.length > 0){
      for(let i =0; i < commissionReport.length; i++){
        commissionReport[i].status = utils.getOrderStatus(commissionReport[i].status)
        commissionReport[i].order_date = new Date(commissionReport[i].order_date)
        commissionReport[i].commission = (commissionReport[i].commission).toFixed(2)
        commissionReport[i].amountToBePaid = (commissionReport[i].amountToBePaid).toFixed(2)
      }
    }

    let dataToSend = {
      commissionReport: commissionReport
    }

    return { data: dataToSend, message: "Commission report fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getDashboardReports = async (seller, data) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get completed order list" };
    if (!data || data.type == '')
      return { status: 0, message: "Filter type is required" };

      var start = new Date();
        start.setUTCHours(0,0,0,0);
      let todayStart = Date.parse(start);
      let weekStart = (todayStart - (7 * 86400000));
      let monthStart = (todayStart - (30 * 86400000));
      let yearStart = (todayStart - (365 * 86400000));

    let totalProducts = 0;
    let totalOrders = 0;
    let totalOngoingOrders = 0;
    let totalCompletedOrder = 0;
    let totalCancelledOrders = 0;
    let inStockInventories = 0;
    let expiredInventories = 0;

    if(data.type == "1" || data.type == 1){
      totalProducts = await ProductModel.countDocuments({$and:[{ "date_created": { $gte: todayStart } },{ "is_active": true }, { seller_id: mongoose.Types.ObjectId(seller._id) } ]}).lean();
      totalOrders = await CartModel.countDocuments({ created_at: { $gte: todayStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), $and:[{ status: { $gte: 3} },{ status: { $lte: 10} }] }).lean();
      totalOngoingOrders = await CartModel.countDocuments({ created_at: { $gte: todayStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), $and:[{ status: { $gte: 3} },{ status: { $lte: 8} }] }).lean();
      totalCompletedOrder = await CartModel.countDocuments({ created_at: { $gte: todayStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), status: 9 }).lean();
      totalCancelledOrders = await CartModel.countDocuments({ created_at: { $gte: todayStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), status: 10 }).lean();
      inStockInventories = await InventoryModel.countDocuments({ created_at: { $gte: todayStart },is_active: true, seller_id: mongoose.Types.ObjectId(seller._id) }).lean();
      expiredInventories = await InventoryModel.countDocuments({ expiry_date: { $gte: todayStart },is_active: true, seller_id: mongoose.Types.ObjectId(seller._id) }).lean();
    }else if(data.type == "2" || data.type == 2){
      totalProducts = await ProductModel.countDocuments({$and:[{ "date_created": { $gte: weekStart } },{ "is_active": true }, { seller_id: mongoose.Types.ObjectId(seller._id) } ]}).lean();
      totalOrders = await CartModel.countDocuments({ created_at: { $gte: weekStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), $and:[{ status: { $gte: 3} },{ status: { $lte: 10} }] }).lean();
      totalOngoingOrders = await CartModel.countDocuments({ created_at: { $gte: weekStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), $and:[{ status: { $gte: 3} },{ status: { $lte: 8} }] }).lean();
      totalCompletedOrder = await CartModel.countDocuments({ created_at: { $gte: weekStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), status: 9 }).lean();
      totalCancelledOrders = await CartModel.countDocuments({ created_at: { $gte: weekStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), status: 10 }).lean();
      inStockInventories = await InventoryModel.countDocuments({ created_at: { $gte: weekStart },is_active: true, seller_id: mongoose.Types.ObjectId(seller._id) }).lean();
      expiredInventories = await InventoryModel.countDocuments({ expiry_date: { $gte: weekStart },is_active: true, seller_id: mongoose.Types.ObjectId(seller._id) }).lean();
    }else if(data.type == "3" || data.type == 3){
      totalProducts = await ProductModel.countDocuments({$and:[{ "date_created": { $gte: monthStart } },{ "is_active": true }, { seller_id: mongoose.Types.ObjectId(seller._id) } ]}).lean();
      totalOrders = await CartModel.countDocuments({ created_at: { $gte: monthStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), $and:[{ status: { $gte: 3} },{ status: { $lte: 10} }] }).lean();
      totalOngoingOrders = await CartModel.countDocuments({ created_at: { $gte: monthStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), $and:[{ status: { $gte: 3} },{ status: { $lte: 8} }] }).lean();
      totalCompletedOrder = await CartModel.countDocuments({ created_at: { $gte: monthStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), status: 9 }).lean();
      totalCancelledOrders = await CartModel.countDocuments({ created_at: { $gte: monthStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), status: 10 }).lean();
      inStockInventories = await InventoryModel.countDocuments({ created_at: { $gte: monthStart },is_active: true, seller_id: mongoose.Types.ObjectId(seller._id) }).lean();
      expiredInventories = await InventoryModel.countDocuments({ expiry_date: { $gte: monthStart },is_active: true, seller_id: mongoose.Types.ObjectId(seller._id) }).lean();
    }else if(data.type == "4" || data.type == 4){
      totalProducts = await ProductModel.countDocuments({$and:[{ "date_created": { $gte: yearStart } },{ "is_active": true }, { seller_id: mongoose.Types.ObjectId(seller._id) } ]}).lean();
      totalOrders = await CartModel.countDocuments({ created_at: { $gte: yearStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), $and:[{ status: { $gte: 3} },{ status: { $lte: 10} }] }).lean();
      totalOngoingOrders = await CartModel.countDocuments({ created_at: { $gte: yearStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), $and:[{ status: { $gte: 3} },{ status: { $lte: 8} }] }).lean();
      totalCompletedOrder = await CartModel.countDocuments({ created_at: { $gte: yearStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), status: 9 }).lean();
      totalCancelledOrders = await CartModel.countDocuments({ created_at: { $gte: yearStart },is_deleted: false, seller_id: mongoose.Types.ObjectId(seller._id), status: 10 }).lean();
      inStockInventories = await InventoryModel.countDocuments({ created_at: { $gte: yearStart },is_active: true, seller_id: mongoose.Types.ObjectId(seller._id) }).lean();
      expiredInventories = await InventoryModel.countDocuments({ expiry_date: { $gte: yearStart },is_active: true, seller_id: mongoose.Types.ObjectId(seller._id) }).lean();
    }

    let dataToSend = {
      totalProducts: totalProducts,
      totalOrders: totalOrders,
      totalOngoingOrders: totalOngoingOrders,
      totalCompletedOrder: totalCompletedOrder,
      totalCancelledOrders: totalCancelledOrders,
      totalActiveInventory: inStockInventories,
      totalExpiredInventory: expiredInventories
    }

    return { data: dataToSend, message: "Dashboard report fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};


exports.getDashboardChartReports = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get graph data" };
      var currentYear = new Date().getFullYear();
      var monthLastDay = function(y,m){
        return  new Date(y, m +1, 0);
      }
      var firstDayInMonth =   function (y,m) {
        let date =  new Date(y, m, 0);
        return date.setDate(date.getDate()+1);
      }
    
    let graphDataToSend = []; 
    for(let i= 0; i < 12; i++){
      let monthFirstDate = firstDayInMonth(currentYear,i);
      let monthLastDate =  Date.parse(monthLastDay(currentYear,i));

      let monthReport = await CartModel.aggregate([
        { $match: { 
            $and: [{seller_id: mongoose.Types.ObjectId(seller._id) }, { is_deleted: false }, {status: 9}, { $and: [ { modified_at: { '$gte': monthFirstDate } }, { modified_at: { '$lte': monthLastDate } }]} ]
          }
        },{
          $project: {
            price: {
              $multiply:
                ["$unit_price", "$quantity"]
            },
            amountToBePaid: { $cond: { if: { $eq: ["$price", 0] }, then: 0, else: { $subtract: ["$price", { $multiply: [{ $divide: ["$price", 100] }, 5] }] } } },
          }
        }
      ])

      let monthTotalRevenue = parseInt(_.sum(_.map(monthReport, (doc) => doc.amountToBePaid)))
      graphDataToSend.push(monthTotalRevenue);
    }
    let dataToSend = {
      yearReport: graphDataToSend
    }

    return { data: dataToSend, message: "Dashboard graph report fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getAdminDetails = async (seller) => {
  try {
    
    // let adminData = await AdminModel.findOne({ email: "admin@dentswift.com" }).lean();
    let adminData = await AdminModel.findOne({ email: "hbriyal@aol.com" }).lean();
    let dataToSend = {
      adminData: {
        _id: adminData._id
      }
    }

    return { data: dataToSend, message: "Admin data fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updateMobileNumber = async (seller, data) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to update mobile no" };
    if (!data || data.country_code == '')
      return { status: 0, message: "Country code is required" };
    if (!data || data.mobile_number == '')
      return { status: 0, message: "Mobile number is required" };
    if (!data || data.confirm_mobile_no == '')
      return { status: 0, message: "Confirm mobile number is required" };
    if (!data || data.confirm_country_code == '')
      return { status: 0, message: "Confirm country code is required" };

    if((data.country_code == data.confirm_country_code) && (data.mobile_number == data.confirm_mobile_no)){
      let dataToUpdate =  {
        country_code: data.country_code, 
        mobile_number: data.mobile_number
      }

      let updateSeller = await SellerModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(seller._id) }, dataToUpdate ,{new: true});
        if (!updateSeller) {
          return {
            status: 0,
            message: "Unable to update mobile number"
          }
        }

      return { message: "Mobile number updated successfully", status: 1 };
    }else{
      return {
        status: 0,
        message: "Mobile number or country code do not match"
      }
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updateEmail = async (seller, data) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to update mobile no" };
    if (!data || data.email == '')
      return { status: 0, message: "Email is required" };
    if (!data || data.confirm_email == '')
      return { status: 0, message: "Confirm email is required" };

    if((data.email == data.confirm_email)){
      let dataToUpdate =  {
        email: data.email
      }

      let updateSeller = await SellerModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(seller._id) }, dataToUpdate ,{new: true});
        if (!updateSeller) {
          return {
            status: 0,
            message: "Unable to update email"
          }
        }

      return { message: "Email updated successfully", status: 1 };
    }else{
      return {
        status: 0,
        message: "Email do not match"
      }
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updateStoreDetails = async (seller, data) => {
  try {
    if (!data || data.store_name == '')
      return { status: 0, message: "Store name is required" };
    if (!data || data.business_logo == '')
      return { status: 0, message: "Business logo is required" };
    if (!data || data.store_description == '')
      return { status: 0, message: "Store description is required" };
    if (!data || data.working_days.length == 0)
      return { status: 0, message: "Working days is required" };
    if (!data || data.from_time == '')
      return { status: 0, message: "Business from time is required" };
    if (!data || data.to_time == '')
      return { status: 0, message: "Business to time is required" };

    if (typeof (data.working_days) == "string") {
      JSON.parse(data.working_days)
    }

    let dataToUpdate =  {
      store_name: data.store_name,
      business_logo: data.business_logo,
      store_description: data.store_description,
      working_days: data.working_days,
      from_time: data.from_time,
      to_time: data.to_time
    }

    let updateSeller = await SellerModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(seller._id) }, dataToUpdate ,{new: true});
      if (!updateSeller) {
        return {
          status: 0,
          message: "Unable to update store details"
        }
      }

    return { message: "Store details updated successfully", status: 1 };

  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getBankDetails = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Please login to get bank details" };

    let dataToSend =  {
    }
    if(seller.bank_details.length > 0){
      let bankData = seller.bank_details[0];
      dataToSend = {  
        iban_certificate: bankData.iban_certificate,
        account_number: bankData.account_number,
        account_holder_name: bankData.account_holder_name,
        bank_name: bankData.bank_name,
        swift_code: bankData.swift_code
      }
    }

    return { data: dataToSend, message: "Bank details fetched successfully", status: 1 };

  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updateBankDetails = async (seller, data) => {
  try {
    // if (!data || data.iban_certificate == '')
    //   return { status: 0, message: "IBAN certificate is required" };
    if (!data || data.account_number == '')
      return { status: 0, message: "Account number is required" };
    if (!data || data.account_holder_name == '')
      return { status: 0, message: "Account holder name is required" };
    if (!data || data.bank_name == '')
      return { status: 0, message: "Bank name is required" };
    if (!data || data.swift_code == '')
      return { status: 0, message: "Swift code is required" };

    let dataToUpdate =  {
      bank_details: [{
        iban_certificate: data.iban_certificate,
        account_number: data.account_number,
        account_holder_name: data.account_holder_name,
        bank_name: data.bank_name,
        swift_code: data.swift_code
      }]
    }

    let updateSeller = await SellerModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(seller._id) }, dataToUpdate ,{new: true});
      if (!updateSeller) {
        return {
          status: 0,
          message: "Unable to update bank details"
        }
      }

    return { message: "Bank details updated successfully", status: 1 };

  } catch (err) {
    throw new Error(err.message);
  }
};


exports.purchaseSubscription = async (seller, data) => {
  try {
    let seller_id = seller._id;
    let email_id = seller.email;

    var { card_number, validity_date, cvv, card_name, card_type, subscriptionId } = data;
    const schema = Joi.object().keys({
        card_number: Joi.string().required().error(e => 'card_number require'),
        validity_date: Joi.string().required().error(e => 'validity_date require'),
        cvv: Joi.number().required().error(e => 'cvv require'),
        card_name: Joi.string().optional().allow('').error(e => "card name  required"),
        card_type: Joi.string().optional().allow('').error(e => "card type  required"),
        subscriptionId: Joi.string().required().error(e => "subscription id required"),
    })
    if (!card_type) {
        card_type = "N/A"
    }
    const result = Joi.validate(data, schema, { abortEarly: true });
    if (result.error) {
        if (result.error.details && result.error.details[0].message) {
            responses.parameterMissing(res, result.error.details[0].message);
            return;
        } else {
            responses.parameterMissing(res, result.error.message);
            return;
        }
    }
    // console.log(data);
    
    let subscriptionData = await SubscriptionModel.findOne({ _id: mongoose.Types.ObjectId(subscriptionId), is_active: true, is_blocked: false }).lean();

    let  validity =  validity_date.split('/');
    let month = Number(validity[0]);
    let year = Number(validity[1]);

    if(subscriptionData){
      let token = await stripe.tokens.create({
        card: {
          number: card_number,
          exp_month: month,
          exp_year: year,
          cvc: cvv,
        },
      });
      
      token = token.id;
      // console.log(token);
      var customer = await stripe.customers.create({
          email: email_id,
          source: token
      });

      var customer_id = customer ? customer.id : ""
      var card_id = customer ? customer.default_source : null
      
      //create product
      const product = await stripe.products.create({
        name: subscriptionData.name
      });
      var product_id = product ? product.id: "";
      // console.log(product_id)
      if(product_id){
        // console.log(customer_id);
        // console.log(card_id)
        const plan = await stripe.plans.create({
          amount: Number(subscriptionData.price),
          currency: 'aed',
          interval: 'month',
          product: product_id,
        });
        
        var plan_id = plan ? plan.id: "";
        if(plan_id){
          // console.log(plan_id)
          var subscription;
          if(subscriptionData.trial_period_days == 0){
            subscription = await stripe.subscriptions.create({
              customer: customer_id,
              items: [
                {price: plan_id},
              ],
              expand: ["latest_invoice.payment_intent"]
            });
          }else{
            subscription = await stripe.subscriptions.create({
              customer: customer_id,
              items: [
                {price: plan_id},
              ],
              trial_period_days: subscriptionData.trial_period_days,
              expand: ["latest_invoice.payment_intent"]
            });
          }
          if (!subscription) {
            return {
              status: 0,
              message: "Unable to complete payment"
            }
          }
          if(subscription.status == "succeeded" || subscription.status == "trialing"){
            let updatePurchasedSubscription = await PurchasedSubscriptionModel.updateMany({ seller_id: mongoose.Types.ObjectId(seller_id)}, { is_currently_active: false },{new: true});

            let dataToSave = {
              seller_id: seller_id,
              amount: Number(subscriptionData.price),
              transaction_id: subscription.id,
              response_json: subscription,
              plan_detail: {
                _id: subscriptionData._id,
                name: subscriptionData.name,
                description: subscriptionData.description,
                price: subscriptionData.price,
                trial_period_days: subscriptionData.trial_period_days
              },
              is_currently_active: true,
              created_on: Date.now()
            }
            
            let purchasedSubsData = new PurchasedSubscriptionModel(dataToSave);
            let saveSubscription = await purchasedSubsData.save();
            if (!saveSubscription) {
              return { status: 0, message: "something went wrong try after sometime" };
            }

          /* Code for notification start to seller */
            let title = "Thanks for purchasing subscription";
            let Notificationbody = "Thanks for purchasing subscription " + subscriptionData.name;
            let device_type = seller.device_type;
            let notification = {
              user_id: seller._id,
              title: title,
              body: Notificationbody,
              type: 1,
              created_at: Date.now()
            }
            let sendNotification = await NotificationModel.create(notification);
            sendNotification.save();
            
            let payload = {
                title: title,
                body: Notificationbody,
                noti_type: 1
            }
            let notify = {
              title: title,
              body: Notificationbody,
              "color": "#f95b2c",
              "sound": true
            }
            if(seller.device_token){
              utils.sendPushNotification(seller.device_token, device_type, payload, notify);
            }

            /* Code for notification start to Admin */
            let admin = await AdminModel.findOne({}, { email: 1, _id: 1 });
            let adminTitle = "Seller purchased Subscription";
            let NotiBody = seller.first_name+" " + seller.last_name + " having email- " + seller.email + " and mobile number- " +seller.country_code+" "+ seller.mobile_number + "  has purchased subscription " + subscriptionData.name;

            let adminNotification = {
              user_id: admin._id,
              title: adminTitle,
              body: NotiBody,
              type: 2,
              created_at: Date.now()
            }
            let send_noti = await NotificationModel.create(adminNotification);
            send_noti.save();

          /* Code for notification end */

            return { message: "Subscription added successfully", status: 1 };
          }else{
            return {
              status: 0,
              message: "Payment failed"
            }
          }
        }return {
          status: 0,
          message: "Payment failed"
        }
      }else{
        return {
          status: 0,
          message: "Subscription plan is invalid"
        }
      }
    }else{
      return {
        status: 0,
        message: "Payment failed"
      }
    }
    // const plan = await stripe.plans.create({
    //   amount: 999,
    //   currency: 'usd',
    //   interval: 'month',
    //   product: customer_id
    // });

    

    // var make_payment = await stripe.charges.create({
    //   amount: (((Number(price)).toFixed(2)) * (100)),
    //   currency: currency,
    //   customer: customer_id,
    //   description: "payment successfull",
    // });
    // if (!make_payment) {
    //   return {
    //     status: 0,
    //     message: "Unable to complete payment"
    //   }
    // }
    // console.log(make_payment);
    // if(make_payment.status == "succeeded"){
    //   //  console.log(make_payment.balance_transaction);
    //    return {  message: "Payment completed successfully" , status: 1 }; 
    // }else{
    //   return {
    //     status: 0,
    //     message: "Payment failed"
    //   }
    // }

  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getFinancialReport = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get financial report" };
     
      let financeReport = await CartModel.aggregate([
        { 
          $match: { 
            $and: [{seller_id: mongoose.Types.ObjectId(seller._id) }, { is_deleted: false }, {status: 9}]
          }
        },
        { $sort: { created_at: -1 } },
        {
          $lookup: {
            from: "order",
            localField: "order_id",
            foreignField: "_id",
            as: "order"
          }
        },
        {
          $unwind: {
            path: "$order",
            preserveNullAndEmptyArrays: true
          }
        },{
          $lookup: {
            from: "orderBooking",
            localField: "booking_id",
            foreignField: "_id",
            as: "booking"
          }
        }, {
          $unwind: {
            path: "$booking",
            preserveNullAndEmptyArrays: true
          }
        },{
          $match: {
            "booking": { $exists: true }
          }
        }, {
          $lookup: {
            from: "user",
            localField: "user_id",
            foreignField: "_id",
            as: "user"
          }
        }, {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true
          }
        },{
          $lookup: {
            from: "product",
            localField: "product_id",
            foreignField: "_id",
            as: "product"
          }
        },
        {
          $unwind: {
            path: "$product",
            preserveNullAndEmptyArrays: true
          }
        }, {
          $project: {
            _id: 0,
            product_name: "$product.product_name",
            order_id: "$order.order_id",
            booking_id: "$booking.booking_id",
            transaction_id: "$booking.transaction_id",
            orderIds: "$booking.cart_id",
            delivery_charge: "$booking.delivery_charge",
            tax_amount: "$booking.tax_amount",
            discount_amount: "$booking.discount_amount",
            payment_options: "$order.payment_options",
            currency: "$order.currency",
            price: {
              $multiply:
                ["$unit_price", "$quantity"]
            },
            unit_price: "$unit_price",
            quantity: "$quantity",
            order_date: "$order.created_at",
            status: { $toInt: "$order.status" },
            user_first_name: "$user.first_name",
            user_last_name: "$user.last_name",
            user_email: "$user.user_email",
            user_country_code: "$user.country_code",
            user_mobile: "$user.mobile_number"
          }
        }
      ])

      if(financeReport.length > 0){
        for(let i =0; i < financeReport.length; i++){
          let totalOrders = 0;
          if(financeReport[i].orderIds.length > 0){
            totalOrders = financeReport[i].orderIds.length
            financeReport[i].delivery_charge = (financeReport[i].delivery_charge / totalOrders).toFixed(2);
            financeReport[i].tax_amount = (financeReport[i].tax_amount / totalOrders).toFixed(2);
            if(financeReport[i].discount_amount > 0){
              financeReport[i].discount_amount = (financeReport[i].discount_amount / totalOrders).toFixed(2);
              financeReport[i].price = ((financeReport[i].price) - (financeReport[i].discount_amount)).toFixed(2);
            }
          }
          financeReport[i].status = utils.getOrderStatus(financeReport[i].status)
          financeReport[i].order_date = new Date(financeReport[i].order_date)
          financeReport[i].commission =  ((financeReport[i].price) * 0.05).toFixed(2);
          financeReport[i].amountToBePaid = ((financeReport[i].price) - (financeReport[i].commission)).toFixed(2)
        }
      }

    let dataToSend = {
      financeReport: financeReport
    }

    return { data: dataToSend, message: "Financial report fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
}

exports.getPaymentReport = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get payment report" };
     
      let paymentReport = await CartModel.aggregate([
        { 
          $match: { 
            $and: [{seller_id: mongoose.Types.ObjectId(seller._id) }, { is_deleted: false }, {status: 9}]
          }
        },
        { $sort: { created_at: -1 } },
        {
          $lookup: {
            from: "order",
            localField: "order_id",
            foreignField: "_id",
            as: "order"
          }
        },
        {
          $unwind: {
            path: "$order",
            preserveNullAndEmptyArrays: true
          }
        }, {
          $lookup: {
            from: "user",
            localField: "user_id",
            foreignField: "_id",
            as: "user"
          }
        }, {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true
          }
        },{
          $lookup: {
            from: "product",
            localField: "product_id",
            foreignField: "_id",
            as: "product"
          }
        },
        {
          $unwind: {
            path: "$product",
            preserveNullAndEmptyArrays: true
          }
        }, {
          $project: {
            _id: 0,
            product_name: "$product.product_name",
            order_id: "$order.order_id",
            payment_options: "$order.payment_options",
            currency: "$order.currency",
            price: {
              $multiply:
                ["$unit_price", "$quantity"]
            },
            unit_price: "$unit_price",
            quantity: "$quantity",
            order_date: "$order.created_at",
            status: { $toInt: "$order.status" },
            user_first_name: "$user.first_name",
            user_last_name: "$user.last_name",
            user_email: "$user.user_email",
            user_country_code: "$user.country_code",
            user_mobile: "$user.mobile_number"
          }
        }
      ])

      if(paymentReport.length > 0){
        for(let i =0; i < paymentReport.length; i++){
          paymentReport[i].status = utils.getOrderStatus(paymentReport[i].status)
          paymentReport[i].order_date = new Date(paymentReport[i].order_date)
        }
      }

    let dataToSend = {
      paymentReport: paymentReport
    }

    return { data: dataToSend, message: "Payment report fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
}

exports.getPlanList = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get new order list" };

    let subscriptionList = await SubscriptionModel.find({ is_active: true, is_blocked: false }).lean();
    let purchasedSubscription = await PurchasedSubscriptionModel.findOne({ seller_id: mongoose.Types.ObjectId(seller._id), is_currently_active: true }, { response_json: 0 }).lean();
    let plan_id;
    if(purchasedSubscription){
      plan_id = purchasedSubscription.plan_detail._id;
    }
    if(subscriptionList.length > 0){
      for(let i = 0; i < subscriptionList.length; i++){
        if((subscriptionList[i]._id) == (plan_id)){
          subscriptionList[i].is_plan_active = true
        }else{
          subscriptionList[i].is_plan_active = false
        }
      }
    }

    let dataToSend = {
      subscriptionList: subscriptionList
    }
    return { data: dataToSend, message: "Subscription list fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.activePlanDetails = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Login first to get new order list" };

    let purchasedSubscription = await PurchasedSubscriptionModel.findOne({ seller_id: mongoose.Types.ObjectId(seller._id), is_currently_active: true }, { response_json: 0 }).lean();
    let dataToSend = {
      activeSubscription: purchasedSubscription
    }
    return { data: dataToSend, message: "Active subscription details fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};


exports.getTermCondition = async () => {
  try {
      var getTerm = await SettingModel.findOne().lean();

      if (!getTerm || getTerm.length < 1) {
          return 'Unable to fetch term & condition';
      }

      return getTerm.term_condition;

  } catch (error) {
      return {
          status: 0,
          message: error.message
      }
  }
}

exports.getAboutUsPage = async () => {
  try {
      var getTerm = await SettingModel.findOne().lean();

      if (!getTerm || getTerm.length < 1) {
          return 'Unable to fetch about us page';
      }
      
      return getTerm.about_us;

  } catch (error) {
      return {
          status: 0,
          message: error.message
      }
  }
}

exports.getContactUsPage = async () => {
  try {
      var getTerm = await SettingModel.findOne().lean();

      if (!getTerm || getTerm.length < 1) {
          return 'Unable to fetch contact us page';
      }
      
      return getTerm.contact_us;

  } catch (error) {
      return {
          status: 0,
          message: error.message
      }
  }
}

exports.getLegalPage = async () => {
  try {
      var getTerm = await SettingModel.findOne().lean();

      if (!getTerm || getTerm.length < 1) {
          return 'Unable to fetch legal page';
      }
      
      return getTerm.legal;

  } catch (error) {
      return {
          status: 0,
          message: error.message
      }
  }
}

exports.getHelpPage = async () => {
  try {
      var getTerm = await SettingModel.findOne().lean();

      if (!getTerm || getTerm.length < 1) {
          return 'Unable to fetch help page';
      }
      
      return getTerm.help;

  } catch (error) {
      return {
          status: 0,
          message: error.message
      }
  }
}

exports.getPrivacyPolicy = async () => {
  try {
      var getTerm = await SettingModel.findOne().lean();

      if (!getTerm || getTerm.length < 1) {
          return 'Unable to fetch privacy policy';
      }
      
      return getTerm.privacy_policy;

  } catch (error) {
      return {
          status: 0,
          message: error.message
      }
  }
}

exports.getFaqList = async () => {
  try {
      var getFaq = await FaqModel.find().lean();

      if (!getFaq || getFaq.length < 1) {
          return {
              status: 0,
              message: 'Something went wrong or no question answer'
          }
      }

      let dataToSend = {
        faqList: getFaq
      }
      return {
          status: 1,
          message: 'FAQ Fetched successfully',
          data: dataToSend
      }

  } catch (error) {
      return {
          status: -1,
          message: error.message
      }
  }
}

exports.updateBusinessDetails = async (seller, data) => {
  try {
    let { business_name, signature,tax_id, tin_no, reg_business_address, reg_business_city, reg_business_pincode, reg_business_state,
      pickup_business_address,pickup_business_city,pickup_business_pincode,pickup_business_state } = data;
    
    if (!business_name || business_name == '')
      return { status: 0, message: "Business name is required" };
    if (!reg_business_address || reg_business_address == '')
      return { status: 0, message: "Registered business address is required" };
    if (!reg_business_city || reg_business_city == '')
      return { status: 0, message: "Registered business city is required" };
    if (!reg_business_pincode || reg_business_pincode == '')
      return { status: 0, message: "Registered business pincode is required" };
    if (!reg_business_state || reg_business_state == '')
      return { status: 0, message: "Registered business state is required" };
    if (!pickup_business_address || pickup_business_address == '')
      return { status: 0, message: "Pickup business address is required" };
    if (!pickup_business_city || pickup_business_city == '')
      return { status: 0, message: "Pickup business city is required" };
    if (!pickup_business_pincode || pickup_business_pincode == '')
      return { status: 0, message: "Pickup business pincode is required" };
    if (!pickup_business_state || pickup_business_state == '')
      return { status: 0, message: "Pickup business state is required" };

      let sellerData = await SellerModel.findOne({ _id: mongoose.Types.ObjectId(seller._id), is_active: true }).lean();
      if(!sellerData){
        return { status: 0, message: "Seller does not exist" };
      }

      let dataToUpdate = {
        business_details: {
          business_name,
          signature,
          tax_id,
          tin_no,
          reg_business_address,
          reg_business_city,
          reg_business_pincode,
          reg_business_state,
          pickup_business_address,
          pickup_business_city,
          pickup_business_pincode,
          pickup_business_state
        }
      }

    let updateBusiness = await SellerModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(seller._id)}, dataToUpdate, { new: true } );
    if (!updateBusiness) {
      return { status: 0, message: "something went wrong try after sometime" };
    }

    return { status: 1, message: "Business details updated successfully", data: dataToUpdate };
    
  } catch (error) {
    throw new Error(error.message);
  }
}


exports.getBusinessDetails = async (seller) => {
  try {
    if (!seller || seller._id == '')
      return { status: 0, message: "Please login to get business details" };

    let dataToSend =  {
    }
    if(seller.business_details){
      dataToSend = {  
        businessDetails: seller.business_details
      }
    }

    return { data: dataToSend, message: "Business details fetched successfully", status: 1 };

  } catch (err) {
    throw new Error(err.message);
  }
};

exports.raiseNewIssue = async (seller, data) => {
  try {
    let { complaint_regarding, complaint_type, complaint_description } = data;
      
    if (!complaint_regarding || complaint_regarding == '')
      return { status: 0, message: "Complaint regarding is required" };
    if (!complaint_type || complaint_type == '')
      return { status: 0, message: "Complaint type is required" };
    if (!complaint_description || complaint_description == '')
      return { status: 0, message: "complaint description is required" };

    let complaintData = {
      seller_id: seller._id,
      complaint_id: (generateUniqueId({ length: 7,useLetters: true }).toUpperCase()),
      complaint_regarding,
      complaint_type,
      complaint_description
    }

    let res = new ComplaintModel(Object.assign({}, complaintData));
    let saveComplaint = await res.save();

    if (!saveComplaint) {
      return {
        status: -1,
        message: "Something went wrong please try after sometime"
      }
    }

    return { status: 1, message: "Complaint raised successfully", data: saveComplaint };
    
  } catch (error) {
    throw new Error(error.message);
  }
}

exports.viewIssue = async (seller, data) => {
  try {
    if (!seller._id || seller._id == '')
      return { status: 0, message: "Seller does not exist" };
    if (!data._id || data._id == '')
      return { status: 0, message: "Issue id is required" };

    let complaint = await ComplaintModel.findOne({ _id: data._id, is_active: true }).lean();
      if (!complaint) {
        return { status: 0, message: "Complaint not found" };
      }
      let dataToSend = {
        complaintDetails: complaint
      }
      return { data: dataToSend, message: "Complaint fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getComplaintList = async (seller) => {
  try {
    let complaints = await ComplaintModel.find({ seller_id: mongoose.Types.ObjectId(seller._id), is_active: true }).lean();
      if (!complaints) {
        return { status: 0, message: "something went wrong try after sometime" };
      }

      let dataToSend = {
        complaintList: complaints
      }
      
      return { data: dataToSend, message: "Complaint list fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getStoreDetails = async (seller) => {
  try {
      let dataToSend = {
        storeData:{
          store_name: seller.store_name,
          business_logo: seller.business_logo,
          store_description: seller.store_description,
          working_days: seller.working_days,
          from_time: seller.from_time,
          to_time: seller.to_time
        }
      }
      
      return { data: dataToSend, message: "Store details fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getNotificationList = async (seller) => {
  try {
    let notifications = await NotificationModel.find({ user_id: mongoose.Types.ObjectId(seller._id) }).lean();
      if (!notifications) {
        return { status: 0, message: "No notifications found" };
      }
      notifications = _.orderBy(notifications, item => item.created_at, ['desc']);

      let dataToSend = {
        notificationList: notifications
      }
      
      return { data: dataToSend, message: "Notification list fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.subscriptionNotification = async (seller) => {
  try {
    /* Code for notification start to seller */
    let title = "Admin will contact you";
    let Notificationbody = "You will be contacted by admin regarding subscription payment method";
    let device_type = seller.device_type;
    let notification = {
      user_id: seller._id,
      title: title,
      body: Notificationbody,
      type: 1,
      created_at: Date.now()
    }
    let sendNotification = await NotificationModel.create(notification);
    sendNotification.save();
    
    let payload = {
        title: title,
        body: Notificationbody,
        noti_type: 1
    }
    let notify = {
      title: title,
      body: Notificationbody,
      "color": "#f95b2c",
      "sound": true
    }
    if(seller.device_token){
      utils.sendPushNotification(seller.device_token, device_type, payload, notify);
    }

      /* Code for notification start to Admin */
      let admin = await AdminModel.findOne({}, { email: 1, _id: 1 });
      let adminTitle = "Seller wants to contact you";
      let NotiBody = seller.first_name+" " + seller.last_name + " having email- " + seller.email + " and mobile number- " +seller.country_code+" "+ seller.mobile_number + " has requested to contact you regarding subscription payment method";

      let adminNotification = {
        user_id: admin._id,
        title: adminTitle,
        body: NotiBody,
        type: 2,
        created_at: Date.now()
      }
      let send_noti = await NotificationModel.create(adminNotification);
      send_noti.save();

    /* Code for notification end */

    return { message: "You will be contacted by Admin regarding subscription payment method", status: 1 };

  } catch (err) {
      throw new Error(err.message);
  }
};