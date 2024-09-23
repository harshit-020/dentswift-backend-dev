const { UserModel } = require("../models/userModel");
const { UserShippingDetailsModel } = require("../models/userShippingDetailsModel");
const { CategoryModel } = require("../models/categoryModel");
const { SubCategoryModel } = require("../models/subCategoryModel");
const { SubSubCategoryModel } = require("../models/subSubCategoryModel");
const { CouponModel } = require("../models/couponModel");
const { ProductModel } = require("../models/productModel");
const { ratingModel } = require("../models/ratingModel");
const { AdvertisementModel } = require("../models/advertisementModel");
const { CartModel } = require("../models/cartModel");
const { AddressModel } = require("../models/addressModel");
const { BuyModel } = require("../models/buyModel");
const { OrderModel } = require("../models/orderModel");
const { TransactionModel } = require("../models/transactionModel");
const { UserCardDetailsModel } = require("../models/cardDetailsModel");
const { OrderBookingModel } = require("../models/orderBookingModel");
const { SettingModel } = require("../models/settingModel");
const { FaqModel } = require("../models/faqModel");
const { TaxModel } = require("../models/taxModel");
const { NotificationModel } = require("../models/notificationModel");
const { AdminModel } = require("../models/adminModel");
const { BrandModel } = require("../models/brandModel");
  const moment = require('moment');
  const bcrypt = require("bcrypt");
  const utils = require("../modules/utils");
  const authentication = require("../middlewares/authentication");
  const config = require("../config/config");
  const { randomStringGenerator, randomreferralCode, sendPushNotification } = require("../modules/utils");
  const mongoose = require('mongoose');
  var _ = require('lodash');
  const generateUniqueId = require('generate-unique-id');
  const { msg } = require("../modules/message");
const { lte } = require("lodash");
// const stripe = require('stripe')('sk_test_51Jpu1PKxATGUmhnvlhbodLREWVc48vBaXaQ3O54biB4qjN4wZo9jiPkwvxv46YRm59B1atJuZXk3f9DC116IF3SU00ODYU0gcL');
// const stripe = require('stripe')('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');

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
      let sendData = await utils.sendotp(userData.otp_info.otp, mobileNumber);
      return {
        status: 1,
        message: "OTP sent Successfully",
        data: userData
      };
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  exports.registerUser = async (req) => {
  
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
  
      data.user_status = 3; // 3 for user .... 1 for admin....2 for seller
      data.mobile_number = data.mobile_number;
      data.is_user_verified = false;
      var password = await utils.encryptText(data.password);
      
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
      // { $regex: new RegExp("^" + categoryname.toLowerCase(), "i") }
        let isMobileExist = await UserModel.findOne({email: data.email }).lean();
        if(!isMobileExist){
          isMobileExist = await UserModel.findOne({
                $and: [{
                  country_code: data.country_code
                }, {
                  mobile_number: data.mobile_number
                }]
            }).lean();
        }
        if (isMobileExist) {
            if ((isMobileExist.mobile_number.toLowerCase() == data.mobile_number.toLowerCase()) && (isMobileExist.country_code == data.country_code))
            return {
                status: 0,
                message: msg.mobileAlreadyExist
            };
            if (isMobileExist.email.toLowerCase() == data.email.toLowerCase())
            return {
                status: 0,
                message: "Provided email id is already registered with us"
            };
        }

        let dataToSave = {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          country_code: data.country_code,
          mobile_number: data.mobile_number,
          password: password,
          device_type: data.device_type,
          device_token: data.device_token,
          date_joined: new Date().getTime()
        }
        let res = new UserModel(Object.assign({}, dataToSave));
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
            status: 0,
            message: 'Something went wrong, please try again later'
          };
        }
      // }
    } catch (error) {
      throw new Error(error.message);
    }
};

exports.saveToken = async (data, days) => {
    try {
        data.token = authentication.generateToken(days);
        let userData = await UserModel.findOneAndUpdate({ mobile_number: data.mobile_number },{ $set: data }, { new :true }).lean();
        // let userData = await data.save();
        
        if (!userData) {
            return {
            status: 0,
            message: "Something went wrong"
            };
        } else {
            return {
            status: 1,
            data: Object.assign({}, JSON.parse(JSON.stringify(userData))),
            message: "User Found"
            };
        }
    } catch (error) {
      throw new Error(error.message);
    }
};
  

exports.forgotPassword = async (data) => {
  try {
    // if (!data.email || data.email == '')
    //   return { status: -1,  message: "Please enter the email" };
    // if (!data.mobile_number || data.mobile_number == '')
    //   return { status: -1,  message: "Please enter the mobile number" };

    let user;
      if(data.email){
        user = await UserModel.findOne({ email: { $regex: new RegExp("^" + data.email.toLowerCase(), "i") }}).exec();
      }
      if(!user){
        user = await UserModel.findOne({
          $and: [{
            country_code: data.country_code
          }, {
            mobile_number: data.mobile_number  
          }]
        }).exec();
      }
    if (!user) {
      return { status: 0, message: "Email or mobile number does not exist" };
    }

    // let tokenForLinkValidation = authentication.generateToken('2 days');
    // user.link_token = tokenForLinkValidation;

    // if(user.token == null || user.token == undefined || user.token == ""){
      let token = authentication.generateToken('2 days');
      user.token = token
    // }
    let saveuser = await user.save();

    // let baseUrl =   `${config.HOST}/reset-password/`;
    // let url = baseUrl + tokenForLinkValidation;
    // let subject = "Forgot Password Email";
    // let html =
    //   "<p>Hey! welcome  please Click " +
    //   ` <a href=${url}>here</a>` +
    //   " to change your password.</p>";
    // let sendData = {
    //   toEmail: data.email,
    //   subject: subject,
    //   html: html,
    // };

    // console.log(sendData);
    // await sendEmailUsingSendgrid(sendData);

    //Code to send otp on mobile no and email
    let sendOtp = await sendOtpDuringRegistration(saveuser);
    if (sendOtp.status == -1) {
      return {
        status: -1,
        message: sendOtp.message
      };
    }
    let updateUser = await UserModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(sendOtp.data._id) },{ otp_info: sendOtp.data.otp_info }, { new: true }).exec();

    return { status: 1, message: "4 digit OTP will be sent to your registered mobile number and email	address successfully", data: updateUser.token }

  } catch (error) {
    throw new Error(error.message);
  }
};

exports.resetPassword = async (data, userData) => {
  try {
    if (!data.newPassword || data.newPassword == '')
      return { status: 0, message: "New Password Not be blank" };

    let user = await UserModel.findOne({ email: userData.email });
    if (!user || user == null) {
      return { status: 0, message: "User does not exist" };
    }
    if (user.is_user_verified == false) {
      return { status: 0, message: "OTP is not verified, please verify to proceed with reset password" };
    }
      var password = await utils.encryptText(data.newPassword);
      user.password = password;
      // user.link_token = '' //remove
      let saveuser = user.save();
      if (!saveuser) {
        return { status: 0, message: "Something went Wrong" };
      }
      return { status: 1, message: "Password reset successfully" };

  } catch (error) {
    throw new Error(error.message);
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
      user.is_user_verified = true;
      user.otp_info = {
        otp: null,
        expTime: Date.now()
      };
      let userData = await user.save();
      if (!userData) {
        return {
          status: 0,
          message: "Something went wrong please try after sometime"
        }
      }
      return {
        status: 1,
        message: "OTP verify successfully"
      };
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


exports.uploadImage = async (data, user) => {
  try {
    let { upload_file } = data;
    if (!upload_file || upload_file == '')
      return { status: 0, message: "Image is required" };

    return { status: 1, message: "Image uploaded successfully", data: upload_file };
    
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.loginUser = async (req) => {
    try {
        let data = req.body;
        let userData;
        if (!data.email || data.email == '') {
            return {
                status: 0,
                message: "Please enter the email"
            };
        }else if (!data.password || data.password == '') {
            return {
              status: 0,
              message: "Please enter the password"
            }
        } else {
            userData = await UserModel.findOne({ email : { $regex: new RegExp("^" + data.email.toLowerCase(), "i") } });
        }
        if (userData) {
            // let sendOtp = await sendOtpDuringRegistration(userData);
            // if (sendOtp.status == -1) {
            //     return {
            //         status: -1,
            //         message: sendOtp.message
            //     };
            // } else {
                // let user = sendOtp.data;
                
                let validPassword = await bcrypt.compare(data.password, userData.password);
                if (!validPassword) {
                  return {
                    status: 0,
                    message: "Invalid password"
                  };
                }
                if (userData.isBlocked === 1) {
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
                    message: "User found"
                };
            // }  
        } else {
            return {
            status: 0,
            message: "User does not exist"
            };
        }
    } catch (error) {
      throw new Error(error.message);
    }  
};

exports.updateBasicDetails = async (user, data) => {
  try {
    let { profile_pic, first_name, last_name, email, country_code, mobile_number } = data;
    
    if (!first_name || first_name == '')
      return { status: 0, message: "First name is required" };
    if (!email || email == '')
      return { status: 0, message: "Email is required" };
    if (!country_code || country_code == '')
      return { status: 0, message: "Country code is required" };
    if (!mobile_number || mobile_number == '')
      return { status: 0, message: "Mobile number is required" };
    if(user && user.is_user_verified == false){
      return { status: 0, message: "OTP is not verified, please verify to proceed with adding basic details" };
    }

    let profileData = {
      profile_pic,
      first_name,
      last_name,
      email,
      country_code,
      mobile_number,
      is_basic_details_added: true
    }

    let updateProfile = await UserModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(user._id)}, profileData, { new: true });
    if (!updateProfile) {
      return {
        status: -1,
        message: "Something went wrong please try after sometime"
      }
    }
    return { status: 1, message: "Basic details added successfully", data: profileData };
    
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.addShippingDetails = async (user, data) => {
  try {
    // let { floor_number, nearest_landmark, shipping_address,shipping_area, street_adress, building_name, city, country, postal_code } = data;
    // if (!shipping_address || shipping_address == '')
    //   return { status: 0, message: "Shipping address is required" };
    // if (!street_adress || street_adress == '')
    //   return { status: 0, message: "Street address is required" };
    // if (!building_name || building_name == '')
    //   return { status: 0, message: "Building name is required" };
    // if (!city || city == '')
    //   return { status: 0, message: "City is required" };
    // if (!country || country == '')
    //   return { status: 0, message: "Country is required" };
    // // if (!postal_code || postal_code == '')
    // //   return { status: 0, message: "Postal code is required" };

    if (!data.building_number|| data.building_number == '')
      return { status: 0, message: "Building number is required" };
    if (!data.flat_number|| data.flat_number == '')
      return { status: 0, message: "Flat number is required" };
    if (!data.street_number|| data.street_number == '')
      return { status: 0, message: "Street number is required" };
    if (!data.country|| data.country == '')
      return { status: 0, message: "Country is required" };
    if (!data.state|| data.state == '')
      return { status: 0, message: "State is required" };
    if (!data.city|| data.city == '')
      return { status: 0, message: "City is required" };
    if (!data.zip_code|| data.zip_code == '')
      return { status: 0, message: "Zip code is required" };

    if(user && user.is_user_verified == false){
      return { status: 0, message: "OTP is not verified, please verify to proceed with adding shipping details" };
    }
    if(user && user.is_basic_details_added == false){
      return { status: 0, message: "Please add basic details first to proceed with adding shipping details" };
    }
    if(user && user.is_user_type_details_added == false){
      return { status: 0, message: "Please add user type details first to proceed with adding shipping details" };
    }
    
    // let shippingData = {
    //   user_id: user._id,
    //   floor_number,
    //   shipping_address,
    //   street_adress,
    //   shipping_area,
    //   nearest_landmark,
    //   building_name,
    //   city,
    //   country,
    //   postal_code
    // }

    let dataToSave = {
      user_id: user._id,
      building_number: data.building_number,
      flat_number: data.flat_number,
      street_number: data.street_number,
      country: data.country,
      state: data.state,
      city: data.city,
      zip_code: data.zip_code,
      default_address: data.default_address
    }
    var res = await AddressModel.create(dataToSave)

    // let res = new UserShippingDetailsModel(Object.assign({}, shippingData));
    let updated = await res.save();

    if (!updated) {
      return {
        status: -1,
        message: "Something went wrong please try after sometime"
      }
    }
    let shipdata = {
      is_shipping_added: true
    }

    let updateProfile = await UserModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(user._id)}, shipdata, { new: true });
    if (!updateProfile) {
      return {
        status: -1,
        message: "Something went wrong"
      }
    }
    return { status: 1, message: "Shipping details added successfully", data: updated };
    
  } catch (error) {
    throw new Error(error.message);
  }
};
 
exports.addUserDetails = async (user, data) => {
  try {

    if(user && user.is_user_verified == false){
      return { status: 0, message: "OTP is not verified, please verify to proceed with adding user type details" };
    }
    if(user && user.is_basic_details_added == false){
      return { status: 0, message: "Please add basic details first to proceed with adding user type details" };
    }
    if (!data.user_type || data.user_type == '')
        return { status: 0, message: "User type is required" };

    if(data.user_type == 1){
      // if (!data.hospital_name || data.hospital_name == '')
      //   return { status: 0, message: "Hospital name is required" };
      if (!data.license_number || data.license_number == '')
        return { status: 0, message: "License number is required" };
      // if (!data.authorized_signature || data.authorized_signature == '')
      //   return { status: 0, message: "Authorized signature is required" };
      // if (!data.landline_extension_number || data.landline_extension_number == '')
      //   return { status: 0, message: "Extension number is required" };
      if (!data.user_city || data.user_city == '')
        return { status: 0, message: "City is required" };
      if (!data.user_country || data.user_country == '')
        return { status: 0, message: "Country is required" };
      if (!data.user_mobile_number || data.user_mobile_number == '')
        return { status: 0, message: "Mobile number is required" };
      if (!data.user_email || data.user_email == '')
        return { status: 0, message: "Email is required" };
      // if (!data.vat_number || data.vat_number == '')
      //   return { status: 0, message: "VAT number is required" };
    }else if(data.user_type == 2){
      if (!data.user_name || data.user_name == '')
        return { status: 0, message: "Name is required" };
      if (!data.user_surname || data.user_surname == '')
        return { status: 0, message: "Surname is required" };
      if (!data.university_name || data.university_name == '')
        return { status: 0, message: "University name is required" };
      // if (!data.student_id || data.student_id == '')
      //   return { status: 0, message: "Student Id is required" };
      // if (!data.landline_extension_number || data.landline_extension_number == '')
      //   return { status: 0, message: "Extension number is required" };
      if (!data.user_city || data.user_city == '')
        return { status: 0, message: "City is required" };
      if (!data.user_country || data.user_country == '')
        return { status: 0, message: "Country is required" };
      if (!data.user_mobile_number || data.user_mobile_number == '')
        return { status: 0, message: "Mobile number is required" };
      if (!data.user_email || data.user_email == '')
        return { status: 0, message: "Email is required" };
    }else if(data.user_type == 3){
      if (!data.user_name || data.user_name == '')
        return { status: 0, message: "Name is required" };
      if (!data.user_surname || data.user_surname == '')
        return { status: 0, message: "Surname is required" };
      // if (!data.landline_extension_number || data.landline_extension_number == '')
      //   return { status: 0, message: "Extension number is required" };
      if (!data.user_city || data.user_city == '')
        return { status: 0, message: "City is required" };
      if (!data.user_country || data.user_country == '')
        return { status: 0, message: "Country is required" };
      if (!data.user_mobile_number || data.user_mobile_number == '')
        return { status: 0, message: "Mobile number is required" };
      if (!data.user_email || data.user_email == '')
        return { status: 0, message: "Email is required" };
    }else if(data.user_type == 4){
      if (!data.clinic_name || data.clinic_name == '')
        return { status: 0, message: "Clinic name is required" };
      // if (!data.license_number || data.license_number == '')
      //   return { status: 0, message: "License number is required" };
      if (!data.manager_name || data.manager_name == '')
        return { status: 0, message: "Manager name is required" };
      // if (!data.nationality || data.nationality == '')
      //   return { status: 0, message: "Nationality is required" };
      // if (!data.workplace || data.workplace == '')
      //   return { status: 0, message: "Workplace is required" };
      if (!data.user_city || data.user_city == '')
        return { status: 0, message: "City is required" };
      if (!data.user_country || data.user_country == '')
        return { status: 0, message: "Country is required" };
      if (!data.office_number || data.office_number == '')
        return { status: 0, message: "Office number is required" };
      if (!data.user_mobile_number || data.user_mobile_number == '')
        return { status: 0, message: "Mobile number is required" };
      if (!data.user_email || data.user_email == '')
        return { status: 0, message: "Email is required" };
    }else if(data.user_type == 5){
      if (!data.user_name || data.user_name == '')
        return { status: 0, message: "Name is required" };
      // if (!data.license_number || data.license_number == '')
      //   return { status: 0, message: "License number is required" };
      if (!data.clinic_name || data.clinic_name == '')
        return { status: 0, message: "Clinic name is required" };
      // if (!data.workplace || data.workplace == '')
      //   return { status: 0, message: "Workplace is required" };
      if (!data.user_city || data.user_city == '')
        return { status: 0, message: "City is required" };
      if (!data.user_country || data.user_country == '')
        return { status: 0, message: "Country is required" };
      if (!data.office_number || data.office_number == '')
        return { status: 0, message: "Office number is required" };
      // if (!data.landline_extension_number || data.landline_extension_number == '')
      //   return { status: 0, message: "Extension number is required" };
      if (!data.user_mobile_number || data.user_mobile_number == '')
        return { status: 0, message: "Mobile number is required" };
      if (!data.user_email || data.user_email == '')
        return { status: 0, message: "Email is required" };
    }

      let dataToSave = {
        user_type: data.user_type,
        user_details: {
          hospital_name: data.hospital_name,
          license_number: data.license_number,
          authorized_signature: data.authorized_signature,
          landline_extension_number: data.landline_extension_number,
          manager_name: data.manager_name,
          user_city: data.user_city,
          user_country: data.user_country,
          user_mobile_number: data.user_mobile_number,
          user_email: data.user_email,
          vat_number: data.vat_number,
          user_country_code: data.user_country_code,
          user_name: data.user_name,
          user_surname: data.user_surname,
          university_name: data.university_name,
          student_id: data.student_id,
          nationality: data.nationality,
          workplace: data.workplace,
          office_number: data.office_number,
          clinic_name: data.clinic_name
        },
        is_user_type_details_added: true
      }

      let updateProfile = await UserModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(user._id)}, dataToSave, { new: true });
      if (!updateProfile) {
        return {
          status: -1,
          message: "Something went wrong"
        }
      }
      return { status: 1, message: "User type details added successfully", data: dataToSave };
    
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.loginWithSocialAccount = async (userData) => {
  if (!userData.social_id || userData.social_id == '') {
    return {
      status: -1,
      message: "Login failed"
    };
  }
  let isLogin = await UserModel.findOne({
    social_id: userData.social_id
  }).lean();
  if (!isLogin) {
    let dataToSave = {
      social_id: userData.social_id,
      first_name: userData.first_name,
      profile_pic: userData.profile_pic,
      email: userData.email,
      device_type: userData.device_type,
      device_token: userData.device_token,
      is_user_verified: true
    }
    let user = new UserModel(dataToSave);
    let saveUser = await user.save();
    if (!saveUser) {
      throw new Error("Login failed");
    }
    return {
      status: 1,
      data: saveUser,
      message: "Sign in successfully"
    };
  }
  userData.is_user_verified = true;
  
  let updateUser = await UserModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(isLogin._id)}, userData, { new: true });
  return {
    status: 1,
    data: updateUser,
    message: "User found"
  };

}

exports.getCategoryList = async (user) => {
  try {
    let category = await CategoryModel.find({ is_active: true },{ is_active:0, date_created:0 }).lean();
      if (!category) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      let dataToSend = {
        category: category
      }
      return { data: dataToSend, message: "Category fetch successfully", status: 1 };
   
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
      let dataToSend = {
        subCategory: subcategory
      }
      return { data: dataToSend, message: "Sub category fetch successfully", status: 1 };
   
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
      let dataToSend = {
        subSubCategory: subsubcategory
      }
      return { data: dataToSend, message: "Sub sub category fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getCouponList = async (user) => {
  try {
    let currentDate = Date.now();

      // let activeCoupon = await CouponModel.find({ start_date: {
        // '$gte': currentDate}, end_date: {'$lte': currentDate },  is_active: true },{ is_active:0, date_created:0 }).lean();
      let activeCoupon = await CouponModel.find({ end_date: {'$gte': currentDate },  is_active: true },{ is_active:0, date_created:0 }).lean();
      let expiredCoupon = await CouponModel.find({ end_date: {'$lte': currentDate },  is_active: true },{ is_active:0, date_created:0 }).lean();
      if (!activeCoupon) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      if (!expiredCoupon) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      let dataToSend = {
        availableCoupon: activeCoupon,
        usedCoupon: [],
        expiredCoupon: expiredCoupon
      }
      return { data: dataToSend, message: "Coupon fetch successfully", status: 1 };

    } catch (err) {
    throw new Error(err.message);
  }
};

exports.getBrandList = async (user) => {
  try {
    // let categoryId = "61b6f4b6fa393febfb3552d8";

    // let brandList = await SubCategoryModel.find({ category_id: mongoose.Types.ObjectId(categoryId), is_active: true },{ is_active:0, date_created:0, category_id:0 }).lean();
    //   if (!brandList) {
    //     return { status: 0, message: "something went wrong try after sometime" };
    //   }
    //   let brandData = [];
    //   if(brandList.length > 0){
    //     for(let i=0; i < brandList.length; i++){
    //       brandData.push({
    //         id: brandList[i]._id,
    //         brand_name: brandList[i].subcategory_name,
    //         brand_image: brandList[i].subcategory_image
    //       })
    //     }
    //   }

    let currentDate = Date.now();
    // 14/6/22
    let brandList = await BrandModel.find({ is_active: true, $and: [{ start_date: { $lte: currentDate }},{ end_date: { $gte: currentDate }} ] }).lean();
    
      let dataToSend = {
        newBrand: brandList
      }
      return { data: dataToSend, message: "New brands list fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.searchSubCategory = async (data) => {
  try {
    if (!data.category_id || data.category_id == '')
      return { status: 0, message: "Category id is required" };

    let categoryData = await CategoryModel.findOne({
      _id: mongoose.Types.ObjectId(data.category_id), is_active: true
    });
    let subCategoryData;
    if(categoryData){
      if (!data.searchKey || data.searchKey == '') {
        subCategoryData = await SubCategoryModel.find({
          category_id: mongoose.Types.ObjectId(data.category_id), is_active: true
        });
      } else {
        subCategoryData = await SubCategoryModel.find({
          $and: [{
            'subcategory_name': {
              $regex: data.searchKey,
              $options: 'i'
            }
          }, {
            is_active: true
          },{
            category_id: mongoose.Types.ObjectId(data.category_id)
          }]
        });
      }
      return { data: subCategoryData, message: "Subcategory list fetch successfully", status: 1 };
    }else{
      return { status: 0, message: "Category does not exist" };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.searchSubSubCategory = async (data) => {
  try {
    if (!data.subcategory_id || data.subcategory_id == '')
      return { status: 0, message: "Subcategory id is required" };

    let subcategoryData = await SubCategoryModel.findOne({
      _id: mongoose.Types.ObjectId(data.subcategory_id), is_active: true
    });
    let subSubCategoryData;
    if(subcategoryData){
      if (!data.searchKey || data.searchKey == '') {
        subSubCategoryData = await SubSubCategoryModel.find({
          subcategory_id: mongoose.Types.ObjectId(data.subcategory_id), is_active: true
        });
      } else {
        subSubCategoryData = await SubSubCategoryModel.find({
          $and: [{
            'sub_subcategory_name': {
              $regex: data.searchKey,
              $options: 'i'
            }
          }, {
            is_active: true
          },{
            subcategory_id: mongoose.Types.ObjectId(data.subcategory_id)
          }]
        });
      }
      return { data: subSubCategoryData, message: "Subcategory list fetch successfully", status: 1 };
    }else{
      return { status: 0, message: "Subcategory does not exist" };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getProductList = async (data, user) => {
  try {
    if (!data.subSubCategoryId || data.subSubCategoryId == '')
      return { status: 0, message: "Subcategory id is required" };

    let products = await ProductModel.find({ sub_subcategory: data.subSubCategoryId, is_active: true, is_blocked: 0 }).select('product_name product_image is_favourite product_price offer_applicable price_after_offer').populate('seller_id', 'store_name').lean();
    // var products = await ProductModel.aggregate([
    //     { "$match": { sub_subcategory: mongoose.Types.ObjectId(data.subSubCategoryId) } },
    //     { "$match": { is_active: true } },
    //     { "$match": { is_blocked: 0 } },
    //     {
    //         "$lookup": {
    //             from: 'rating',
    //             localField: '_id',
    //             foreignField: 'product_id',
    //             as: 'ratingReview'
    //         }
    //     },{
    //       $unwind: {
    //         path: '$ratingReview',
    //         preserveNullAndEmptyArrays: true
    //       }
    //     }, {
    //       $project: {
    //         "product_name": "$product_name",
    //         "product_image": "$product_image",
    //         "is_favourite": "$is_favourite",
    //         "product_price": "$product_price",
    //         "offer_applicable": "$offer_applicable",
    //         "rating_point": "$ratingReview.rating_point",
    //         "review": "$ratingReview.review",
    //         "image": "$ratingReview.image",
    //       }
    //     }
    // ])
    if(products.length > 0){
      for (let checkRat = 0; checkRat < products.length; checkRat++) {
        var findRating = await ratingModel.find({ product_id: mongoose.Types.ObjectId(products[checkRat]._id) }, { rating_point: 1 }, { lean: true })
        var totalRating = 0;
        var avgRating = 0;
        if(findRating.length > 0){
          for (let index = 0; index < (findRating || []).length; index++) {
            var element = findRating[index]
            totalRating = totalRating + element.rating_point
          }
          avgRating = ((totalRating) / (findRating || []).length) 
        }
       
        products[checkRat].averageRating = avgRating ? avgRating : totalRating
      }
    }

    if (!products) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      let dataToSend = {
        productList: products
      }
      return { data: dataToSend, message: "Product list fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.addProductRating = async (user, data) => {
  try {
      if (!user._id || user._id == '')
        return { status: 0, message: "Login first to rate the product" };
      if (!data.order_id|| data.order_id == '')
        return { status: 0, message: "Order id is required" };
      if (!data.product_id|| data.product_id == '')
        return { status: 0, message: "Product id is required" };
      if (!data.rating_point|| data.rating_point == '')
        return { status: 0, message: "Rating point is required" };

      let ratingData = await ratingModel.find({ user_id: user._id, product_id: data.product_id, order_id: data.order_id });
      if (ratingData.length == 0) {
        let dataToSave = {
          user_id: user._id,
          product_id: data.product_id,
          order_id: data.order_id,
          rating_point: data.rating_point,
          review: data.review
        }
        // if(typeof (data.image) == "string") {
        //   JSON.parse(data.image)
        // }
        // dataToSave['image']=  data.image;

        var ratingdata = await ratingModel.create(dataToSave)
        ratingdata.save();

        if (!ratingdata) {
          return {
            status: 0,
            message: 'Unable to add rating'
          }
        }

        let updateOrder = await OrderModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(data.order_id)}, { is_rated: true }, { new: true });
        if (!updateOrder) {
          return {
            status: 0,
            message: 'Unable to update order'
          }
        }

        let product = await ProductModel.findOne({ _id: mongoose.Types.ObjectId(data.product_id) }, { product_name: 1, seller_id: 1 });

        /* Code for notification start to User */
         let title = "Product Rated";
         let Notificationbody = "You have given " + data.rating_point + " rating to " + product.product_name + "";
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
         /* Code for notification end */

        /* Code for notification start to Seller */
         let Title = "Product Rated";
         let NotificationBody = "Your " + product.product_name + " has been rated "  + data.rating_point + "";
        //  let device_type = 3;
         let Notification = {
           user_id: product.seller_id,
           title: Title,
           body: NotificationBody,
           type: 1,
           created_at: Date.now()
         }
         let send_notification = await NotificationModel.create(Notification);
         send_notification.save();
         
         /* Code for notification start to Admin */
         let admin = await AdminModel.findOne({}, { email: 1, _id: 1 });
         let adminTitle = "Product Rated";
         let NotiBody = product.product_name + " has been rated "  + data.rating_point + " by " + user.first_name;
       
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

        return { data: ratingdata, message: "Rating added successfully", status: 1 };
      } else {
        return {
          status: 0,
          message: 'Already rated'
        }
      }
  }catch (err) {
    throw new Error(err.message);
  }
};

exports.getProductDetails = async (user, data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "Product id is required" };

    let product = await ProductModel.findOne({ _id: mongoose.Types.ObjectId(data._id), is_active: true, is_blocked: 0 }).select('product_name product_image is_favourite product_price offer_applicable product_description product_expiry_date return_replacement_applicable maxm_replacement_days maxm_return_days price_after_offer brand_name product_identification manufacturing_company temp_control stock_available').populate('seller_id', 'store_name').lean();

    if (!product) {
        return { status: 0, message: "Product does not exist" };
    }

    var findRating = await ratingModel.find({ product_id: mongoose.Types.ObjectId(data._id) }, { rating_point: 1, review: 1 }, { lean: true })
    var totalRating = 0;
    var avgRating = 0;
    if(findRating.length > 0){
      for (let index = 0; index < (findRating || []).length; index++) {
        var element = findRating[index]
        totalRating = totalRating + element.rating_point
      }
      avgRating = ((totalRating) / (findRating || []).length) 
    }
    product.totalReview = (findRating || []).length
    product.averageRating = avgRating ? avgRating : totalRating
      
    return { data: product, message: "Product fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getFavoriteProductList = async (user) => {
  try {

    let products = await ProductModel.find({ is_active: true, is_blocked: 0, is_favourite: true }).select('product_name product_image is_favourite product_price offer_applicable price_after_offer').populate('seller_id', 'store_name').lean();
   
    if(products.length > 0){
      for (let checkRat = 0; checkRat < products.length; checkRat++) {
        var findRating = await ratingModel.find({ product_id: mongoose.Types.ObjectId(products[checkRat]._id) }, { rating_point: 1 }, { lean: true })
        var totalRating = 0;
        var avgRating = 0;
        if(findRating.length > 0){
          for (let index = 0; index < (findRating || []).length; index++) {
            var element = findRating[index]
            totalRating = totalRating + element.rating_point
          }
          avgRating = ((totalRating) / (findRating || []).length) 
        }
       
        products[checkRat].averageRating = avgRating ? avgRating : totalRating
      }
    }

    if (!products) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      let dataToSend = {
        favouriteProductList: products
      }
      return { data: dataToSend, message: "Favourite product list fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.changeFavoriteStatus = async (data, user) => {
  try {
    if (!data.productId || data.productId == '') 
      return { status: 0, message: "Product id is required" };

    let product = await ProductModel.findByIdAndUpdate(mongoose.Types.ObjectId(data.productId), { is_favourite: data.isFavourite }, { new: true });
    if (!product) {
      return { status: -1, message: "Something went Wrong,Please try later." };
    }
    let stat = product.is_favourite == true ? 'added to' : 'remove from';
    return { status: 1, message: `Product ${stat} favourite successfully` };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.searchProductList = async (data) => {
  try {
    if (!data.subSubCategoryId || data.subSubCategoryId == '')
      return { status: 0, message: "Subcategory id is required" };

    let subsubcategoryData = await SubSubCategoryModel.findOne({
      _id: mongoose.Types.ObjectId(data.subSubCategoryId), is_active: true
    });
    let products = [];
    if(subsubcategoryData){
      if (!data.searchKey || data.searchKey == '') {
        products = await ProductModel.find({
          sub_subcategory: mongoose.Types.ObjectId(data.subSubCategoryId), is_active: true, is_blocked: 0
        }).select('product_name product_image is_favourite product_price offer_applicable price_after_offer').populate('seller_id', 'store_name').lean();
      } else {
        products = await ProductModel.find({
          $and: [{
            'product_name': {
              $regex: data.searchKey,
              $options: 'i'
            }
          },{
            is_active: true
          },{
            is_blocked: 0
          },{
            sub_subcategory: mongoose.Types.ObjectId(data.subSubCategoryId)
          }]
        }).select('product_name product_image is_favourite product_price offer_applicable price_after_offer').populate('seller_id', 'store_name').lean();
      }
      
      if(products.length > 0){
        for (let checkRat = 0; checkRat < products.length; checkRat++) {
          var findRating = await ratingModel.find({ product_id: mongoose.Types.ObjectId(products[checkRat]._id) }, { rating_point: 1 }, { lean: true })
          var totalRating = 0;
          var avgRating = 0;
          if(findRating.length > 0){
            for (let index = 0; index < (findRating || []).length; index++) {
              var element = findRating[index]
              totalRating = totalRating + element.rating_point
            }
            avgRating = ((totalRating) / (findRating || []).length) 
          }
        
          products[checkRat].averageRating = avgRating ? avgRating : totalRating
        }
      }

      if (!products) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      let dataToSend = {
        productList: products
      }
      return { data: dataToSend, message: "Product list fetch successfully", status: 1 };
    }else{
      return { status: 0, message: "Subsubcategory does not exist" };
    }
   
  } catch (err) {
    throw new Error(err.message);
  }
};


exports.searchFavouriteProducts = async (data) => {
  try {
      let products = [];
      if (!data.searchKey || data.searchKey == '') {
        products = await ProductModel.find({ is_active: true, is_blocked: 0, is_favourite: true }).select('product_name product_image is_favourite product_price offer_applicable price_after_offer').populate('seller_id', 'store_name').lean();
      } else {
        products = await ProductModel.find({
          $and: [{
            'product_name': {
              $regex: data.searchKey,
              $options: 'i'
            }
          },{
            is_active: true
          },{
            is_blocked: 0
          },{
            is_favourite: true
          }]
        }).select('product_name product_image is_favourite product_price offer_applicable price_after_offer').populate('seller_id', 'store_name').lean();
      }
      
      if(products.length > 0){
        for (let checkRat = 0; checkRat < products.length; checkRat++) {
          var findRating = await ratingModel.find({ product_id: mongoose.Types.ObjectId(products[checkRat]._id) }, { rating_point: 1 }, { lean: true })
          var totalRating = 0;
          var avgRating = 0;
          if(findRating.length > 0){
            for (let index = 0; index < (findRating || []).length; index++) {
              var element = findRating[index]
              totalRating = totalRating + element.rating_point
            }
            avgRating = ((totalRating) / (findRating || []).length) 
          }
        
          products[checkRat].averageRating = avgRating ? avgRating : totalRating
        }
      }

      if (!products) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      let dataToSend = {
        favouriteProductList: products
      }
      return { data: dataToSend, message: "Product list fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getAllAdvertisemt = async (user) => {
  try {
    let currentDate = Date.now();
    let advertisements = await AdvertisementModel.find({ is_active: true, $and: [{ start_date: { $lte: currentDate }},{ end_date: { $gte: currentDate }} ] }).lean();
    if (!advertisements) {
      return { status: -1, message: "Something went wrong, please try later" };
    }

    let dataToSend = {
      adList: advertisements
    }
    
    return { status: 1, message: `Advertisement list fetch successfully` , data: dataToSend };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.addProductToCart = async (user, data) => {
  try {
    if (!data.product_id || data.product_id == '') {
      return {
        status: -1,
        message: "Unsufficient perameter"
      };
    }

    let cartData = await CartModel.find({
      $and: [{
        user_id: mongoose.Types.ObjectId(user._id)
      },{
        is_deleted: false
      },{
        $or: [{
          status :0
        },{
         status :1
       }]
     }]
    });
    var currency = '';
    for(let i=0; i < cartData.length; i++){
      currency = cartData[i].currency
    }

    let inCart = await CartModel.findOne({
      $and: [{
        product_id: mongoose.Types.ObjectId(data.product_id)
      }, {
        user_id: mongoose.Types.ObjectId(user._id)
      },{
        is_deleted: false
      },{
          $or: [{
            status :0
          },{
          status :1
        }]
      },{
        order_id: { $exists: true }
      }]
    });
    if (inCart) {
      /* check for stock available start */
      let productData = await ProductModel.findOne({ _id: mongoose.Types.ObjectId(data.product_id)}, { stock_available: 1 }).lean();
      if(!productData){
        return {
          status: 0,
          message: "Product does not exist"
        }
      }
      if(productData && productData.stock_available <= inCart.quantity){
        return {
          status: 0,
          message: "Only "+ productData.stock_available + " units of product is available for sale"
        }
      }
      /* check for stock available end */

      inCart.quantity = inCart.quantity + parseInt(data.quantity);
      inCart.price = inCart.unit_price * inCart.quantity;
      inCart.modified_at = Date.now();
      inCart.status = 0;
      let cart = await inCart.save();
      if (!cart) {
        return {
          status: -1,
          message: "Something went Wrong, please try later"
        }
      }
      let countCart = await CartModel.count({
        $and: [{
          user_id: mongoose.Types.ObjectId(user._id)
        }, {
          is_deleted: false
        }, {
           $or: [{
             status :0
           },{
            status :1
          }]
        }]
      })
      let cartCount = {
        count: countCart
      }
      return {
        status: 1,
        message: "Product added to cart successfully",
        data: cartCount
      };
    } else {
      let product = await ProductModel.findOne({
        _id: data.product_id, is_active: true
      }).select("price_after_offer product_currency seller_id stock_available").lean();
      if (!product) {
        return {
          status: 0,
          message: "Product does not exist or product has been deleted"
        }
      }

      /* check for stock available start */
      // if(product && product.stock_available <= data.quantity){
      if(product && product.stock_available < data.quantity){
        return {
          status: 0,
          message: "Only "+ product.stock_available + " units of product is available for sale"
        }
      }
      /* check for stock available end */

      var saveToDb = {
        user_id: user._id,
        product_id: product._id,
        seller_id: product.seller_id,
        unit_price: product.price_after_offer,
        quantity: parseInt(data.quantity),
        price: parseInt(data.quantity) * parseFloat(product.price_after_offer),
        status: 0,
        currency: product.product_currency,
        note: data.note
      }

      if(cartData.length > 0){
        if (currency == product.product_currency) {
          let cart = await CartModel.create(saveToDb);
          cart.save();
          if (!cart) {
            return {
              status: -1,
              message: "Unable to add product to cart"
            }
          }
          let countCart = await CartModel.count({
            $and: [{
              user_id: mongoose.Types.ObjectId(user._id)
            }, {
              is_deleted: false
            }, {
              $or: [{
                status :0
              },{
                status :1
              }]
            }]
          })
          let cartCount = {
            count: countCart
          }
          return {
            status: 1,
            message: "Product added to cart successfully",
            data: cartCount
          };
        }else{
          return {
            status: 0,
            message: "Currency of cart products and this product should be same"
          }
        }
      }else{
        let cart = await CartModel.create(saveToDb);
        cart.save();
        if (!cart) {
          return {
            status: -1,
            message: "Unable to add product to cart"
          }
        }
         let countCart = await CartModel.count({
            $and: [{
              user_id: mongoose.Types.ObjectId(user._id)
            }, {
              is_deleted: false
            }, {
              $or: [{
                status :0
              },{
                status :1
              }]
            }]
          })
          let cartCount = {
            count: countCart
          }
        return {
          status: 1,
          message: "Product added to cart successfully",
          data: cartCount
        };
      }

    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.showCartProducts = async (user, data) => {
  try {
    if (!user || user._id == '') {
      return {
        status: 0,
        message: "Please login to get cart products"
      };
    }
    var total = 0;
    var cart = [];
    if(data.type == "cart"){
      cart = await CartModel.find({
        $and: [{
          user_id: mongoose.Types.ObjectId(user._id)
        }, {
          is_deleted: false
        }, {
           $or: [{
             status :0
           },{
            status :1
          }]
        }]
      }).select('quantity user_id product_id price unit_price').lean().populate('user_id', "first_name last_name").populate('product_id', "product_name product_description product_image product_price price_after_offer offer_applicable product_currency").lean();
    }else{
      if (!data.product_id || data.product_id == '') {
        return {
          status: 0,
          message: "Product id is required"
        };
      }
      cart = await CartModel.find({
        $and: [{
          user_id: mongoose.Types.ObjectId(user._id)
        },{
          product_id: mongoose.Types.ObjectId(data.product_id)
        }, {
          is_deleted: false
        },  {
          $or: [{
            status :1
          },{
           status :2
         }]
       }]
      }).select('quantity user_id product_id price unit_price').lean().populate('user_id', "first_name last_name").populate('product_id', "product_name product_description product_image product_price price_after_offer offer_applicable product_currency").lean();
      // cart = await BuyModel.find({ user_id: mongoose.Types.ObjectId(user._id) }).select('quantity user_id product_id price unit_price').lean().populate('user_id', "first_name last_name").populate('product_id', "product_name product_description product_image product_price price_after_offer offer_applicable").lean();
    }
    if (!cart) {
      return {
        status: -1,
        message: "Something went wrong, Please try later."
      }
    }
    if (cart.length > 0) {
      cartData = await _.map(cart, (element) => {
        total = total + element.price;
      })
    }

    var cartLength = cart.length;
    return {
      status: 1,
      message: "Cart products fetch successfully",
      data: {
          cartRecord: cart,
        ...{
          count: cartLength
        },
        ...{
          totalPrice: total
        }
      }
    };

  } catch (err) {
    throw new Error(err.message);
  }
};


exports.changeProductQuantity = async (user, data) => {
  try {
    if (!data.id || data.id == '') {
      return {
        status: 0,
        message: "Unsufficient perameter"
      };
    }


    let cart = await CartModel.findOne({
      _id: mongoose.Types.ObjectId(data.id)
    });
    if (!cart) {
      return {
        status: 0,
        message: "Unable to change product quantity"
      }
    }

    if (data.status == 0) {
      if (cart.quantity == 1) {
        cart.quantity = 0;
        cart.is_deleted = true;
        cart.modified_at = Date.now();
        let cartData = await cart.save();
        if (!cartData) {
          return {
            status: -1,
            message: "Something went wrong, please try later"
          }
        }
        return {
          status: 1,
          message: "Item removed successfully."
        };
      } else {
        cart.quantity = cart.quantity - 1;
        cart.price = cart.unit_price * cart.quantity;
        cart.modified_at = Date.now();
        let cartData = await cart.save();
        if (!cartData) {
          return {
            status: -1,
            message: "Something went wrong, Please try later"
          }
        }
        return {
          status: 1,
          message: "Item updated successfully"
        };
      }
    } else {
      let productData = await ProductModel.findOne({ _id: mongoose.Types.ObjectId(cart.product_id)}, { stock_available: 1 }).lean();
      if(!productData){
        return {
          status: 0,
          message: "Product does not exist"
        }
      }
      if(productData && productData.stock_available < cart.quantity){
        return {
          status: 0,
          message: "Only "+ productData.stock_available + " units of product is available for sale"
        }
      }
      cart.quantity = cart.quantity + 1;
      cart.price = cart.unit_price * cart.quantity;
      cart.modified_at = Date.now();
      let cartData = await cart.save();
      if (!cartData) {
        return {
          status: -1,
          message: "Something went wrong, please try later"
        }
      }
      return {
        status: 1,
        message: "Item updated successfully"
      };
    }

  } catch (err) {
    throw new Error(err.message);
  }
};

exports.removeProductFromCart = async (data) => {
  try {
    if (!data.id || data.id == '') {
      return {
        status: -1,
        message: "Unsufficient perameter"
      };
    }

    let cart = await CartModel.updateOne({
      "_id": mongoose.Types.ObjectId(data.id)
    }, {
      $set: {
        "is_deleted": true
      }
    });

    if (!cart) {
      return {
        status: -1,
        message: "Something went wrong, please try later"
      };
    }
    return {
      status: 1,
      message: "Item removed successfully"
    };

  } catch (err) {
    throw new Error(err.message);
  }
};


exports.moveProductToWishlist = async (data) => {
  try {
    if (!data.product_id || data.product_id == '') {
      return {
        status: 0,
        message: "Product id is required"
      };
    }
    if (!data.cart_id || data.cart_id == '') {
      return {
        status: 0,
        message: "Cart id is required"
      };
    }

    let product = await ProductModel.findByIdAndUpdate(mongoose.Types.ObjectId(data.product_id), { is_favourite: true }, { new: true });
    if (!product) {
      return {
        status: 0,
        message: "Something went wrong, please try later"
      };
    }
    let cart = await CartModel.findByIdAndUpdate(mongoose.Types.ObjectId(data.cart_id), { status: 1 }, { new: true });
    if (!cart) {
      return {
        status: 0,
        message: "Something went wrong, please try later"
      };
    }
    return {
      status: 1,
      message: "Item added to wishlist successfully"
    };

  } catch (err) {
    throw new Error(err.message);
  }
};


exports.addAddress = async (user, data) => {
  try {
      if (!user._id || user._id == '')
        return { status: 0, message: "Login first to add the address" };
      // if (!data.building_number|| data.building_number == '')
      //   return { status: 0, message: "Building number is required" };
      if (!data.flat_number|| data.flat_number == '')
        return { status: 0, message: "Flat number is required" };
      if (!data.street_number|| data.street_number == '')
        return { status: 0, message: "Street number is required" };
      if (!data.country|| data.country == '')
        return { status: 0, message: "Country is required" };
      if (!data.state|| data.state == '')
        return { status: 0, message: "State is required" };
      if (!data.city|| data.city == '')
        return { status: 0, message: "City is required" };
      if (!data.zip_code|| data.zip_code == '')
        return { status: 0, message: "Zip code is required" };

      let dataToSave = {
        user_id: user._id,
        building_number: data.building_number,
        flat_number: data.flat_number,
        street_number: data.street_number,
        country: data.country,
        state: data.state,
        city: data.city,
        zip_code: data.zip_code,
        default_address: data.default_address
      }

      var addressdata = await AddressModel.create(dataToSave)
      addressdata.save();

      if (!addressdata) {
        return {
          status: 0,
          message: 'Something went wrong'
        }
      }
      return { data: addressdata, message: "Address added successfully", status: 1 };
      
  }catch (err) {
    throw new Error(err.message);
  }
};

exports.editAddress = async (user, data) => {
  try {
      if (!user._id || user._id == '')
        return { status: 0, message: "Login first to add the address" };
      if (!data._id || data._id == '')
        return { status: 0, message: "Address id is required" };
      // if (!data.building_number|| data.building_number == '')
      //   return { status: 0, message: "Building number is required" };
      if (!data.flat_number|| data.flat_number == '')
        return { status: 0, message: "Flat number is required" };
      if (!data.street_number|| data.street_number == '')
        return { status: 0, message: "Street number is required" };
      if (!data.country|| data.country == '')
        return { status: 0, message: "Country is required" };
      if (!data.state|| data.state == '')
        return { status: 0, message: "State is required" };
      if (!data.city|| data.city == '')
        return { status: 0, message: "City is required" };
      if (!data.zip_code|| data.zip_code == '')
        return { status: 0, message: "Zip code is required" };

      let address = await AddressModel.findOne({ _id: mongoose.Types.ObjectId(data._id), is_deleted: false });
      if(!address){
        return { status: 0, message: "Address does not exist" };
      }

      let dataToUpdate = {
        user_id: user._id,
        building_number: data.building_number,
        flat_number: data.flat_number,
        street_number: data.street_number,
        country: data.country,
        state: data.state,
        city: data.city,
        zip_code: data.zip_code,
        default_address: data.default_address
      }

      let updateAddress = await AddressModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(data._id)}, dataToUpdate, { new: true });

      if (!updateAddress) {
        return {
          status: 0,
          message: 'Something went wrong'
        }
      }
      return { data: updateAddress, message: "Address updated successfully", status: 1 };
      
  }catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteAddress = async (user, data) => {
  try {
    if (!user._id || user._id == '')
      return { status: 0, message: "User does not exist" };
    if (!data._id || data._id == '')
      return { status: 0, message: "Address id is required" };

    let address = await AddressModel.findOneAndUpdate({ _id: data._id }, { $set: { is_deleted: true } }, { new: true })
      if (!address) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      
      return { message: "Address deleted successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getAllAddressList = async (user) => {
  try {
    if (!user._id || user._id == '')
      return { status: 0, message: "User does not exist" };

    let addressList = await AddressModel.find({ user_id: mongoose.Types.ObjectId(user._id), is_deleted: false }).lean();
      if (!addressList) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      let dataToSend = {
        addressList: addressList
      }
      return { data: dataToSend, message: "Address list fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.buyProduct = async (user, data) => {
  try {
    if (!data.productId || data.productId == '') {
      return {
        status: 0,
        message: "Insufficient perameter"
      };
    }
    if (!data.quantity || data.quantity == '') {
      return {
        status: 0,
        message: "Please provide quantity"
      }
    }

    // let inCart = await BuyModel.findOne({
    //   user_id: user._id
    // }).lean();
    // if (inCart) {
    //   let removePreviousBuy = await BuyModel.findOneAndRemove({
    //     _id: mongoose.Types.ObjectId(inCart._id)
    //   });
    //   if (!removePreviousBuy) {
    //     return {
    //       status: -1,
    //       message: "Something went Wrong, please try later"
    //     }
    //   }

    //   let product = await ProductModel.findOne({
    //     _id: data.productId
    //   }).select("price_after_offer").lean();
    //   if (!product) {
    //     return {
    //       status: -1,
    //       message: "Something went Wrong, please try later"
    //     }
    //   }

    //   var saveToDb = {
    //     user_id: user._id,
    //     product_id: product._id,
    //     unit_price: product.price_after_offer,
    //     quantity: parseInt(data.quantity),
    //     price: parseInt(data.quantity) * parseFloat(product.price_after_offer)
    //   }

    //   let cart = await BuyModel.create(saveToDb);
    //   cart.save();
    //   if (!cart) {
    //     return {
    //       status: -1,
    //       message: "Something went wrong, please try later"
    //     }
    //   }
    //   return {
    //     status: 1,
    //     message: "Add to buy successfully",
    //     data: cart
    //   };
    // } else {
    //   let product = await ProductModel.findOne({
    //     _id: data.productId
    //   }).select("price_after_offer").lean();
    //   if (!product) {
    //     return {
    //       status: -1,
    //       message: "Something went Wrong, please try later"
    //     }
    //   }

    //   var saveToDb = {
    //     user_id: user._id,
    //     product_id: product._id,
    //     unit_price: product.price_after_offer,
    //     quantity: parseInt(data.quantity),
    //     price: parseInt(data.quantity) * parseFloat(product.price_after_offer)
    //   }
      
    //   let cart = await BuyModel.create(saveToDb);
    //   cart.save();
    //   if (!cart) {
    //     return {
    //       status: -1,
    //       message: "Something went wrong, please try later"
    //     }
    //   }
    //   return {
    //     status: 1,
    //     message: "Add to buy successfully",
    //     data: cart
    //   };
    // }

    let inCart = await CartModel.findOne({
      $and: [{
        product_id: mongoose.Types.ObjectId(data.productId)
      }, {
        user_id: mongoose.Types.ObjectId(user._id)
      },{
        is_deleted: false
      },{
        status: 2
      },{
        order_id: { $exists: true }
      }]
    });

    let productData = await ProductModel.findOne({ _id: mongoose.Types.ObjectId(data.productId)}, { stock_available: 1 }).lean();
    if(!productData){
      return {
        status: 0,
        message: "Product does not exist"
      }
    }

    if (inCart) {
      inCart.quantity = inCart.quantity + parseInt(data.quantity);
      inCart.price = inCart.unit_price * inCart.quantity;
      inCart.modified_at = Date.now();
      inCart.status = 2;

      //check quantity available
      if(productData && productData.stock_available < inCart.quantity){
        return {
          status: 0,
          message: "Only "+ productData.stock_available + " units of product is available for sale"
        }
      }

      let cart = await inCart.save();
      if (!cart) {
        return {
          status: -1,
          message: "Something went Wrong, please try later"
        }
      }
      return {
        status: 1,
        message: "Product added to buy successfully"
      };
    } else {

      let product = await ProductModel.findOne({
        _id: data.productId
      }).select("price_after_offer product_currency seller_id").lean();
      if (!product) {
        return {
          status: 0,
          message: "Something went Wrong, please try later"
        }
      }

      var saveToDb = {
        user_id: user._id,
        product_id: product._id,
        seller_id: product.seller_id,
        unit_price: product.price_after_offer,
        quantity: parseInt(data.quantity),
        price: parseInt(data.quantity) * parseFloat(product.price_after_offer),
        status: 2,
        currency: product.product_currency,
        note: data.note
      }
      
      //check quantity available
      if(productData && productData.stock_available < parseInt(data.quantity)){
        return {
          status: 0,
          message: "Only "+ productData.stock_available + " units of product is available for sale"
        }
      }

      let cart = await CartModel.create(saveToDb);
      cart.save();
      if (!cart) {
        return {
          status: 0,
          message: "Something went wrong, please try later"
        }
      }
      return {
        status: 1,
        message: "Product added to buy successfully"
      };

    }
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.setDefaultAddress = async (user, data) => {
  try {
    if (!user._id || user._id == '')
      return { status: 0, message: "User does not exist" };
    if (!data._id || data._id == '')
      return { status: 0, message: "Address id is required" };

    let userAddress = await AddressModel.find({ user_id: mongoose.Types.ObjectId(user._id), is_deleted: false }).lean();
    if(userAddress.length > 0){
      for(let i=0; i < userAddress.length; i++){
        if(userAddress[i].default_address == 1){
          let addressId = userAddress[i]._id;
          let removeDefaultAddress = await AddressModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(addressId) }, { $set: { default_address: 0 } }, { new: true })
        }
      }
    }
    let address = await AddressModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data._id) }, { $set: { default_address: 1 } }, { new: true })
      if (!address) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      
      return { message: "Address set to default successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.placeProductsOrder = async (user, data) => {
  try {
    if (!user._id || user._id == '')
      return { status: 0, message: "User does not exist" };
    if (!data.cart_id || data.cart_id.length == 0)
      return { status: 0, message: "Cart id is required" };
    if (!data.price || data.price == '')
      return { status: 0, message: "Order price is required" };
    if (!data.address_id || data.address_id == '')
      return { status: 0, message: "Address id is required" };
    if (!data.payment_options || data.payment_options == '')
      return { status: 0, message: "Payment option is required" };
    if (!data.quantity || data.quantity == '')
      return { status: 0, message: "Product quantity is required" };
    if (!data.currency || data.currency == '')
      return { status: 0, message: "Order currency is required" };
    if (!data.tax_amount || data.tax_amount == '')
      return { status: 0, message: "Tax amount is required" };
       
    var couponData;
    if(data.coupon_code){
       couponData = await CouponModel.findOne({ name: data.coupon_code },{ _id: 1 }).lean();
    }
    let unique_booking_id = (generateUniqueId({length: 7,useLetters: true}).toUpperCase());

    if(data.payment_options == "CREDITLINE"){
      if(data.cart_id.length > 0){
        let orderIds = [];
        let sellerIds = [];
        for(let i = 0; i < data.cart_id.length; i++){
          // let deliveryCharge = (parseFloat(data.delivery_charge) / data.cart_id.length).toFixed(2);
          // let taxAmount = (parseFloat(data.tax_amount) / data.cart_id.length).toFixed(2);
          // let discountAmount = 0;
          // if(parseFloat(data.discount_amount) > 0){
          //   discountAmount = (parseFloat(data.discount_amount) / data.cart_id.length).toFixed(2);
          // }

          let cartData = await CartModel.findOne({ _id: mongoose.Types.ObjectId(data.cart_id[i]) },{ product_id: 1, quantity: 1 }).populate('product_id', 'price_after_offer').lean();
          let productPrice =  parseFloat(cartData.product_id.price_after_offer);
          let productQuantity = parseInt(cartData.quantity);

          
          let totalAmount = (productPrice * productQuantity).toFixed(2);
          
          let dataToSave = {
            user_id: user._id,
            cart_id: data.cart_id[i],
            price: parseFloat(totalAmount),
            quantity: productQuantity,
            order_id: generateUniqueId({ length: 7, useLetters: true }).toUpperCase(),
            address_id: data.address_id,
            payment_options: data.payment_options,
            coupon_id: couponData ? couponData._id : null,
            currency: data.currency,
            status: 1
          }

          let res = new OrderModel(Object.assign({}, dataToSave));
          let saveOrder = await res.save();
          if (!saveOrder) {
            return {
              status: 0,
              message: "Unable to place order"
            }
          }

          let orderId = saveOrder._id;
          let cart_id = data.cart_id[i];
          orderIds.push(orderId);
          sellerIds.push(cartData.seller_id)
          let updateCart = await CartModel.updateOne({ _id: mongoose.Types.ObjectId(cart_id) }, { status: 3, order_id: orderId },{new: true});
          if (!updateCart) { 
            return {
              status: 0,
              message: "Unable to update cart"
            }
          }
        }

        let bookingData = {
          user_id: user._id,
          cart_id: data.cart_id,
          order_id: orderIds,
          total_amount: data.price,
          delivery_charge: data.delivery_charge,
          tax_amount: data.tax_amount,
          coupon_id: couponData ? couponData._id : null,
          discount_amount: data.discount_amount,
          transaction_id: (generateUniqueId({length: 15,useLetters: true}).toUpperCase()),
          booking_id: unique_booking_id,
        }

        let response = new OrderBookingModel(Object.assign({}, bookingData));
        let saveBooking = await response.save();
        if (!saveBooking) {
          return {
            status: 0,
            message: "Unable to book order"
          }
        }
        let bookingId = saveBooking._id;

        let updateCartData = await CartModel.updateMany({'_id': {'$in': data.cart_id }}, { booking_id: bookingId },{new: true});
        let updateOrderData = await OrderModel.updateMany({'_id': {'$in': orderIds }}, { booking_id: bookingId },{new: true});
        
        if (!updateCartData && !updateOrderData) {
          return {
            status: 0,
            message: "Unable to update cart and order"
          }
        }
          /* Code for notification start */
          let title = "Order Placed";
          let Notificationbody = "Your order has been placed successfully using Credit Line Method";
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
          
            /* Code for notification start to Seller */
            if(sellerIds.length > 0){
              for(let j = 0; j < sellerIds.length; j++){
                let sellerId = sellerIds[j];
                let sellerTitle = "Order Placed";
                let sellerNotiBody = "New order has been placed by " + user.first_name + " using Credit Line Method";
              
                let sellerNotification = {
                  user_id: sellerId,
                  title: sellerTitle,
                  body: sellerNotiBody,
                  type: 1,
                  created_at: Date.now()
                }
                let sendNoti = await NotificationModel.create(sellerNotification);
                sendNoti.save();
              }
            }
            
            /* Code for notification end to Seller */

            /* Code for notification start to Admin */
            let admin = await AdminModel.findOne({}, { email: 1, _id: 1 });
            let adminTitle = "Order Placed";
            let NotiBody = "New order has been placed by " + user.first_name + " using Credit Line Method";
          
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
        let dataToSend = {
          bookingId: unique_booking_id
        }
        return { message: "Order placed successfully", status: 1, data: dataToSend };
        
      } else {
        return {
          status: 0,
          message: "Please add product to cart to place order"
        }
      }
    }else if(data.payment_options == "COD"){      
      if(data.cart_id.length > 0){
        let orderIds = [];
        let sellerIds = [];
        for(let i = 0; i < data.cart_id.length; i++){
          let cartData = await CartModel.findOne({ _id: mongoose.Types.ObjectId(data.cart_id[i]) },{ product_id: 1, quantity: 1, seller_id: 1 }).populate('product_id', 'price_after_offer').lean();
          let productPrice =  parseFloat(cartData.product_id.price_after_offer);
          let productQuantity = parseInt(cartData.quantity);

          
          let totalAmount = (productPrice * productQuantity).toFixed(2);
          
          let dataToSave = {
            user_id: user._id,
            cart_id: data.cart_id[i],
            price: parseFloat(totalAmount),
            order_id: generateUniqueId({ length: 7, useLetters: true }).toUpperCase(),
            quantity: productQuantity,
            address_id: data.address_id,
            payment_options: data.payment_options,
            coupon_id: couponData ? couponData._id : null,
            currency: data.currency,
            status: 1
          }

          let res = new OrderModel(Object.assign({}, dataToSave));
          let saveOrder = await res.save();
          if (!saveOrder) {
            return {
              status: 0,
              message: "Unable to place order"
            }
          }

          let orderId = saveOrder._id;
          let cart_id = data.cart_id[i];
          orderIds.push(orderId);
          sellerIds.push(cartData.seller_id)
          let updateCart = await CartModel.updateOne({ _id: mongoose.Types.ObjectId(cart_id) }, { status: 3, order_id: orderId },{new: true});
          if (!updateCart) { 
            return {
              status: 0,
              message: "Unable to update cart"
            }
          }
        }

        let bookingData = {
          user_id: user._id,
          cart_id: data.cart_id,
          order_id: orderIds,
          total_amount: data.price,
          delivery_charge: data.delivery_charge,
          tax_amount: data.tax_amount,
          coupon_id: couponData ? couponData._id : null,
          discount_amount: data.discount_amount,
          transaction_id: (generateUniqueId({length: 15,useLetters: true}).toUpperCase()),
          booking_id: unique_booking_id,
        }

        let response = new OrderBookingModel(Object.assign({}, bookingData));
        let saveBooking = await response.save();
        if (!saveBooking) {
          return {
            status: 0,
            message: "Unable to book order"
          }
        }
        let bookingId = saveBooking._id;

        let updateCartData = await CartModel.updateMany({'_id': {'$in': data.cart_id }}, { booking_id: bookingId },{new: true});
        let updateOrderData = await OrderModel.updateMany({'_id': {'$in': orderIds }}, { booking_id: bookingId },{new: true});
        
        if (!updateCartData && !updateOrderData) {
          return {
            status: 0,
            message: "Unable to update cart and order"
          }
        }

          /* Code for notification start */
          let title = "Order Placed";
          let Notificationbody = "Your order has been placed successfully using Cash on Delivery Method";
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
          
            /* Code for notification start to Seller */
            if(sellerIds.length > 0){
              for(let j = 0; j < sellerIds.length; j++){
                let sellerId = sellerIds[j];
                let sellerTitle = "Order Placed";
                let sellerNotiBody = "New order has been placed by " + user.first_name + " using Cash on Delivery Method";
              
                let sellerNotification = {
                  user_id: sellerId,
                  title: sellerTitle,
                  body: sellerNotiBody,
                  type: 1,
                  created_at: Date.now()
                }
                let sendNoti = await NotificationModel.create(sellerNotification);
                sendNoti.save();
              }
            }
            
            /* Code for notification end to Seller */

            /* Code for notification start to Admin */
            let admin = await AdminModel.findOne({}, { email: 1, _id: 1 });
            let adminTitle = "Order Placed";
            let NotiBody = "New order has been placed by " + user.first_name + " using Cash on Delivery Method";
          
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
        let dataToSend = {
          bookingId: unique_booking_id
        }
        return { message: "Order placed successfully", status: 1, data: dataToSend };
        
      } else {
        return {
          status: 0,
          message: "Please add product to cart to place order"
        }
      }
        
    }else if(data.payment_options == "CHEQUE"){
      if (!data.cheque_image || data.cheque_image == '')
      return { status: 0, message: "Cheque image is required" };

      let uniqueId = generateUniqueId({length: 28,useLetters: true});

      let orderIds = [];
      let sellerIds = [];
      if(data.cart_id.length > 0){
        for(let i = 0; i < data.cart_id.length; i++){
          let cartData = await CartModel.findOne({ _id: mongoose.Types.ObjectId(data.cart_id[i]) },{ product_id: 1, quantity: 1, seller_id: 1 }).populate('product_id', 'price_after_offer').lean();
          let productPrice =  parseFloat(cartData.product_id.price_after_offer);
          let productQuantity = parseInt(cartData.quantity);

          
          let totalAmount = (productPrice * productQuantity).toFixed(2);
          
          let dataToSave = {
            user_id: user._id,
            cart_id: data.cart_id[i],
            price: parseFloat(totalAmount),
            order_id: generateUniqueId({ length: 7, useLetters: true }).toUpperCase(),
            quantity: productQuantity,
            address_id: data.address_id,
            payment_options: data.payment_options,
            coupon_id: couponData ? couponData._id : null,
            currency: data.currency,
            cheque_image: data.cheque_image,
            status: 1
          }

          let res = new OrderModel(Object.assign({}, dataToSave));
          let saveOrder = await res.save();
          if (!saveOrder) {
            return {
              status: 0,
              message: "Unable to place order"
            }
          }

          let orderId = saveOrder._id;
          let cart_id = data.cart_id[i];
          orderIds.push(orderId);
          sellerIds.push(cartData.seller_id)
          let updateCart = await CartModel.updateOne({ _id: mongoose.Types.ObjectId(cart_id) }, { status: 3, order_id: orderId },{new: true});
          if (!updateCart) { 
            return {
              status: 0,
              message: "Unable to update cart"
            }
          }
        }

        let bookingData = {
          user_id: user._id,
          cart_id: data.cart_id,
          order_id: orderIds,
          total_amount: data.price,
          delivery_charge: data.delivery_charge,
          tax_amount: data.tax_amount,
          coupon_id: couponData ? couponData._id : null,
          discount_amount: data.discount_amount,
          transaction_id: (generateUniqueId({length: 15,useLetters: true}).toUpperCase()),
          booking_id: unique_booking_id,
        }

        let response = new OrderBookingModel(Object.assign({}, bookingData));
        let saveBooking = await response.save();
        if (!saveBooking) {
          return {
            status: 0,
            message: "Unable to book order"
          }
        }
        let bookingId = saveBooking._id;

        let updateCartData = await CartModel.updateMany({'_id': {'$in': data.cart_id }}, { booking_id: bookingId },{new: true});
        let updateOrderData = await OrderModel.updateMany({'_id': {'$in': orderIds }}, { booking_id: bookingId },{new: true});
        
        if (!updateCartData && !updateOrderData) {
          return {
            status: 0,
            message: "Unable to update cart and order"
          }
        }

         /* Code for notification start */
         let title = "Order Placed";
         let Notificationbody = "Your order has been placed successfully using Cheque method";
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

           /* Code for notification start to Seller */
           if(sellerIds.length > 0){
            for(let j = 0; j < sellerIds.length; j++){
              let sellerId = sellerIds[j];
              let sellerTitle = "Order Placed";
              let sellerNotiBody = "New order has been placed by " + user.first_name + " using Cheque Method";
            
              let sellerNotification = {
                user_id: sellerId,
                title: sellerTitle,
                body: sellerNotiBody,
                type: 1,
                created_at: Date.now()
              }
              let sendNoti = await NotificationModel.create(sellerNotification);
              sendNoti.save();
            }
          }
          
          /* Code for notification end to Seller */

         /* Code for notification start to Admin */
         let admin = await AdminModel.findOne({}, { email: 1, _id: 1 });
         let adminTitle = "Order Placed";
         let NotiBody = "New order has been placed by " + user.first_name + " using Cheque method";
       
         let adminNotification = {
           user_id: admin._id,
           title: adminTitle,
           body: NotiBody,
           type: 2,
           created_at: Date.now()
         }
         let send_noti = await NotificationModel.create(adminNotification);
         send_noti.save();

         let dataToSend = {
          bookingId: unique_booking_id
        }
        return { message: "Order placed successfully", status: 1, data: dataToSend };

      } else {
        return {
          status: 0,
          message: "Please add product to cart to place order"
        }
      }
    } else if(data.payment_options == "CARD"){
      if(data.cart_id.length > 0){
        let orderIds = [];
        for(let i = 0; i < data.cart_id.length; i++){
          let cartData = await CartModel.findOne({ _id: mongoose.Types.ObjectId(data.cart_id[i]) },{ product_id: 1, quantity: 1 }).populate('product_id', 'price_after_offer').lean();
          let productPrice =  parseFloat(cartData.product_id.price_after_offer);
          let productQuantity = parseInt(cartData.quantity);

          
          let totalAmount = (productPrice * productQuantity).toFixed(2);
          
          let dataToSave = {
            user_id: user._id,
            cart_id: data.cart_id[i],
            price: parseFloat(totalAmount),
            quantity: productQuantity,
            order_id: generateUniqueId({ length: 7, useLetters: true }).toUpperCase(),
            address_id: data.address_id,
            payment_options: data.payment_options,
            coupon_id: couponData ? couponData._id : null,
            currency: data.currency,
            status: 0
          }

          let res = new OrderModel(Object.assign({}, dataToSave));
          let saveOrder = await res.save();
          if (!saveOrder) {
            return {
              status: 0,
              message: "Unable to place order"
            }
          }

          let orderId = saveOrder._id;
          let cart_id = data.cart_id[i];
          orderIds.push(orderId);
          let updateCart = await CartModel.updateOne({ _id: mongoose.Types.ObjectId(cart_id) }, { order_id: orderId },{new: true});
          if (!updateCart) { 
            return {
              status: 0,
              message: "Unable to update cart"
            }
          }
        }

        let bookingData = {
          user_id: user._id,
          cart_id: data.cart_id,
          order_id: orderIds,
          total_amount: data.price,
          delivery_charge: data.delivery_charge,
          tax_amount: data.tax_amount,
          coupon_id: couponData ? couponData._id : null,
          discount_amount: data.discount_amount,
          transaction_id: (generateUniqueId({length: 15,useLetters: true}).toUpperCase()),
          booking_id: unique_booking_id,
          status: 0
        }

        let response = new OrderBookingModel(Object.assign({}, bookingData));
        let saveBooking = await response.save();
        if (!saveBooking) {
          return {
            status: 0,
            message: "Unable to book order"
          }
        }
        let bookingId = saveBooking._id;

        // let updateCartData = await CartModel.updateMany({'_id': {'$in': data.cart_id }}, { booking_id: bookingId },{new: true});
        // let updateOrderData = await OrderModel.updateMany({'_id': {'$in': orderIds }}, { booking_id: bookingId },{new: true});
        
        // if (!updateCartData && !updateOrderData) {
        //   return {
        //     status: 0,
        //     message: "Unable to update cart and order"
        //   }
        // }

        let dataToSend = {
          bookingId: bookingId
        }

        return { data: dataToSend, message: "Order pending, please make payment to confirm order", status: 1 };
        
      } else {
        return {
          status: 0,
          message: "Please add product to cart to place order"
        }
      }
    }else if(data.payment_options == "PAYPAL"){
      if(data.cart_id.length > 0){
        let orderIds = [];
        let sellerIds = [];
        for(let i = 0; i < data.cart_id.length; i++){
          let cartData = await CartModel.findOne({ _id: mongoose.Types.ObjectId(data.cart_id[i]) },{ product_id: 1, quantity: 1, seller_id: 1 }).populate('product_id', 'price_after_offer').lean();
          let productPrice =  parseFloat(cartData.product_id.price_after_offer);
          let productQuantity = parseInt(cartData.quantity);

          
          let totalAmount = (productPrice * productQuantity).toFixed(2);
          
          let dataToSave = {
            user_id: user._id,
            cart_id: data.cart_id[i],
            price: parseFloat(totalAmount),
            quantity: productQuantity,
            order_id: generateUniqueId({ length: 7, useLetters: true }).toUpperCase(),
            address_id: data.address_id,
            payment_options: data.payment_options,
            coupon_id: couponData ? couponData._id : null,
            currency: data.currency,
            status: 1
          }

          let res = new OrderModel(Object.assign({}, dataToSave));
          let saveOrder = await res.save();
          if (!saveOrder) {
            return {
              status: 0,
              message: "Unable to place order"
            }
          }

          let orderId = saveOrder._id;
          let cart_id = data.cart_id[i];
          orderIds.push(orderId);
          sellerIds.push(cartData.seller_id)
          let updateCart = await CartModel.updateOne({ _id: mongoose.Types.ObjectId(cart_id) }, { status: 3, order_id: orderId },{new: true});
          if (!updateCart) { 
            return {
              status: 0,
              message: "Unable to update cart"
            }
          }
        }

        let bookingData = {
          user_id: user._id,
          cart_id: data.cart_id,
          order_id: orderIds,
          total_amount: data.price,
          delivery_charge: data.delivery_charge,
          tax_amount: data.tax_amount,
          coupon_id: couponData ? couponData._id : null,
          discount_amount: data.discount_amount,
          transaction_id: data.transaction_id ? data.transaction_id : null,
          booking_id: unique_booking_id,
        }

        let response = new OrderBookingModel(Object.assign({}, bookingData));
        let saveBooking = await response.save();
        if (!saveBooking) {
          return {
            status: 0,
            message: "Unable to book order"
          }
        }
        let bookingId = saveBooking._id;

        let updateCartData = await CartModel.updateMany({'_id': {'$in': data.cart_id }}, { booking_id: bookingId },{new: true});
        let updateOrderData = await OrderModel.updateMany({'_id': {'$in': orderIds }}, { booking_id: bookingId },{new: true});
        
        if (!updateCartData && !updateOrderData) {
          return {
            status: 0,
            message: "Unable to update cart and order"
          }
        }

        /* Code for notification start */
        let title = "Order Placed";
        let Notificationbody = "Your order has been placed successfully using Paypal";
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


           /* Code for notification start to Seller */
           if(sellerIds.length > 0){
            for(let j = 0; j < sellerIds.length; j++){
              let sellerId = sellerIds[j];
              let sellerTitle = "Order Placed";
              let sellerNotiBody = "New order has been placed by " + user.first_name + " using Paypal";
            
              let sellerNotification = {
                user_id: sellerId,
                title: sellerTitle,
                body: sellerNotiBody,
                type: 1,
                created_at: Date.now()
              }
              let sendNoti = await NotificationModel.create(sellerNotification);
              sendNoti.save();
            }
          }
          /* Code for notification end to Seller */

         /* Code for notification start to Admin */
         let admin = await AdminModel.findOne({}, { email: 1, _id: 1 });
         let adminTitle = "Order Placed";
         let NotiBody = "New order has been placed by " + user.first_name + " using Paypal";
       
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
        let dataToSend = {
          bookingId: unique_booking_id
        }
        return { message: "Order placed successfully", status: 1, data: dataToSend };
        
      } else {
        return {
          status: 0,
          message: "Please add product to cart to place order"
        }
      }
    } else if(data.payment_options == "PICKUPORDER"){
      let dataToSave = {
        user_id: user._id,
        cart_id: data.cart_id,
        delivery_charge: data.delivery_charge,
        tax_amount: data.tax_amount,
        price: data.price,
        quantity: data.quantity,
        address_id: data.address_id,
        payment_options: data.payment_options,
        coupon_code: data.coupon_code,
        discount_amount: data.discount_amount,
        currency: data.currency,
        deliverby: "3 Days",
        delivery_on: (new Date(new Date().getTime()+(3*24*60*60*1000))),
        transaction_id: (generateUniqueId({length: 28,useLetters: true})),
        status: 1
      }
      let res = new OrderModel(Object.assign({}, dataToSave));
      let saveOrder = await res.save();

      if (!saveOrder) {
        return {
          status: 0,
          message: "Unable to place order"
        }
      }

      let orderId = saveOrder._id;
      let updateCart = await CartModel.updateMany({'_id': {'$in': data.cart_id }}, { status: 3, order_id: orderId },{new: true});
      if (!updateCart) {
        return {
          status: 0,
          message: "Something went wrong please try after sometime"
        }
      }

      return { message: "Order placed successfully", status: 1 };
    }

  } catch (err) {
    throw new Error(err.message);
  }
};

exports.applyCoupon = async (user, data) => {
  try {
    if (!user._id || user._id == '')
      return { status: 0, message: "User does not exist" };
    if (!data.price || data.price == '')
      return { status: 0, message: "Price is required" };
    if (!data.coupon_name || data.coupon_name == '')
      return { status: 0, message: "Coupon name is required" };

    let currentDate = new Date().getTime();
    let activeCoupon = await CouponModel.findOne({ end_date: {'$gte': currentDate }, name: data.coupon_name, is_active: true },{ is_active:0, date_created:0 }).lean();
    if(!activeCoupon){
      return { 
        status: 0, message: "Coupon does not exist or coupon expired" 
      };
    }
    if(currentDate > activeCoupon.end_date){
      return { 
        status: 0, message: "Coupon has expired" 
      };
    }
    let NoOfcouponUsed = await OrderModel.count({ coupon_code: mongoose.Types.ObjectId(activeCoupon._id) }).lean();
    if(activeCoupon.minimum_purchase_amount > data.price){
      return { 
        status: 0, message: "This coupon is not applicable on purchase amount less than " + activeCoupon.minimum_purchase_amount
      };
    }

    if(NoOfcouponUsed >= parseInt(activeCoupon.maxm_use_limit)){
      return { 
        status: 0, message: "Coupon has reached its maxm limit"
      };
    }

    let newPrice = data.price;
    let discountAmount = 0;
    if(activeCoupon.discount_type == "Percentage"){
      if(activeCoupon.discount_amount > 0 && data.price > 0){
        discountAmount =  ((activeCoupon.discount_amount * data.price) / 100);
        newPrice = data.price - discountAmount;
      } 
    }else{
      if(activeCoupon.discount_amount > 0 && data.price > 0){
        discountAmount =  activeCoupon.discount_amount;
        newPrice = data.price - activeCoupon.discount_amount
      }
    }
    let dataToSend = {
      priceAfterDiscount: newPrice,
      discountAmount: discountAmount
    }
    return { 
      message: "Coupon applied successfully", 
      status: 1,
      data: dataToSend
    };

  } catch (err) {
    throw new Error(err.message);
  }
};

exports.confirmChequeTransaction = async (user, data) => {
  try {
    if (!user._id || user._id == '')
      return { status: 0, message: "User does not exist" };
    if (!data.order_id || data.order_id.length == 0)
      return { status: 0, message: "Order id is required" };
    if (!data.cheque_image || data.cheque_image == '')
      return { status: 0, message: "Cheque image is required" };

    if(data.order_id.length > 0){
      for(let i = 0; i < data.order_id.length; i++) {
        let orderId = data.order_id[i];
        let orderData = await OrderModel.findById({ _id: mongoose.Types.ObjectId(orderId) })
        if (!orderData) {
          return {
            status: 0,
            message: "Something went wrong please try after sometime"
          }
        }
        let uniqueId = generateUniqueId({length: 28,useLetters: true});
        let updateOrderData = {
          transaction_id: uniqueId,
          cheque_image: data.cheque_image,
          status: 1
        }
        if(orderId){
          let updateOrder = await OrderModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(orderId) }, { $set: updateOrderData }, { new: true })
          if (!updateOrder) {
            return {
              status: 0,
              message: "Something went wrong please try after sometime"
            }
          }
        }

        let updateCart = await CartModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(orderData.cart_id) }, {  status: 3, order_id: orderId },{new: true});
        if (!updateCart) {
          return {
            status: 0,
            message: "Something went wrong please try after sometime"
          }
        }
      }
    }
      return { message: "Order placed successfully", status: 1 }; 

  } catch (err) {
    throw new Error(err.message);
  }
};

exports.createToken = async (req, res) => {
  try {
      const token = await stripe.tokens.create({
        card: {
          number: '5555555555554444',
          exp_month: 9,
          exp_year: 2022,
          cvc: '314',
        },
      });
      if(!token) {
          throw new Error('Unable to create token')
      }
      return { data: token, message: "Token created", status: 1 }; 

    } catch(error) {
      res.status(403).Error(error.message)
  }
}

exports.addUserCard = async (user, data) => {
  try {
    let user_id = user._id;
    let email_id = user.email;

    var { bank_name, card_number, validity_date, cvv, card_name, card_type, token, default_card } = data;
    const schema = Joi.object().keys({
        // bank_name: Joi.string().required().error(e => 'bank name require'),
        card_number: Joi.string().required().error(e => 'card_number require'),
        validity_date: Joi.string().required().error(e => 'validity_date require'),
        cvv: Joi.number().required().error(e => 'cvv require'),
        token: Joi.string().required().error(e => 'Token require'),
        card_name: Joi.string().optional().allow('').error(e => "card name required"),
        card_type: Joi.string().optional().allow('').error(e => "card_type  required"),
        default_card: Joi.number().optional().allow('').error(e => "default  required")
    })
    if (!card_type) {
        card_type = "N/A"
    }
    if (!default_card) {
        default_card = 1
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

    var lastChar = card_number.substr(card_number.length - 4);
    var firstChar = card_number.substring(0, 4);
    let new_card = 'XXXX-XXXX-XXXX-' + lastChar
    
    let findCard = await UserCardDetailsModel.findOne({user_id: mongoose.Types.ObjectId(user_id), card_number: new_card}, {} ,{lean:true})
    if(findCard){
      return { message: "Card already added", status: 0 }; 
    }
    console.log("new card", new_card)

    var customer = await stripe.customers.create({
        email: email_id,
        source: token
    });

    if (default_card == 1) {
        let update = await UserCardDetailsModel.updateOne({ user_id: mongoose.Types.ObjectId(user_id) }, { $set: { default_card: 0 } }, { multi: true })
    }

    var customer_id = customer ? customer.id : ""
    var card_id = customer ? customer.default_source : null
    let paymentDetails = { bank_name, customer_id, card_id, user_id, card_number: new_card, validity_date, cvv, card_name, card_type, default_card };
    let userPaymentModel = new UserCardDetailsModel(paymentDetails);
    let savePaymentDetails = await userPaymentModel.save();
    if (!savePaymentDetails) {
        return { message: "Unable to add payment details", status: 0 }; 
    }
    savePaymentDetails = JSON.parse(JSON.stringify(savePaymentDetails))
    delete savePaymentDetails['cvv']
    delete savePaymentDetails['card_id']
    delete savePaymentDetails['customer_id']

    return { data: savePaymentDetails, message: "Card details added successfully" , status: 1 }; 

  } catch (err) {
    // throw new Error(err.message);
    return { message: err.message, status: 0 }; 
  }
};

exports.getCardList = async (user) => {
  try {
      let user_id = user._id;
      let userCards = await UserCardDetailsModel.find({ user_id: mongoose.Types.ObjectId(user_id) }, {}, { lean: true });
      
      if (!userCards) {
        return {
          status: 0,
          message: "Unable to fetch user cards"
        }
      }
      let dataToSend = {
        cardList: userCards
      }
      return { data: dataToSend, message: "User cards fetch successfully" , status: 1 }; 

  } catch (err) {
    throw new Error(err.message);
  }
}

exports.deleteCard = async (user, data) => {
  try {
      if (!user._id || user._id == '')
        return { status: 0, message: "Please login to delete card" };
      if (!data._id || data._id == "")
        return { status: 0, message: "Card id is required" };

     let deletedCard = await UserCardDetailsModel.findOneAndRemove({ _id: mongoose.Types.ObjectId(data._id) }).lean();
      
      if (!deletedCard) {
        return {
          status: 0,
          message: "Unable to delete user card"
        }
      }
      return { message: "User card deleted successfully" , status: 1 }; 

  } catch (err) {
    throw new Error(err.message);
  }
}

exports.makeStripePayment = async (user, data) => {
  try {
      let { card_id, currency, price, bookingId } = data;

      if (!card_id || card_id == "")
        return { status: 0, message: "Card id is required" };
      if (!currency || currency == '')
        return { status: 0, message: "Currency is required" };
      if (!bookingId || bookingId == '')
        return { status: 0, message: "Booking id is required" };
      if (!price || price == '')
        return { status: 0, message: "Price is required" };

      let cardData = await UserCardDetailsModel.findOne({'_id': mongoose.Types.ObjectId(card_id) });
      if(!cardData){
        return {
          status: 0,
          message: "Unable to fetch card details"
        }
      }
      let customer_id = cardData.customer_id;
      var make_payment = await stripe.charges.create({
          amount: (((Math.round(price * 100) / 100).toFixed(0)) * (100)),
          currency: currency,
          customer: customer_id,
          description: "payment successfull",
      });

      if (!make_payment) {
        return {
          status: 0,
          message: "Unable to complete payment"
        }
      }

      if(make_payment.status == "succeeded"){
        // let dataToUpdate = {
        //   transaction_id: make_payment.balance_transaction ? make_payment.balance_transaction : null,
        //   status: 1
        // }
        // let update = await OrderModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(order_id) }, { $set: dataToUpdate }, { new: true });
        // if (!update) {
        //   return {
        //     status: 0,
        //     message: "Unable to update order"
        //   }
        // }
        
        // let cartIds = update.cart_id;
        // let updateCart = await CartModel.updateMany({'_id': {'$in': cartIds }}, { status: 3, order_id: order_id },{new: true});
        // if (!updateCart) {
        //   return {
        //     status: 0,
        //     message: "Something went wrong please try after sometime"
        //   }
        // }

        let bookingData = await OrderBookingModel.findOne({'_id': mongoose.Types.ObjectId(bookingId) });
        if (!bookingData) {
          return {
            status: 0,
            message: "Unable to get booking data"
          }
        }
        let cartIds = bookingData.cart_id;
        let orderIds = bookingData.order_id;
        let updateCartData = await CartModel.updateMany({'_id': {'$in': cartIds }}, { booking_id: bookingId, status: 3 },{new: true});
        let updateOrderData = await OrderModel.updateMany({'_id': {'$in': orderIds }}, { booking_id: bookingId, status: 1 },{new: true});
        let updateBookingData = await OrderBookingModel.updateOne({'_id': mongoose.Types.ObjectId(bookingId) }, { status: 1 },{new: true});

        if (!updateCartData && !updateOrderData && !updateBookingData) {
          return {
            status: 0,
            message: "Unable to update cart and order"
          }
        }

         /* Code for notification start */
         let title = "Order Placed";
         let Notificationbody = "Your order has been placed successfully using Stripe";
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

         /* Code for notification start to Seller */
         let sellerIds = [];
         for(let i = 0; i < cartIds.length; i++){
          let cartData = await CartModel.findOne({'_id': mongoose.Types.ObjectId(cartIds[i])}, { seller_id: 1 });
          sellerIds.push(cartData.seller_id);
        }
         if(sellerIds.length > 0){
          for(let j = 0; j < sellerIds.length; j++){
            let sellerId = sellerIds[j];
            let sellerTitle = "Order Placed";
            let sellerNotiBody = "New order has been placed by " + user.first_name + " using Stripe";
          
            let sellerNotification = {
              user_id: sellerId,
              title: sellerTitle,
              body: sellerNotiBody,
              type: 1,
              created_at: Date.now()
            }
            let sendNoti = await NotificationModel.create(sellerNotification);
            sendNoti.save();
          }
        }
        /* Code for notification end to Seller */

          /* Code for notification start to Admin */
          let admin = await AdminModel.findOne({}, { email: 1, _id: 1 });
          let adminTitle = "Order Placed";
          let NotiBody = "New order has been placed by " + user.first_name + " using Stripe";
        
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
         let dataToSend = {
          bookingId: bookingData.booking_id
        }
        return { message: "Order placed successfully" , status: 1, data: dataToSend  }; 
      }else{
        return { message: "Payment failed" , status: 0 }; 
      }

  } catch (err) {
    throw new Error(err.message);
  }
}

exports.getOrderSummary = async (user, data) => { 
  try {
    if (!data.price || data.price == "")
      return { status: 0, message: "Price is required" };

    let taxData = await TaxModel.findOne({}).lean();

    // if (!data.payment_type || data.payment_type == "")
    //   return { status: 0, message: "Payment type is required" };
    // if (!data.currency || data.currency == "")
    //   return { status: 0, message: "Currency is required" };

      // let priceAfterDeliveryCharge = data.price;
      // if(data.payment_type == "COD" || data.payment_type == "CHEQUE" ||  data.payment_type == "CREDITLINE" ||  data.payment_type == "PAYPAL"){
      //   if(data.currency == 'AED'){
      //     priceAfterDeliveryCharge = parseFloat(priceAfterDeliveryCharge) + 10;
      //   }else if(data.currency == 'USD'){
      //     priceAfterDeliveryCharge = parseFloat(priceAfterDeliveryCharge) + 2.7;
      //   }else{
      //     priceAfterDeliveryCharge = priceAfterDeliveryCharge;
      //   }
      // } else if(data.payment_type == "CARD"){
      //   if(data.currency == 'AED'){
      //     priceAfterDeliveryCharge = parseFloat(priceAfterDeliveryCharge) + 10 + 2;
      //   }else if(data.currency == 'USD'){
      //     priceAfterDeliveryCharge = parseFloat(priceAfterDeliveryCharge) + 2.7 + 0.54;
      //   }else{
      //     priceAfterDeliveryCharge = priceAfterDeliveryCharge;
      //   }
      // } else if(data.payment_type == "PICKUPORDER"){
      //   if(data.currency == 'AED'){
      //     priceAfterDeliveryCharge = parseFloat(priceAfterDeliveryCharge) + 2;
      //   }else if(data.currency == 'USD'){
      //     priceAfterDeliveryCharge = parseFloat(priceAfterDeliveryCharge) + 0.54;
      //   }else{
      //     priceAfterDeliveryCharge = priceAfterDeliveryCharge;
      //   }
      // }else{
      //   if(data.currency == 'AED'){
      //     priceAfterDeliveryCharge = parseFloat(priceAfterDeliveryCharge) + 10;
      //   }else if(data.currency == 'USD'){
      //     priceAfterDeliveryCharge = parseFloat(priceAfterDeliveryCharge) + 2.7;
      //   }else{
      //     priceAfterDeliveryCharge = priceAfterDeliveryCharge;
      //   }
      // }
      let deliveryAmount = taxData.delivery_charge ? Number(taxData.delivery_charge) : 0;
      let taxPercent = taxData.tax_percent ? Number(taxData.tax_percent) : 0;
      let priceAfterDeliveryCharge = data.price;
      priceAfterDeliveryCharge = Number(priceAfterDeliveryCharge) + deliveryAmount;
      var priceAfterVat = priceAfterDeliveryCharge;
      var deliveryCharge = (Number(priceAfterDeliveryCharge) - Number(data.price)).toFixed(2);
      var vatAmount  = ((taxPercent * priceAfterDeliveryCharge) /100).toFixed(2);
      priceAfterVat = (Number(priceAfterVat) + Number(vatAmount)).toFixed(2);
      
      let dataToSend = {
        priceAfterTax: priceAfterVat,
        deliveryCharge: deliveryCharge,
        vatAmount: vatAmount,
        currency: data.currency
      }

      return { data: dataToSend ,message: "Additional charges applied successfully" , status: 1 }; 

  } catch (err) {
    throw new Error(err.message);
  }
}

exports.ongoingOrderList = async (user) => {
  try {
    if (!user || user._id == '')
      return { status: 0, message: "Login first to get ongoing order list" };

    let ongoingOrderList = await CartModel.find({ user_id: mongoose.Types.ObjectId(user._id), is_deleted: false , $or: [{status: 3},{status: 4},{status: 5},{status: 6},{status: 7},{status: 8}] },{ order_id: 1 }).populate('order_id').sort({ created_at: -1 }).lean();

    return { data: ongoingOrderList, message: "Ongoing order list fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.pastOrderList = async (user) => {
  try {
    if (!user || user._id == '')
      return { status: 0, message: "Login first to get ongoing order list" };

    let ongoingOrderList = await CartModel.find({ user_id: mongoose.Types.ObjectId(user._id), is_deleted: false , $or: [{status: 9},{status: 10}] },{ order_id: 1 }).populate('order_id').sort({ created_at: -1 }).lean();

    return { data: ongoingOrderList, message: "Past order list fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.trackOrder = async (user, data) => {
  try {
    if (!user || user._id == '')
      return { status: 0, message: "Login first to track order" };
    if (!data || data._id == '')
      return { status: 0, message: "Order id is required" };

    let orderData = await OrderModel.findOne({ _id: mongoose.Types.ObjectId(data._id) }).select('order_id currency payment_options deliverby delivery_on price created_at modified_at intransit_on dispatch_on shipping_on arriving_on out_for_delivery_on delivered_on cancelled_on status').lean();
    if(!orderData){
      return { status: 0, message: "Order does not exist" };
    }
    let tracking_data = {
      trackingData: orderData
    }

    return { data: tracking_data, message: "Order tracking details fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getOrderDetails = async (user, data) => {
  try {
    if (!user || user._id == '')
      return { status: 0, message: "Login first to track order" };
    if (!data || data._id == '')
      return { status: 0, message: "Order id is required" };

    let orderDetails = await OrderModel.findOne({ _id: mongoose.Types.ObjectId(data._id) }).lean();
  
    if(!orderDetails){
      return {
        status: 0,
        message: "Unable to fetch order details"
      }
    }
    let cartDetails = [];
    if(data._id && user._id){
      cartDetails = await CartModel.findOne({ user_id: mongoose.Types.ObjectId(user._id), order_id: mongoose.Types.ObjectId(data._id) }, { currency: 1, price: 1, quantity: 1, unit_price: 1,order_id: 1 })
      .populate('product_id', 'product_name product_image product_description price_after_offer product_price offer_applicable').lean();
      
      orderDetails['cartProducts'] = cartDetails;
    }

    return { data: orderDetails, message: "Order detail fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getOrderRating = async (user, data) => {
  try {
      if (!user._id || user._id == '')
        return { status: 0, message: "Login first to rate the product" };
      if (!data.order_id|| data.order_id == '')
        return { status: 0, message: "Order id is required" };

      let ratingData = await ratingModel.findOne({ user_id: mongoose.Types.ObjectId(user._id), order_id: mongoose.Types.ObjectId(data.order_id) },{ rating_point: 1, review: 1 }).lean();
      if (!ratingData) {
        return {
          status: 0,
          message: 'No rating provided for this order'
        }
      }
      return { data: ratingData, message: "Order rating fetched successfully", status: 1 };

  }catch (err) {
    throw new Error(err.message);
  }
};

exports.getTemplates = async (data) => {
  try {
    let type = parseInt(data.type);
    switch (type) {
      case 1: {
        return { status: 1, message: "Privacy policy fetched Successfully", data: config.HOSTBACK +"/template/privacy_policy.html" };
      }
      case 2: {
        return { status: 1, message: "FAQs fetched Successfully", data: config.HOSTBACK +"/template/faqs.html" };
      }
      case 3: {
        return { status: 1, message: "Terms and conditions fetched Successfully", data: config.HOSTBACK +"/template/term_and_conditions.html" };
      }
      case 4: {
        return { status: 1, message: "Contact us fetched Successfully", data: config.HOSTBACK +"/template/contactus.html" };
      }
      case 5: {
        return { status: 1, message: "Help fetched Successfully", data: config.HOSTBACK +"/template/help.html" };
      }
      case 6: {
        return { status: 1, message: "Legal fetched Successfully", data: config.HOSTBACK +"/template/legal.html" };
      }
      default: {
        return { status: 1, message: "About Us fetched Successfully", data: config.HOSTBACK +"/template/aboutus.html" };
      }
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getProfileDetails = async (user) => {
  try {
      if (!user._id || user._id == '')
        return { status: 0, message: "Login first to get profile details" };

      let dataToSend = {
        first_name: user.first_name,
        email: user.email,
        country_code: user.country_code,
        mobile_number: user.mobile_number,
        profile_pic: user.profile_pic,
        gender: user.gender,
        user_type: user.user_type
      }

      return { data: dataToSend, message: "Profile details fetched successfully", status: 1 };

  }catch (err) {
    throw new Error(err.message);
  }
};

exports.updateProfileDetails = async (user, data) => {
  try {
      if (!user._id || user._id == '')
        return { status: 0, message: "Login first to update profile details" };
      if (!data || data.first_name == '')
        return { status: 0, message: "First name is required" };
      if (!data || data.email == '')
        return { status: 0, message: "Email is required" };
      if (!data || data.mobile_number == '')
        return { status: 0, message: "Mobile number is required" };
      if (!data || data.profile_pic == '')
        return { status: 0, message: "Profile pic is required" };
      if (!data || data.gender == '')
        return { status: 0, message: "Gender is required" };
      if (!data || data.user_type == '')
        return { status: 0, message: "User type is required" };

      let dataToUpdate = {
        first_name: data.first_name,
        email: data.email,
        mobile_number: data.mobile_number,
        profile_pic: data.profile_pic,
        gender: data.gender,
        user_type: parseInt(data.user_type)
      }

      let update = await UserModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(user._id) }, { $set: dataToUpdate }, { new: true });
      if (!update) {
        return {
          status: 0,
          message: "Unable to update profile"
        }
      }

      return { message: "Profile details updated successfully", status: 1 };

  }catch (err) {
    throw new Error(err.message);
  }
};


exports.changePassword = async (user, data) => {
  try {
      if (!data.password || data.password == '') {
      return { status: 0, message: "Please enter valid password" };
    }

    if (!data.newPassword || data.newPassword == '' || !data.confirmPassword || data.confirmPassword == '') {
      return { status: 0, message: "New password and confirm password is required" };
    }

    let passwordMatch = await utils.compare(data.password, user.password);
    if (!passwordMatch) {
      return { status: 0, message: "Current password does not match" };
    }

    if (data.confirmPassword === data.newPassword) {
      var pass = await utils.encryptText(data.newPassword);
      user.password = pass;
      user.otp_info = {
        otp: null,
        expTime: Date.now()
      };
      let userData = await user.save();
      if (!userData) {
        return {
          status: -1,
          message: "Something went wrong Please try Later"
        };
      }
      return {
        status: 1,
        message: "Password changed successfully"
      };
    } else {
      throw {
        message: msg.fieldNotMatch
      };
    }

  }catch (err) {
    throw new Error(err.message);
  }
};

exports.logoutUser = async (user) => {
  try {
      if (!user._id || user._id == '')
        return { status: 0, message: "User does not exist" };

      let update = await UserModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(user._id) }, { $set: { token: null } }, { new: true });
      if (!update) {
        return {
          status: 0,
          message: "Unable to update user"
        }
      }

      return { message: "Logout successfully", status: 1 };

  }catch (err) {
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

exports.getMostPurchashedProducts = async () => {
  try {
      var getProducts = await CartModel.aggregate([ 
        { $group: {_id: "$product_id", count:{ $sum:1 }}} ,
        { $sort:{ count: -1 } },
        { $limit: 3 }
       ])

       let productData = [];
       if(getProducts.length > 0){
        for(let i = 0; i < getProducts.length; i++){
          let product =  await ProductModel.findOne({ _id: mongoose.Types.ObjectId(getProducts[i]._id) });
          productData.push(product);
        }
      }

      let dataToSend = {
        productList: productData
      }
      return {
          status: 1,
          message: 'Product list Fetched successfully',
          data: dataToSend
      }

  } catch (error) {
      return {
          status: -1,
          message: error.message
      }
  }
}

exports.getNotificationList = async (user) => {
  try {
      var notificationList = await NotificationModel.find({ user_id: mongoose.Types.ObjectId(user._id) }).lean();
      
      if (!notificationList || notificationList.length < 1) {
          return {
              status: 0,
              message: 'No notification found'
          }
      }

      notificationList = _.orderBy(notificationList, item => item.created_at, ['desc']);

      let dataToSend = {
        notificationList: notificationList
      }
      return {
          status: 1,
          message: 'Notification list Fetched successfully',
          data: dataToSend
      }

  } catch (error) {
      return {
          status: -1,
          message: error.message
      }
  }
}

exports.updateAppVersion = async (data) => {
  try {
      if (!data.app_version || data.app_version == '')
        return { status: 0, message: "App version is required" };

      let update = await UserModel.updateMany({}, { $set: { app_version: data.app_version } }, { multi: true }).lean();
      if (!update) {
        return {
          status: 0,
          message: "Unable to update app version"
        }
      }
      let allUsers = await UserModel.find({ is_active: true }, { _id: 1 }).lean();
      if(allUsers.length > 0){
        for(let i = 0; i < allUsers.length; i++){
           /* Code for notification start to User */
          let title = "App Version Updated";
          let Notificationbody = "App version has been updated to " + data.app_version;
          let device_type = allUsers[i].device_type;
          let notification = {
            user_id: allUsers[i]._id,
            title: title,
            body: Notificationbody,
            type: 0,
            created_at: Date.now()
          }
          let sendNotification = await NotificationModel.create(notification);
          sendNotification.save();
          
          // let payload = {
          //     title: title,
          //     body: Notificationbody,
          //     noti_type: 1
          // }
          // let notify = {
          //   title: title,
          //   body: Notificationbody,
          //   "color": "#f95b2c",
          //   "sound": true
          // }
          // let deviceToken = allUsers[i].device_token ? allUsers[i].device_token: null;
          // if((deviceToken) && (deviceToken != null)){
          //   console.log(deviceToken)
            // utils.sendPushNotification(deviceToken, device_type, payload, notify);
          // }
        }
      }


      return { message: "App version updated successfully", status: 1 };

  }catch (err) {
    throw new Error(err.message);
  }
};
