const { AdminModel } = require("../models/adminModel");
const { UserModel } = require("../models/userModel");
const { SellerModel } = require("../models/sellerModel");
const { CategoryModel } = require("../models/categoryModel");
const { SubCategoryModel } = require("../models/subCategoryModel");
const { SubSubCategoryModel } = require("../models/subSubCategoryModel");
const { CouponModel } = require("../models/couponModel");
const { ProductModel } = require("../models/productModel");
const { AdvertisementModel } = require("../models/advertisementModel");
const { OrderModel } = require("../models/orderModel");
const { CartModel } = require("../models/cartModel");
const { ratingModel } = require("../models/ratingModel");
const { OrderBookingModel } = require("../models/orderBookingModel");
const { AddressModel } = require("../models/addressModel");
const { NotificationModel } = require("../models/notificationModel");
const { SettingModel } = require("../models/settingModel");
const { FaqModel } = require("../models/faqModel");
const { SubscriptionModel } = require("../models/subscriptionModel");
const { TaxModel } = require("../models/taxModel");
const { ComplaintModel } = require("../models/complaintModel");
const { BrandModel } = require("../models/brandModel");
const { PurchasedSubscriptionModel } = require("../models/purchasedSubscriptionModel");

const utils = require("../modules/utils");
const authentication = require("../middlewares/authentication");
const config = require("../config/config");
const { randomStringGenerator, randomreferralCode, sendPushNotification } = require("../modules/utils");
var _ = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { msg } = require("../modules/message");
var FCM = require('fcm-node');

let sendOtpDuringRegistration = async (userData) => {
  try {
    let otp = await randomStringGenerator();
    let otpExpTime = new Date(Date.now() + config.defaultOTPExpireTime);
    userData.otpInfo = {
      otp: otp,
      expTime: otpExpTime
    }
    let mobileNumber = userData.country_code + userData.mobile_number;
    //Send message via Twillio
    // let send = await utils.sendotp(userData.otpInfo.otp, mobileNumber);
    return {
      status: 1,
      message: "Otp sent Successfully",
      data: userData
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.loginAdmin = async (data) => {
    try {
        if (!data.password || data.password == '')
            throw new Error("Please Enter the password");
        if (!data.email || data.email == '')
            throw new Error("Please Enter the email");

        let admin;

        let admin_check = await AdminModel.find({ user_status: 1 }).lean();

        // Check if Admin exist, if not then Create one
        if (admin_check.length == 0) {
            return { status: 0, data: admin_check };
        }
        admin = await AdminModel.findOne({ email: data.email}).exec();
        if (!admin)
            throw new Error("Email id does not Exist");
        // console.log("admin :", admin);
      
        let check = await utils.compare(data.password, admin.password);
        if (!check) {
            throw new Error(msg.invalidPass);
        }

        let token = authentication.generateToken('30 days');
        // console.log("Token :", token);
        admin.token = token;
        let adminUser = await admin.save();
        if (!adminUser) {
        return { status: -1, message: "Something went wrong, Please try Later" };
        }
        return { status: 1, data: adminUser, message: "Login Successfully" };

    } catch (error) {
        throw new Error(error.message);
    }
};
  
exports.createAdmin = async (data) => {
    try {
      data.user_type = 1;
      if (!data.email || data.email == '')
        throw new Error("Please enter the email");
      if (!data.password || data.password == '')
        throw new Error("Please enter the password.");
      let user = await AdminModel.findOne({});
      if (!user) {
        let pass = await utils.encryptText(data.password);
        data.password = pass;
  
        data.token = await authentication.generateToken('30 days');
  
        let adminUser = new AdminModel(data);
        let admin = await adminUser.save();
        if (!admin) {
          return { status: -1, message: "something went wrong try after sometime" };
        }
        return { data: admin, message: msg.success, status: 1 };
      } else {
        return { status: -1, message: "Admin already Created." };
      }
    } catch (err) {
      throw new Error(err.message);
    }
};

exports.forgetPassword = async (data) => {
    try {
      if (!data.email || data.email == '')
        throw new Error("Please enter the email");

      let admin = await AdminModel.findOne({ email: data.email }).exec();
      if (!admin) {
        return { status: -1, message: "Email does not exist" };
      }
  
      let tokenForLinkValidation = authentication.generateToken('2 days');
      admin.link_token = tokenForLinkValidation;
      // let saveAdmin = await admin.save();
  
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
    //   console.log(sendData);
      // await sendEmailUsingSendgrid(sendData);

      //Code to send otp on mobile no and email
      // let sendOtp = await sendOtpDuringRegistration(user);
      // if (sendOtp.status == -1) {
      //   return {
      //     status: -1,
      //     message: sendOtp.message
      //   };
      // } else {}

      return { status: 1, message: "4 digit OTP will be sent to your registered mobile number successfully", data: admin.token }
  
    } catch (error) {
      throw new Error(error.message);
    }
};

exports.resetPassword = async (data, userData) => {
    try {
      
      if (!data.newPassword || data.newPassword == '')
        return { status: 0, message: "New Password Not be blank" };

      // let admin = await AdminModel.findOne({ link_token: data.id });
      let admin = await AdminModel.findOne({ email: userData.email });
      if (!admin || admin == null) {
        return { status: 0, message: "Invalid Link" };
      }
      // if (data.confirmNewPassword === data.newPassword) {
        var password = await utils.encryptText(data.newPassword);
        admin.password = password;
        // admin.link_token = '' //remove
        let saveAdmin = admin.save();
        if (!saveAdmin) {
          return { status: 0, message: "Something went Wrong" };
        }
        return { status: 1, message: "Password reset successfully" };
      // } else {
      //   return { status: 0, message: msg.fieldNotMatch };
      // }
  
    } catch (error) {
      throw new Error(err.message);
    }
};

exports.changePassword = async (data) => {
    let userId = data._id
    let admin = await AdminModel.findById(userId).lean();
  
    if (!admin || admin == null) throw { message: msg.userNotExist };
  
    let check = await bcrypt.compare(data.oldPassword, admin.password);
    if (!check) throw { message: msg.invalidPass };
    if (data.newPassword === data.confirmPassword) {
      var pass = await bcrypt.hash(data.newPassword, 10);
    } else {
      throw { message: msg.fieldNotMatch };
    }
  
    let a = await AdminModel.updateOne({ _id: userId }, { $set: { password: pass } });
  
    return { message: msg.passwordUpdated };
};

exports.logout = async (user) => {
  let userId = user._id
  if (!user || user == null) throw { message: msg.userNotExist };

  let updateAdmin = await AdminModel.findOneAndUpdate({ _id: userId }, { $set: { token: '' } }, { new: true });
  if (!updateAdmin) {
    return { status: -1, message: "Something went Wrong" };
  }
  return { status: 1, message: "Logout suggessfully" };
};


exports.getAllUsers = async (admin) => {
  try {
      
      let allUsers = await UserModel.find({ is_active: true }).lean();
      if (!allUsers) {
      return { status: -1, message: "Something went wrong, Please try Later" };
      }
      return { status: 1, data: allUsers, message: "Users fetched successfully" };

  } catch (error) {
      throw new Error(error.message);
  }
};

exports.getAllSellers = async (admin) => {
  try {
      
      let allSellers = await SellerModel.find({ is_active: true }).lean();
      if (!allSellers) {
      return { status: -1, message: "Something went wrong, Please try Later" };
      }
      return { status: 1, data: allSellers, message: "Sellers fetched successfully" };

  } catch (error) {
      throw new Error(error.message);
  }
};

exports.blockUser = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("unsufficient Parameters"); }
    let user = await UserModel.findByIdAndUpdate(mongoose.Types.ObjectId(data._id), { isBlocked: data.status }, { new: true });
    if (!user) {
      return { status: -1, message: "Something went Wrong,Please try later." };
    }
    let stat = data.status == "1" ? 'blocked' : 'unblocked';
    return { status: 1, message: `User ${stat} successfully` };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteUser = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("unsufficient Parameters"); }
    let user = await UserModel.findByIdAndUpdate(mongoose.Types.ObjectId(data._id), { is_active: false }, { new: true });
    if (!user) {
      return { status: -1, message: "Something went Wrong,Please try later." };
    }
    return { status: 1, message: "User deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.blockSeller = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("unsufficient Parameters"); }
    let user = await SellerModel.findByIdAndUpdate(mongoose.Types.ObjectId(data._id), { is_blocked: data.status }, { new: true });
    if (!user) {
      return { status: -1, message: "Something went Wrong,Please try later." };
    }
    let stat = data.status == "1" ? 'blocked' : 'unblocked';
    return { status: 1, message: `Seller ${stat} successfully` };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteSeller = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("unsufficient Parameters"); }
    let user = await SellerModel.findByIdAndUpdate(mongoose.Types.ObjectId(data._id), { is_active: false }, { new: true });
    if (!user) {
      return { status: -1, message: "Something went Wrong,Please try later." };
    }
    return { status: 1, message: "Seller deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.viewSeller = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("unsufficient Parameters"); }
    let seller = await SellerModel.findById(mongoose.Types.ObjectId(data._id));
    if (!seller) {
      return { status: -1, message: "Something went Wrong,Please try later." };
    }
    return { status: 1, message: "Seller data fetched successfully", data: seller };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateSellerStatus = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("Seller id is required"); }
    let seller = await SellerModel.findByIdAndUpdate(mongoose.Types.ObjectId(data._id), { status: data.status }, { new: true });
    if (!seller) {
      return { status: -1, message: "Something went Wrong,Please try later." };
    }
    let stat = data.status == "1" ? 'accepted' : 'rejected';
    return { status: 1, message: `Seller ${stat} successfully` };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.uploadFile = async (data, user) => {
  try {
    let { upload_admin_file } = data;
    if (!upload_admin_file || upload_admin_file == '')
      return { status: 0, message: "File is required" };

    return { status: 1, message: "File uploaded successfully", data: upload_admin_file };
    
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.addCategory = async (data) => {
  try {
    if (!data.category_name || data.category_name == '')
      throw new Error("Category name is required");
    if (!data.category_image || data.category_image == '')
      throw new Error("Category image is required");
    let category = await CategoryModel.findOne({ category_name: data.category_name });
    if (!category) {
      let dataToSave = {
        category_name: data.category_name,
        category_image: data.category_image
      }
      let categoryData = new CategoryModel(dataToSave);
      let saveCategory = await categoryData.save();
      if (!saveCategory) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      return { data: saveCategory, message: "Category added successfully", status: 1 };
    } else {
      return { status: 0, message: "Category already created" };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getCategory = async (admin) => {
  try {
    let category = await CategoryModel.find({ is_active: true });
      if (!category) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      return { data: category, message: "Category list fetched successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.editCategory = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("Category id is required"); }
    if (!data.category_name || data.category_name == '')
      throw new Error("Category name is required");
    if (!data.category_image || data.category_image == '')
      throw new Error("Category image is required");

    let categoryData = await CategoryModel.findById(mongoose.Types.ObjectId(data._id));
    if (categoryData) {
      let dataToUpdate = {
        category_name: data.category_name,
        category_image: data.category_image
      }
      let category = await CategoryModel.findByIdAndUpdate(mongoose.Types.ObjectId(data._id), dataToUpdate, { new: true });
      if (!category) {
        return { status: 0, message: "Something went Wrong,Please try later." };
      }
      return { status: 1, message: "Category updated successfully", data: category };
    }else{
      return { status: 0, message: "Category does not exist" };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteCategory = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("Category id is required"); }

    let category = await CategoryModel.findByIdAndUpdate(mongoose.Types.ObjectId(data._id), { is_active: false }, { new: true });
    if (!category) {
      return { status: 0, message: "Something went Wrong,Please try later." };
    }
    return { status: 1, message: "Category deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getCategoryById = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("Category id is required"); }

    let category = await CategoryModel.findById(mongoose.Types.ObjectId(data._id));
    if (!category) {
      return { status: 0, message: "Something went Wrong,Please try later." };
    }
    return { status: 1, message: "Category fetched successfully", data:category };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.addSubCategory = async (data) => {
  try {
    if (!data.category_id || data.category_id == '')
      throw new Error("Category id is required");
    if (!data.subcategory_name || data.subcategory_name == '')
      throw new Error("Subcategory name is required");
    if (!data.subcategory_image || data.subcategory_image == '')
      throw new Error("Subcategory image is required");
    let subcategory = await SubCategoryModel.findOne({ subcategory_name: data.subcategory_name });
    if (!subcategory) {
      let dataToSave = {
        category_id: data.category_id,
        subcategory_name: data.subcategory_name,
        subcategory_image: data.subcategory_image
      }
      let subcategoryData = new SubCategoryModel(dataToSave);
      let saveSubCategory = await subcategoryData.save();
      if (!saveSubCategory) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      return { data: saveSubCategory, message: "Sub-category added successfully", status: 1 };
    } else {
      return { status: 0, message: "Sub-category already created" };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};


exports.getSubCategory = async (admin) => {
  try {
    // if (!data.category_id || data.category_id == '')
    //   throw new Error("Category id is required");
    let subcategory = await SubCategoryModel.find({ is_active: true }).populate('category_id', 'category_name');
      if (!subcategory) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      return { data: subcategory, message: "Sub-category list fetched successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.editSubCategory = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("Subcategory id is required"); }
    if (!data.category_id || data.category_id == '')
      throw new Error("Category id is required");
    if (!data.subcategory_name || data.subcategory_name == '')
      throw new Error("Subcategory name is required");
    if (!data.subcategory_image || data.subcategory_image == '')
      throw new Error("Subcategory image is required");

    let subcategoryData = await SubCategoryModel.findById(mongoose.Types.ObjectId(data._id));
    if (subcategoryData) {
      let dataToUpdate = {
        category_id: data.category_id,
        subcategory_name: data.subcategory_name,
        subcategory_image: data.subcategory_image
      }

      let subcategory = await SubCategoryModel.findByIdAndUpdate(mongoose.Types.ObjectId(data._id), dataToUpdate, { new: true });
      if (!subcategory) {
        return { status: 0, message: "Something went Wrong,Please try later." };
      }
      return { status: 1, message: "Subcategory updated successfully", data: subcategory };
    }else{
      return { status: 0, message: "Subcategory does not exist" };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteSubCategory = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("Sub-category id is required"); }

    let subcategory = await SubCategoryModel.findByIdAndUpdate(mongoose.Types.ObjectId(data._id), { is_active: false }, { new: true });
    if (!subcategory) {
      return { status: 0, message: "Something went Wrong,Please try later." };
    }
    return { status: 1, message: "Sub-category deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getSubCategoryById = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("Subcategory id is required"); }

    let subcategory = await SubCategoryModel.findById(mongoose.Types.ObjectId(data._id));
    if (!subcategory) {
      return { status: 0, message: "Something went Wrong,Please try later." };
    }
    return { status: 1, message: "Subcategory fetched successfully", data:subcategory };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.addSubSubCategory = async (data) => {
  try {
    if (!data.subcategory_id || data.subcategory_id == '')
      throw new Error("Subcategory id is required");
    if (!data.sub_subcategory_name || data.sub_subcategory_name == '')
      throw new Error("Sub-subcategory name is required");
    if (!data.sub_subcategory_image || data.sub_subcategory_image == '')
      throw new Error("Sub-subcategory image is required");
    let subsubcategory = await SubCategoryModel.findOne({ sub_subcategory_name: data.sub_subcategory_name });
    if (!subsubcategory) {
      let dataToSave = {
        subcategory_id: data.subcategory_id,
        sub_subcategory_name: data.sub_subcategory_name,
        sub_subcategory_image: data.sub_subcategory_image
      }
      let subsubcategoryData = new SubSubCategoryModel(dataToSave);
      let savesubsubcategory = await subsubcategoryData.save();
      if (!savesubsubcategory) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      return { data: savesubsubcategory, message: "Sub-subcategory added successfully", status: 1 };
    } else {
      return { status: 0, message: "Sub-subcategory already created" };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getSubSubCategory = async (admin) => {
  try {
    // if (!data.subcategory_id || data.subcategory_id == '')
    //   throw new Error("Subcategory id is required");

    let subsubcategory = await SubSubCategoryModel.find({ is_active: true }).populate('subcategory_id', 'subcategory_name');
      if (!subsubcategory) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      return { data: subsubcategory, message: "Sub-subcategory list fetched successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};


exports.editSubSubCategory = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("sub-subcategory id is required"); }

    if (!data.subcategory_id || data.subcategory_id == '')
      throw new Error("Subcategory id is required");
    if (!data.sub_subcategory_name || data.sub_subcategory_name == '')
      throw new Error("Sub-subcategory name is required");
    if (!data.sub_subcategory_image || data.sub_subcategory_image == '')
      throw new Error("Sub-subcategory image is required");

    let subsubcategoryData = await SubSubCategoryModel.findById(mongoose.Types.ObjectId(data._id));
    if (subsubcategoryData) {
      let dataToUpdate = {
        subcategory_id: data.subcategory_id,
        sub_subcategory_name: data.sub_subcategory_name,
        sub_subcategory_image: data.sub_subcategory_image
      }

      let subsubcategory = await SubSubCategoryModel.findByIdAndUpdate(mongoose.Types.ObjectId(data._id), dataToUpdate, { new: true });
      if (!subsubcategory) {
        return { status: 0, message: "Something went Wrong,Please try later." };
      }
      return { status: 1, message: "Sub-subcategory updated successfully", data: subsubcategory };
    }else{
      return { status: 0, message: "Sub-subcategory does not exist" };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteSubSubCategory = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("Sub-subcategory id is required"); }

    let subsubcategory = await SubSubCategoryModel.findByIdAndUpdate(mongoose.Types.ObjectId(data._id), { is_active: false }, { new: true });
    if (!subsubcategory) {
      return { status: 0, message: "Something went Wrong,Please try later." };
    }
    return { status: 1, message: "Sub-subcategory deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getSubSubCategoryById = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("Sub-subcategory id is required"); }

    let subsubcategory = await SubSubCategoryModel.findById(mongoose.Types.ObjectId(data._id));
    if (!subsubcategory) {
      return { status: 0, message: "Something went Wrong,Please try later." };
    }
    return { status: 1, message: "Sub-subcategory fetched successfully", data:subsubcategory };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.addCoupon = async (data) => {
  try {
    if (!data.name || data.name == '')
      throw new Error("Coupon name is required");
    if (!data.description || data.description == '')
      throw new Error("Coupon description is required");
    // if (!data.product_type || data.product_type == '')
    //   throw new Error("Product type is required");
    if (!data.minimum_purchase_amount || data.minimum_purchase_amount == '')
      throw new Error("Minimum purchase amount is required");
    if (!data.start_date || data.start_date == '')
      throw new Error("Start date is required");
    if (!data.end_date || data.end_date == '')
      throw new Error("End date is required");
    if (!data.discount_type || data.discount_type == '')
      throw new Error("Discount type is required");
    if (!data.discount_amount || data.discount_amount == '')
      throw new Error("Discount amount is required");
    if (!data.maxm_use_limit || data.maxm_use_limit == '')
      throw new Error("Coupon use limit is required");

    let coupon = await CouponModel.findOne({ name: data.name }).exec();
    if (!coupon) {
      let dataToSave = {
        name: data.name,
        description: data.description,
        minimum_purchase_amount: data.minimum_purchase_amount,
        start_date: data.start_date,
        end_date: data.end_date,
        discount_type: data.discount_type,
        discount_amount: data.discount_amount,
        maxm_use_limit: data.maxm_use_limit,
      }
      let couponData = new CouponModel(dataToSave);
      let saveCoupon = await couponData.save();
      if (!saveCoupon) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      return { data: saveCoupon, message: "Coupon added successfully", status: 1 };
    } else {
      return { status: 0, message: "Coupon already created" };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.editCoupon = async (data) => {
  try {
    if (!data._id || data._id == '')
      throw new Error("Coupon id is required");
    if (!data.name || data.name == '')
      throw new Error("Coupon name is required");
    if (!data.description || data.description == '')
      throw new Error("Coupon description is required");
    // if (!data.product_type || data.product_type == '')
    //   throw new Error("Product type is required");
    if (!data.minimum_purchase_amount || data.minimum_purchase_amount == '')
      throw new Error("Minimum purchase amount is required");
    if (!data.start_date || data.start_date == '')
      throw new Error("Start date is required");
    if (!data.end_date || data.end_date == '')
      throw new Error("End date is required");
    if (!data.discount_type || data.discount_type == '')
      throw new Error("Discount type is required");
    if (!data.discount_amount || data.discount_amount == '')
      throw new Error("Discount amount is required");
    if (!data.maxm_use_limit || data.maxm_use_limit == '')
      throw new Error("Coupon use limit is required");

    let coupon = await CouponModel.findOne({ _id: mongoose.Types.ObjectId(data._id) }).exec();
    if (coupon) {
      let dataToUpdate = {
        name: data.name,
        description: data.description,
        minimum_purchase_amount: data.minimum_purchase_amount,
        start_date: data.start_date,
        end_date: data.end_date,
        discount_type: data.discount_type,
        discount_amount: data.discount_amount,
        maxm_use_limit: data.maxm_use_limit,
      }
      let updateCoupon = await CouponModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data._id)}, dataToUpdate, { new: true } );
      if (!updateCoupon) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      return { data: updateCoupon, message: "Coupon updated successfully", status: 1 };
    } else {
      return { status: 0, message: "Coupon does not exist" };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getCoupons = async (admin) => {
  try {
    let coupons = await CouponModel.find({ is_active: true }).lean();
      if (!coupons) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      return { data: coupons, message: "Coupon list fetched successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteCoupon = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("Coupon id is required"); }

    let coupon = await CouponModel.findByIdAndUpdate(mongoose.Types.ObjectId(data._id), { is_active: false }, { new: true });
    if (!coupon) {
      return { status: 0, message: "Something went Wrong,Please try later." };
    }
    return { status: 1, message: "Coupon deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.viewCoupon = async (data) => {
  try {
    if (!data._id || data._id == '') { throw new Error("Coupon id is required"); }

    let coupon = await CouponModel.findById(mongoose.Types.ObjectId(data._id)).exec();
    if (!coupon) {
      return { status: 0, message: "Something went Wrong,Please try later." };
    }
    return { status: 1, message: "Coupon fetched successfully", data: coupon };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getAllProducts = async (admin) => {
  try {
    if (!admin._id || admin._id == '')
      return { status: 0, message: "please login first to get product list" };

    let products = await ProductModel.find({ is_active: true }).populate('seller_id', "first_name last_name")
    .populate('product_category', "category_name").populate('sub_category', "subcategory_name").populate('sub_subcategory', "sub_subcategory_name").lean();
      if (!products) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      
      return { data: products, message: "Products fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.viewProduct = async (data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "Product id is required" };

    let product = await ProductModel.findOne({ _id: data._id, is_active: true }).exec();
      if (!product) {
        return { status: 0, message: "Product does not exist" };
      }
      
      return { data: product, message: "Product fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteProduct = async (data) => {
  try {
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

exports.editProduct = async (admin, data) => {
  try {
    let { seller_id, product_type_id, store_name, product_name, product_description, product_image, 
      product_price, product_category, sub_category, sub_subcategory, offer_applicable, 
      product_expiry_date, return_replacement_applicable, maxm_replacement_days, maxm_return_days } = data;
    
    if (!data._id || data._id == '')
      return { status: 0, message: "Insufficient parameter, product id is required" };
    if (!seller_id || seller_id == '')
      return { status: 0, message: "Seller id is required" };
    if (!product_type_id || product_type_id == '')
      return { status: 0, message: "Product type id is required" };
    if (!store_name || store_name == '')
      return { status: 0, message: "Store name is required" };
    if (!product_name || product_name == '')
      return { status: 0, message: "Product name is required" };
    if (!product_description || product_description == '')
      return { status: 0, message: "Product description is required" };
    if (!product_image || product_image == '')
      return { status: 0, message: "Product image is required" };
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
      
    let product = await ProductModel.findOne({ _id: mongoose.Types.ObjectId(data._id), is_active: true });
    if(!product){
      return { status: 0, message: "Product does not exist" };
    }
    let dataToUpdate = {
      seller_id: seller_id,
      product_type_id,
      store_name,
      product_name,
      product_description,
      product_image,
      product_price,
      product_category,
      sub_category,
      sub_subcategory,
      offer_applicable,
      product_expiry_date,
      return_replacement_applicable,
      maxm_replacement_days,
      maxm_return_days
    }

    let updateProduct = await ProductModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data._id)}, dataToUpdate, { new: true } );
    if (!updateProduct) {
      return { status: 0, message: "something went wrong try after sometime" };
    }

    return { status: 1, message: "Product updated successfully", data: updateProduct };
    
  } catch (error) {
    throw new Error(error.message);
  }
}

exports.blockProduct = async (data) => {
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

exports.addAdvertisement = async (data) => {
  try {
    // if (!data.name || data.name == '')
    //   throw new Error("Ad name is required");
    // if (!data.description || data.description == '')
    //   throw new Error("Ad description is required");
    if (!data.image || data.image == '')
      throw new Error("Add image is required");
    if (!data.start_date || data.start_date == '')
      throw new Error("Start date is required");
    if (!data.end_date || data.end_date == '')
      throw new Error("End date is required");

    // let advertisement = await AdvertisementModel.findOne({ name: data.name }).exec();
    // if (!advertisement) {
      let dataToSave = {
        image: data.image,
        start_date: data.start_date,
        end_date: data.end_date
      }
      let adData = new AdvertisementModel(dataToSave);
      let saveAdvertisement = await adData.save();
      if (!saveAdvertisement) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      return { data: saveAdvertisement, message: "Advertisement added successfully", status: 1 };
    // } else {
    //   return { status: 0, message: "Advertisement already created" };
    // }
  } catch (err) {
    throw new Error(err.message);
  }
};


exports.editAdvertisement = async (data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "Insufficient parameter, ad id is required" };
    // if (!data.name || data.name == '')
    //   throw new Error("Ad name is required");
    // if (!data.description || data.description == '')
    //   throw new Error("Ad description is required");
    if (!data.image || data.image == '')
      throw new Error("Add image is required");
    if (!data.start_date || data.start_date == '')
      throw new Error("Start date is required");
    if (!data.end_date || data.end_date == '')
      throw new Error("End date is required");

    let advertisement = await AdvertisementModel.findOne({ _id: mongoose.Types.ObjectId(data._id), is_active: true });
    if(!advertisement){
      return { status: 0, message: "Advertisement does not exist" };
    }
    let dataToUpdate = {
      image: data.image,
      start_date: data.start_date,
      end_date: data.end_date
    }

    let updateAd = await AdvertisementModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data._id)}, dataToUpdate, { new: true } );
    if (!updateAd) {
      return { status: 0, message: "something went wrong try after sometime" };
    }

    return { status: 1, message: "Advertisement updated successfully", data: updateAd };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getAllAdvertisements = async (admin) => {
  try {
    if (!admin._id || admin._id == '')
      return { status: 0, message: "please login first to get advertisement list" };

    let allAdvertisements = await AdvertisementModel.find({ is_active: true }).exec();
      if (!allAdvertisements) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      
      return { data: allAdvertisements, message: "All advertisements fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteAdvertisement = async (data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "Advertisement id is required" };

    let advertisement = await AdvertisementModel.findOneAndUpdate({ _id: data._id }, { $set: { is_active: false } }, { new: true })
      if (!advertisement) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      
      return { message: "Advertisement deleted successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.ongoingOrderList = async (admin) => {
  try {

    let ongoingOrderList = await CartModel.find({ is_deleted: false, $or: [{status: 3}, {status: 4}, {status: 5}, {status: 6}, {status: 7}, {status: 8}] },{ order_id: 1, user_id: 1 }).populate('order_id').populate('user_id', 'first_name last_name country_code mobile_number').lean();
    let dataToSend = {
      ongoingOrderList: ongoingOrderList
    }
    return { data: dataToSend, message: "Ongoing order list fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.completedOrderList = async (admin) => {
  try {

    let completedOrderList = await CartModel.find({ is_deleted: false, status: 9 },{ order_id: 1, user_id: 1 }).populate('order_id').populate('user_id', 'first_name last_name country_code mobile_number').lean();
    let dataToSend = {
      completedOrderList: completedOrderList
    }
    return { data: dataToSend, message: "Completed order list fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.cancelledOrderList = async (admin) => {
  try {

    let cancelledOrderList = await CartModel.find({ is_deleted: false, status: 10 },{ order_id: 1, user_id: 1 }).populate('order_id').populate('user_id', 'first_name last_name country_code mobile_number').lean();
    let dataToSend = {
      cancelledOrderList: cancelledOrderList
    }
    return { data: dataToSend, message: "Cancelled order list fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.ongoingOrderDetails = async (admin, data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "Order id is required" };

    let orderDetails = await OrderModel.findOne({ _id: mongoose.Types.ObjectId(data._id) })
    .populate('user_id','first_name last_name email country_code mobile_number')
    .populate('address_id', 'building_number flat_number street_number country state city zip_code')
    .populate('coupon_id', 'name').lean();
    if(!orderDetails){
      return {
        status: 0,
        message: "Unable to fetch order details"
      }
    }

    let cartDetails = await CartModel.findOne({ _id: mongoose.Types.ObjectId(orderDetails.cart_id) }, { currency: 1, price: 1, quantity: 1, unit_price: 1,order_id: 1 })
    .populate('product_id', 'product_name product_image')
    .populate('seller_id', 'country_code mobile_number first_name last_name store_name store_address store_city store_country store_commercial_name').lean();

    orderDetails['cartProducts'] = cartDetails;

    let dataToSend = {
      orderDetails: orderDetails
    }
    return { data: dataToSend, message: "Order detail fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};


exports.completedOrderDetails = async (admin, data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "Order id is required" };

    let orderDetails = await OrderModel.findOne({ _id: mongoose.Types.ObjectId(data._id) })
    .populate('user_id','first_name last_name email country_code mobile_number')
    .populate('address_id', 'building_number flat_number street_number country state city zip_code')
    .populate('coupon_id', 'name').lean();
    if(!orderDetails){
      return {
        status: 0,
        message: "Unable to fetch order details"
      }
    }

    let cartDetails = await CartModel.findOne({ _id: mongoose.Types.ObjectId(orderDetails.cart_id) }, { currency: 1, price: 1, quantity: 1, unit_price: 1,order_id: 1, product_id:1 })
    .populate('product_id', "product_name product_image")
    .populate('seller_id', 'country_code mobile_number first_name last_name store_name store_address store_city store_country store_commercial_name').lean();

    // .populate({
    //   path: 'product_id', model: "product", select: "product_name product_image _id", populate: {
    //     path: 'product_id',
    //     match: { '_id': { $eq: 'product_id' } },
    //     model: 'rating',
    //     select: 'rating_point review'
    //   }
    // })

    
    let productId = cartDetails.product_id._id;
    let userId = orderDetails.user_id._id;
    if(productId && userId){
      let findRating = await ratingModel.find({ user_id: mongoose.Types.ObjectId(userId), product_id: mongoose.Types.ObjectId(productId) }, { rating_point: 1, review: 1 })
      var totalRating = 0;
      var avgRating = 0;
      if(findRating.length > 0){
        for (let index = 0; index < (findRating || []).length; index++) {
          var element = findRating[index]
          totalRating = totalRating + element.rating_point
        }
        avgRating = ((totalRating) / (findRating || []).length) 

        let ratingData = {
          rating: avgRating,
          review: findRating[0].review
        }
        orderDetails['ratingData'] = ratingData;
      }

    }
    orderDetails['cartProducts'] = cartDetails;
    
    let dataToSend = {
      orderDetails: orderDetails
    }
    return { data: dataToSend, message: "Order detail fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.cancelledOrderDetails = async (admin, data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "Order id is required" };

    let orderDetails = await OrderModel.findOne({ _id: mongoose.Types.ObjectId(data._id) })
    .populate('user_id','first_name last_name email country_code mobile_number')
    .populate('address_id', 'building_number flat_number street_number country state city zip_code')
    .populate('coupon_id', 'name').lean();
    if(!orderDetails){
      return {
        status: 0,
        message: "Unable to fetch order details"
      }
    }

    let cartDetails = await CartModel.findOne({ _id: mongoose.Types.ObjectId(orderDetails.cart_id) }, { currency: 1, price: 1, quantity: 1, unit_price: 1,order_id: 1 })
    .populate('product_id', 'product_name product_image')
    .populate('seller_id', 'country_code mobile_number first_name last_name store_name store_address store_city store_country store_commercial_name').lean();

    orderDetails['cartProducts'] = cartDetails;

    let dataToSend = {
      orderDetails: orderDetails
    }
    return { data: dataToSend, message: "Cancelled order detail fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};


exports.orderBookingList = async (admin) => {
  try {
    if (!admin._id || admin._id == '')
      return { status: 0, message: "Please login to get details" };

    let orderBookingDetails = await OrderBookingModel.find({}).lean();

    let dataToSend = {
      orderBookingDetails: orderBookingDetails
    }
    return { data: dataToSend, message: "Order booking list fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.orderBookingDetails = async (admin, data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "booking id is required" };

    let orderBookingDetails = await OrderBookingModel.findOne({ _id: mongoose.Types.ObjectId(data._id) })
    .populate('user_id', 'first_name last_name country_code mobile_number profile_pic')
    .populate('coupon_id', 'name').lean();
    if(!orderBookingDetails){
      return {
        status: 0,
        message: "Unable to fetch order details"
      }
    }
    let userId = orderBookingDetails.user_id._id;

    if(userId){
      let userAddress = await AddressModel.findOne({ user_id: mongoose.Types.ObjectId(userId), default_address: 1 }).select('building_number flat_number street_number country state city zip_code').lean();
      orderBookingDetails['userAddress'] = userAddress;
    }

    let cartData = [];
    if(orderBookingDetails.cart_id.length > 0){
      for(let i = 0; i < orderBookingDetails.cart_id.length; i++){
        let cartDetails = await CartModel.findOne({ _id: mongoose.Types.ObjectId(orderBookingDetails.cart_id[i]) }, { currency: 1, price: 1, quantity: 1, unit_price: 1, note: 1 })
        .populate('product_id', 'product_name product_image')
        .populate('order_id','payment_options cheque_image created_at intransit_on dispatch_on shipping_on arriving_on out_for_delivery_on delivered_on cancelled_on reason status')
        .populate('seller_id', 'country_code mobile_number first_name last_name store_name store_address store_city store_country store_commercial_name').lean();

        cartData.push(cartDetails)
      }
    }
    orderBookingDetails['cartProducts'] = cartData;

    let dataToSend = {
      orderBookingDetails: orderBookingDetails
    }
    return { data: dataToSend, message: "Order booking detail fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.orderCommissionList = async (admin) => {
  try {
    if (!admin._id || admin._id == '')
      return { status: 0, message: "Please login to get details" };

    let orderBookingDetails = await OrderBookingModel.find({}).lean();
    
    let commissionAmount = 0;
    for(let i=0; i < orderBookingDetails.length; i++){
      let totalAmount = orderBookingDetails[i].total_amount
      commissionAmount = ((5 * totalAmount) / 100)
      orderBookingDetails[i].commissionAmount = parseFloat(commissionAmount).toFixed(2)
    }
    
    let dataToSend = {
      orderBookingDetails: orderBookingDetails
    }
    return { data: dataToSend, message: "Order booking list fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};


exports.getOngoingOrdersReport = async (admin) => {
  try {
    if (!admin || admin._id == '')
      return { status: 0, message: "Login first to get ongoing order list" };

      let ongoingOrderReport = await CartModel.aggregate([
        { $match: { 
            $and: [{ is_deleted: false }, { $or: [{status: 3}, {status: 4}, {status: 5}, {status: 6}, {status: 7}, {status: 8}]}]
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
        },{
          $lookup: {
            from: "seller",
            localField: "seller_id",
            foreignField: "_id",
            as: "seller"
          }
        },
        {
          $unwind: {
            path: "$seller",
            preserveNullAndEmptyArrays: true
          }
        }, {
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
            order_date: "$order.created_at",
            status: { $toInt: "$order.status" },
            first_name: "$user.first_name",
            last_name: "$user.last_name",
            user_email: "$user.user_email",
            user_country_code: "$user.country_code",
            user_mobile: "$user.mobile_number",
            seller_first_name: "$seller.first_name",
            seller_last_name: "$seller.last_name",
            seller_country_code: "$seller.country_code",
            seller_mobile_number: "$seller.mobile_number",
            seller_email: "$seller.email",
            seller_store_name: "$seller.store_name",
            seller_store_commercial_name: "$seller.store_commercial_name",
            seller_store_address: "$seller.store_address",
            seller_store_city: "$seller.store_city",
            seller_store_country: "$seller.store_country"
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

exports.getCompletedOrdersReport = async (admin) => {
  try {
    if (!admin || admin._id == '')
      return { status: 0, message: "Login first to get completed order list" };

      let completedOrderReport = await CartModel.aggregate([
        { $match: { 
            $and: [{ is_deleted: false }, {status: 9}]
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
        },{
          $lookup: {
            from: "seller",
            localField: "seller_id",
            foreignField: "_id",
            as: "seller"
          }
        },
        {
          $unwind: {
            path: "$seller",
            preserveNullAndEmptyArrays: true
          }
        }, {
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
            order_date: "$order.created_at",
            status: { $toInt: "$order.status" },
            first_name: "$user.first_name",
            last_name: "$user.last_name",
            user_email: "$user.user_email",
            user_country_code: "$user.country_code",
            user_mobile: "$user.mobile_number",
            seller_first_name: "$seller.first_name",
            seller_last_name: "$seller.last_name",
            seller_country_code: "$seller.country_code",
            seller_mobile_number: "$seller.mobile_number",
            seller_email: "$seller.email",
            seller_store_name: "$seller.store_name",
            seller_store_commercial_name: "$seller.store_commercial_name",
            seller_store_address: "$seller.store_address",
            seller_store_city: "$seller.store_city",
            seller_store_country: "$seller.store_country"
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

exports.getCancelledOrdersReport = async (admin) => {
  try {
    if (!admin || admin._id == '')
      return { status: 0, message: "Login first to get cancelled order list" };

    let cancelledOrderReport = await CartModel.aggregate([
      { 
        $match: { 
          $and: [{status: 10}, { is_deleted: false }]
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
      },{
        $lookup: {
          from: "seller",
          localField: "seller_id",
          foreignField: "_id",
          as: "seller"
        }
      },
      {
        $unwind: {
          path: "$seller",
          preserveNullAndEmptyArrays: true
        }
      }, {
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
          order_date: "$order.created_at",
          status: { $toInt: "$order.status" },
          first_name: "$user.first_name",
          last_name: "$user.last_name",
          user_email: "$user.user_email",
          user_country_code: "$user.country_code",
          user_mobile: "$user.mobile_number",
          seller_first_name: "$seller.first_name",
          seller_last_name: "$seller.last_name",
          seller_country_code: "$seller.country_code",
          seller_mobile_number: "$seller.mobile_number",
          seller_email: "$seller.email",
          seller_store_name: "$seller.store_name",
          seller_store_commercial_name: "$seller.store_commercial_name",
          seller_store_address: "$seller.store_address",
          seller_store_city: "$seller.store_city",
          seller_store_country: "$seller.store_country"
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

exports.getSellerCommissionReport = async (admin) => {
  try {
    if (!admin || admin._id == '')
      return { status: 0, message: "Login first to get seller commission list" };

    let commissionReport = await CartModel.aggregate([
      { $match: { 
          $and: [{ is_deleted: false }, {status: 9}]
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
      },{
        $lookup: {
          from: "seller",
          localField: "seller_id",
          foreignField: "_id",
          as: "seller"
        }
      },
      {
        $unwind: {
          path: "$seller",
          preserveNullAndEmptyArrays: true
        }
      }, {
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
          status: { $toInt: "$order.status" },
          first_name: "$user.first_name",
          last_name: "$user.last_name",
          user_email: "$user.user_email",
          user_country_code: "$user.country_code",
          user_mobile: "$user.mobile_number",
          seller_first_name: "$seller.first_name",
          seller_last_name: "$seller.last_name",
          seller_country_code: "$seller.country_code",
          seller_mobile_number: "$seller.mobile_number",
          seller_email: "$seller.email",
          seller_store_name: "$seller.store_name",
          seller_store_commercial_name: "$seller.store_commercial_name",
          seller_store_address: "$seller.store_address",
          seller_store_city: "$seller.store_city",
          seller_store_country: "$seller.store_country"
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


exports.getUserReport = async (admin) => {
  try {
    if (!admin || admin._id == '')
      return { status: 0, message: "Login first to get user list" };

      let usersDetail = await UserModel.aggregate([
        { 
          $match: { 
            is_active: true 
          }
        }, {
          $project: {
            first_name: "$first_name",
            last_name: "$last_name",
            email: "$email",
            country_code: "$country_code",
            mobile_number: "$mobile_number",
            user_city: "$user_details.user_city",
            user_country: "$user_details.user_country",
            university_name: "$user_details.university_name",
            vat_number: "$user_details.vat_number",
            nationality: "$user_details.nationality",
            workplace: "$user_details.workplace",
            office_number: "$user_details.office_number",
            clinic_name: "$user_details.clinic_name"
          }
        }
      ])

    let dataToSend = {
      userList: usersDetail
    }

    return { data: dataToSend, message: "User report fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getTodayCompletedOrdersReport = async (admin) => {
  try {
    if (!admin || admin._id == '')
      return { status: 0, message: "Login first to view order report" };

      var start = new Date();
          start.setUTCHours(0,0,0,0);
      let todayStart = Date.parse(start);

      let todayReport = await OrderModel.aggregate([
        { $match: { 
            $and: [{ status: 7 }, { delivered_on: { '$gte': todayStart }}]
          }
        },
        {
          $lookup: {
            from: "cart",
            localField: "cart_id",
            foreignField: "_id",
            as: "cart"
          }
        },
        {
          $unwind: {
            path: "$cart",
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
            $lookup: {
              from: "product",
              localField: "cart.product_id",
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
            $lookup: {
              from: "seller",
              localField: "cart.seller_id",
              foreignField: "_id",
              as: "seller"
            }
          },
          {
            $unwind: {
              path: "$seller",
              preserveNullAndEmptyArrays: true
            }
          }, {
          $project: {
            _id: 0,
            product_name: "$product.product_name",
            order_id: "$order_id",
            payment_options: "$payment_options",
            currency: "$currency",
            price: {
              $multiply:
                ["$cart.unit_price", "$cart.quantity"]
            },
            unit_price: "$cart.unit_price",
            quantity: "$cart.quantity",
            order_date: "$created_at",
            status: { $toInt: "$status" },
            user_first_name: "$user.first_name",
            user_last_name: "$user.last_name",
            user_email: "$user.user_email",
            user_country_code: "$user.country_code",
            user_mobile: "$user.mobile_number",
            seller_first_name: "$seller.first_name",
            seller_last_name: "$seller.last_name",
            seller_country_code: "$seller.country_code",
            seller_mobile_number: "$seller.mobile_number",
            seller_email: "$seller.email",
            seller_store_name: "$seller.store_name",
            seller_store_commercial_name: "$seller.store_commercial_name",
            seller_store_address: "$seller.store_address",
            seller_store_city: "$seller.store_city",
            seller_store_country: "$seller.store_country"
          }
        }
      ])

      if(todayReport.length > 0){
        for(let i =0; i < todayReport.length; i++){
          todayReport[i].status = utils.getOrderStatus(todayReport[i].status)
          todayReport[i].order_date = new Date(todayReport[i].order_date)
        }
      }
  
      let dataToSend = {
        todayReport: todayReport
      }

      return { data: dataToSend, message: "Today order completed report fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getMonthCompletedOrdersReport = async (admin) => {
  try {
    if (!admin || admin._id == '')
      return { status: 0, message: "Login first to view order report" };

      var start = new Date();
          start.setUTCHours(0,0,0,0);
      let todayStart = Date.parse(start);
      let monthStart = (todayStart - (30 * 86400000));

      let monthReport = await OrderModel.aggregate([
        { $match: { 
            $and: [{ status: 7 }, { delivered_on: { '$gte': monthStart }}]
          }
        },
        {
          $lookup: {
            from: "cart",
            localField: "cart_id",
            foreignField: "_id",
            as: "cart"
          }
        },
        {
          $unwind: {
            path: "$cart",
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
            $lookup: {
              from: "product",
              localField: "cart.product_id",
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
            $lookup: {
              from: "seller",
              localField: "cart.seller_id",
              foreignField: "_id",
              as: "seller"
            }
          },
          {
            $unwind: {
              path: "$seller",
              preserveNullAndEmptyArrays: true
            }
          }, {
          $project: {
            _id: 0,
            product_name: "$product.product_name",
            order_id: "$order_id",
            payment_options: "$payment_options",
            currency: "$currency",
            price: {
              $multiply:
                ["$cart.unit_price", "$cart.quantity"]
            },
            unit_price: "$cart.unit_price",
            quantity: "$cart.quantity",
            order_date: "$created_at",
            status: { $toInt: "$status" },
            user_first_name: "$user.first_name",
            user_last_name: "$user.last_name",
            user_email: "$user.user_email",
            user_country_code: "$user.country_code",
            user_mobile: "$user.mobile_number",
            seller_first_name: "$seller.first_name",
            seller_last_name: "$seller.last_name",
            seller_country_code: "$seller.country_code",
            seller_mobile_number: "$seller.mobile_number",
            seller_email: "$seller.email",
            seller_store_name: "$seller.store_name",
            seller_store_commercial_name: "$seller.store_commercial_name",
            seller_store_address: "$seller.store_address",
            seller_store_city: "$seller.store_city",
            seller_store_country: "$seller.store_country"
          }
        }
      ])

      if(monthReport.length > 0){
        for(let i =0; i < monthReport.length; i++){
          monthReport[i].status = utils.getOrderStatus(monthReport[i].status)
          monthReport[i].order_date = new Date(monthReport[i].order_date)
        }
      }
  
      let dataToSend = {
        monthReport: monthReport
      }

      return { data: dataToSend, message: "Month order completed report fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getQuarterCompletedOrdersReport = async (admin) => {
  try {
    if (!admin || admin._id == '')
      return { status: 0, message: "Login first to view order report" };

      var start = new Date();
          start.setUTCHours(0,0,0,0);
      let todayStart = Date.parse(start);
      let quarterStart = (todayStart - (90 * 86400000));

      let quarterReport = await OrderModel.aggregate([
        { $match: { 
            $and: [{ status: 7 }, { delivered_on: { '$gte': quarterStart }}]
          }
        },
        {
          $lookup: {
            from: "cart",
            localField: "cart_id",
            foreignField: "_id",
            as: "cart"
          }
        },
        {
          $unwind: {
            path: "$cart",
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
            $lookup: {
              from: "product",
              localField: "cart.product_id",
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
            $lookup: {
              from: "seller",
              localField: "cart.seller_id",
              foreignField: "_id",
              as: "seller"
            }
          },
          {
            $unwind: {
              path: "$seller",
              preserveNullAndEmptyArrays: true
            }
          }, {
          $project: {
            _id: 0,
            product_name: "$product.product_name",
            order_id: "$order_id",
            payment_options: "$payment_options",
            currency: "$currency",
            price: {
              $multiply:
                ["$cart.unit_price", "$cart.quantity"]
            },
            unit_price: "$cart.unit_price",
            quantity: "$cart.quantity",
            order_date: "$created_at",
            status: { $toInt: "$status" },
            user_first_name: "$user.first_name",
            user_last_name: "$user.last_name",
            user_email: "$user.user_email",
            user_country_code: "$user.country_code",
            user_mobile: "$user.mobile_number",
            seller_first_name: "$seller.first_name",
            seller_last_name: "$seller.last_name",
            seller_country_code: "$seller.country_code",
            seller_mobile_number: "$seller.mobile_number",
            seller_email: "$seller.email",
            seller_store_name: "$seller.store_name",
            seller_store_commercial_name: "$seller.store_commercial_name",
            seller_store_address: "$seller.store_address",
            seller_store_city: "$seller.store_city",
            seller_store_country: "$seller.store_country"
          }
        }
      ])

      if(quarterReport.length > 0){
        for(let i =0; i < quarterReport.length; i++){
          quarterReport[i].status = utils.getOrderStatus(quarterReport[i].status)
          quarterReport[i].order_date = new Date(quarterReport[i].order_date)
        }
      }
  
      let dataToSend = {
        quarterReport: quarterReport
      }

      return { data: dataToSend, message: "Order completed report for quarter fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getYearCompletedOrdersReport = async (admin) => {
  try {
    if (!admin || admin._id == '')
      return { status: 0, message: "Login first to view order report" };

      var start = new Date();
          start.setUTCHours(0,0,0,0);
      let todayStart = Date.parse(start);
      let yearStart = (todayStart - (365 * 86400000));

      let yearReport = await OrderModel.aggregate([
        { $match: { 
            $and: [{ status: 7 }, { delivered_on: { '$gte': yearStart }}]
          }
        },
        {
          $lookup: {
            from: "cart",
            localField: "cart_id",
            foreignField: "_id",
            as: "cart"
          }
        },
        {
          $unwind: {
            path: "$cart",
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
            $lookup: {
              from: "product",
              localField: "cart.product_id",
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
            $lookup: {
              from: "seller",
              localField: "cart.seller_id",
              foreignField: "_id",
              as: "seller"
            }
          },
          {
            $unwind: {
              path: "$seller",
              preserveNullAndEmptyArrays: true
            }
          }, {
          $project: {
            _id: 0,
            product_name: "$product.product_name",
            order_id: "$order_id",
            payment_options: "$payment_options",
            currency: "$currency",
            price: {
              $multiply:
                ["$cart.unit_price", "$cart.quantity"]
            },
            unit_price: "$cart.unit_price",
            quantity: "$cart.quantity",
            order_date: "$created_at",
            status: { $toInt: "$status" },
            user_first_name: "$user.first_name",
            user_last_name: "$user.last_name",
            user_email: "$user.user_email",
            user_country_code: "$user.country_code",
            user_mobile: "$user.mobile_number",
            seller_first_name: "$seller.first_name",
            seller_last_name: "$seller.last_name",
            seller_country_code: "$seller.country_code",
            seller_mobile_number: "$seller.mobile_number",
            seller_email: "$seller.email",
            seller_store_name: "$seller.store_name",
            seller_store_commercial_name: "$seller.store_commercial_name",
            seller_store_address: "$seller.store_address",
            seller_store_city: "$seller.store_city",
            seller_store_country: "$seller.store_country"
          }
        }
      ])

      if(yearReport.length > 0){
        for(let i =0; i < yearReport.length; i++){
          yearReport[i].status = utils.getOrderStatus(yearReport[i].status)
          yearReport[i].order_date = new Date(yearReport[i].order_date)
        }
      }
  
      let dataToSend = {
        yearReport: yearReport
      }

      return { data: dataToSend, message: "Order completed report for year fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getFinanceReport = async (admin) => {
  try {
    if (!admin || admin._id == '')
      return { status: 0, message: "Login first to view order report" };

      let financeReport = await CartModel.aggregate([
        { 
          $match: { 
            $and: [{ is_deleted: false }, {status: 9}]
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
        },{
          $lookup: {
            from: "seller",
            localField: "seller_id",
            foreignField: "_id",
            as: "seller"
          }
        },
        {
          $unwind: {
            path: "$seller",
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
            user_mobile: "$user.mobile_number",
            seller_first_name: "$seller.first_name",
            seller_last_name: "$seller.last_name",
            seller_country_code: "$seller.country_code",
            seller_mobile_number: "$seller.mobile_number",
            seller_email: "$seller.email",
            seller_store_name: "$seller.store_name",
            seller_store_commercial_name: "$seller.store_commercial_name",
            seller_store_address: "$seller.store_address",
            seller_store_city: "$seller.store_city",
            seller_store_country: "$seller.store_country"
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

      return { data: dataToSend, message: "Finance report fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getSellerOrderReport = async (admin) => {
  try {
    if (!admin || admin._id == '')
      return { status: 0, message: "Login first to view order report" };

      let sellerOrderReport = await CartModel.aggregate([
        { 
          $match: { 
            $and: [{ is_deleted: false }, {status: 9}]
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
            from: "seller",
            localField: "seller_id",
            foreignField: "_id",
            as: "seller"
          }
        },
        {
          $unwind: {
            path: "$seller",
            preserveNullAndEmptyArrays: true
          }
        },{
          $lookup: {
            from: "product",
            localField: "product_id",
            foreignField: "_id",
            as: "product"
          }
        },{
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
            seller_first_name: "$seller.first_name",
            seller_last_name: "$seller.last_name",
            seller_country_code: "$seller.country_code",
            seller_mobile_number: "$seller.mobile_number",
            seller_email: "$seller.email",
            seller_store_name: "$seller.store_name",
            seller_store_commercial_name: "$seller.store_commercial_name",
            seller_store_address: "$seller.store_address",
            seller_store_city: "$seller.store_city",
            seller_store_country: "$seller.store_country"
          }
        }
      ])

      if(sellerOrderReport.length > 0){
        for(let i =0; i < sellerOrderReport.length; i++){
          let totalOrders = 0;
          if(sellerOrderReport[i].orderIds.length > 0){
            totalOrders = sellerOrderReport[i].orderIds.length
            sellerOrderReport[i].delivery_charge = (sellerOrderReport[i].delivery_charge / totalOrders).toFixed(2);
            sellerOrderReport[i].tax_amount = (sellerOrderReport[i].tax_amount / totalOrders).toFixed(2);
            if(sellerOrderReport[i].discount_amount > 0){
              sellerOrderReport[i].discount_amount = (sellerOrderReport[i].discount_amount / totalOrders).toFixed(2);
              sellerOrderReport[i].price = ((sellerOrderReport[i].price) - (sellerOrderReport[i].discount_amount)).toFixed(2);
            }
          }
          sellerOrderReport[i].status = utils.getOrderStatus(sellerOrderReport[i].status)
          sellerOrderReport[i].order_date = new Date(sellerOrderReport[i].order_date)
          sellerOrderReport[i].commission =  ((sellerOrderReport[i].price) * 0.05).toFixed(2);
          sellerOrderReport[i].amountToBePaid = ((sellerOrderReport[i].price) - (sellerOrderReport[i].commission)).toFixed(2)
        }
      }

    let dataToSend = {
      sellerOrderReport: sellerOrderReport
    }

      return { data: dataToSend, message: "Seller order report fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getUserOrderReport = async (admin) => {
  try {
    if (!admin || admin._id == '')
      return { status: 0, message: "Login first to view order report" };

      let userOrderReport = await CartModel.aggregate([
        { 
          $match: { 
            $and: [{ is_deleted: false }, {status: 9}]
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
        }, {
          $project: {
            _id: 0,
            booking_id: "$booking.booking_id",
            transaction_id: "$booking.transaction_id",
            orderIds: "$booking.cart_id",
            delivery_charge: "$booking.delivery_charge",
            tax_amount: "$booking.tax_amount",
            discount_amount: "$booking.discount_amount",
            total_amount_paid: "$booking.total_amount",
            payment_options: "$order.payment_options",
            currency: "$order.currency",
            user_first_name: "$user.first_name",
            user_last_name: "$user.last_name",
            user_email: "$user.user_email",
            user_country_code: "$user.country_code",
            user_mobile: "$user.mobile_number"
          }
        }
      ])

      if(userOrderReport.length > 0){
        for(let i =0; i < userOrderReport.length; i++){
          userOrderReport[i].total_products_ordered = userOrderReport[i].orderIds.length
        }
      }

    let dataToSend = {
      userOrderReport: userOrderReport
    }

      return { data: dataToSend, message: "User order report fetch successfully", status: 1 };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.sendNotification = async ( body ) => {
  try {  
      if( body.userId.length > 0 && body.type == 1){
          for( let x=0; x<body.userId.length; x++ ){
              var userDetail = await UserModel.findOne({_id:body.userId[x]}).lean()
              let notify = {
                title: body.title,
                body: body.description,
                "color": "#f95b2c",
                "sound": true
              }
              var fcm = new FCM('AAAAVcC3jGc:APA91bGyhQsCvdaFx3IdKdFjNELC-PPWvE8tN13IdlhZBTd1gsYVlQTeKd805I6PXVEiSOGGtfzW4UwZeUCCTfGG7d67V3b-STjz7bDzOGwnjyaj_0-6GvEpaKe5MugSylNPi_brKImx');
              var message = {
                  to: userDetail.device_token,
                  collapse_key: 'your_collapse_key',
                  notification: notify,
                  data: {
                      title:body.title,
                      description:body.description
                  },
              };
              // console.log( "message - ",  message)
              fcm.send(message, function (err, response) {
                  if (err) {
                      console.log(null, err);
                  } else {
                      console.log(null, response)
                  }
              });
              var dataToSave = {
                  title: body.title,
                  body: body.description,
                  user_id: body.userId[x],
                  type: body.type
              }
              var saveNotification = await NotificationModel.create( dataToSave )
              saveNotification.save()
              
          }

          return {
              status:1,
              message:'Notification sent and saved',
          }
      }
      if( body.userId.length > 0 && body.type == 2){
          for( let x=0; x<body.userId.length; x++ ){
              // var userDetail = await SellerModel.findOne({_id:body.userId[x]}).lean()
              // let notify = {
              //   title: body.title,
              //   body: body.description,
              //   "color": "#f95b2c",
              //   "sound": true
              // }
              // var fcm = new FCM('AAAAVcC3jGc:APA91bGyhQsCvdaFx3IdKdFjNELC-PPWvE8tN13IdlhZBTd1gsYVlQTeKd805I6PXVEiSOGGtfzW4UwZeUCCTfGG7d67V3b-STjz7bDzOGwnjyaj_0-6GvEpaKe5MugSylNPi_brKImx');
              // var message = {
              //     to: userDetail.device_token,
              //     collapse_key: 'your_collapse_key',
              //     notification: notify,
              //     data: {
              //         title:body.title,
              //         description:body.description
              //     },
              // };
              // // console.log( "message - ",  message)
              // fcm.send(message, function (err, response) {
              //     if (err) {
              //         console.log(null, err);
              //     } else {
              //         console.log(null, response)
              //     }
              // });

              var dataToSave = {
                title: body.title,
                body: body.description,
                user_id: body.userId[x],
                type: body.type
              }
              var saveNotification = await NotificationModel.create( dataToSave )
              saveNotification.save()
          }
          return {
              status:1,
              message:'Notification sent and saved',
          }
      }
  } catch (error) {
      return {
          status: 0,
          message:error.message
      }
  }
}

exports.getSettingData = async () => {
  try {
      let setting = await SettingModel.findOne({}, { _id: 0 }).lean()
      if (setting) {
          return {
              message : "Setting fetch successfully",
              data : setting,
          }
      } else {
        return {
            status:0,
            message:'Something went wrong'
        }
      }
  } catch (err) {
    return {
      status: 0,
      message: err.message
    }
  }
}

exports.updateSettingData = async (data) => {
  try {
    let type = parseInt(data.type);
    let setting;
    if(type == 1){
      //aboutus
      setting = await SettingModel.findOneAndUpdate({},{ $set: { about_us: data.content } },{new:true})  
    }else if(type == 2){
      // term & condition
      setting = await SettingModel.findOneAndUpdate({},{ $set: { term_condition: data.content } },{new:true})  
    }else if(type == 3){
      // privacy policy
      setting = await SettingModel.findOneAndUpdate({},{ $set: { privacy_policy: data.content } },{new:true})
    }else if(type == 4){
      // contact us
      setting = await SettingModel.findOneAndUpdate({},{ $set: { contact_us: data.content } },{new:true})
    }else if(type == 5){
      // legal
      setting = await SettingModel.findOneAndUpdate({},{ $set: { legal: data.content } },{new:true})
    }else if(type == 6){
      // help
      setting = await SettingModel.findOneAndUpdate({},{ $set: { help: data.content } },{new:true})
    }

    if (setting) {
      setting = JSON.parse(JSON.stringify(setting));

      return {
          message : "Setting updated successfully",
          data : setting,
      }
    } else {
      return {
          status:0,
          message:'Something went wrong'
      }
    }
  } catch (err) {
    return {
      status: 0,
      message: err.message
    }
  }
}

exports.addNewFaq = async (data) => {
  try {
    if (!data.question || data.question == '')
      return { status: 0, message: "Question is required" };
    if (!data.answer || data.answer == '')
      return { status: 0, message: "Answer is required" };

    let faq = await FaqModel.findOne({ question: data.question });
    if (!faq) {
      let dataToSave = {
        question: data.question,
        answer: data.answer
      }
      let faqData = new FaqModel(dataToSave);
      let savefaq = await faqData.save();
      if (!savefaq) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      return { message: "FAQ added successfully", status: 1 };
    } else {
      return { status: 0, message: "FAQ already created" };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getFaqList = async () => {
  try {

    let faqList = await FaqModel.find({}).lean(true);
    let dataToSend = {
      faqList: faqList
    }
    return { data: dataToSend,  message: "FAQ fetched successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updateFaq = async (data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "Faq id is required" };
    if (!data.question || data.question == '')
      return { status: 0, message: "Question is required" };
    if (!data.answer || data.answer == '')
      return { status: 0, message: "Answer is required" };

    let dataToUpdate = {
      question: data.question,
      answer: data.answer
    }

    let updateFaq = await FaqModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data._id) }, dataToUpdate , { new: true })
      if (!updateFaq) {
        return { status: 0, message: "Something went wrong try after sometime" };
      }
      
      return { message: "Faq updated successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteFaq = async (data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "Faq id is required" };

    let deleteFaq = await FaqModel.findOneAndRemove({ _id: mongoose.Types.ObjectId(data._id) }).lean();
      if (!deleteFaq) {
        return { status: 0, message: "Something went wrong try after sometime" };
      }
      
      return { message: "Faq deleted successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.addSubscription = async (data) => {
  try {
    if (!data.name || data.name == '')
      throw new Error("Subscription name is required");
    if (!data.description || data.description == '')
      throw new Error("Subscription description is required");
    if (!data.price || data.price == '')
      throw new Error("Subscription price is required");
    if (!data.trial_period_days || data.trial_period_days == '')
      throw new Error("Subscription trial period is required");

    let subscription = await SubscriptionModel.findOne({ name: data.name, is_active: true });
    if (!subscription) {
      let dataToSave = {
        name: data.name,
        description: data.description,
        price: data.price,
        trial_period_days: data.trial_period_days
      }
      let subscriptionData = new SubscriptionModel(dataToSave);
      let saveSubscription = await subscriptionData.save();
      if (!saveSubscription) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      return { data: saveSubscription, message: "Subscription added successfully", status: 1 };
    } else {
      return { status: 0, message: "Subscription already created" };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.editSubscription = async (data) => {
  try {
    if (!data._id || data._id == '')
      throw new Error("Subscription id is required");
    if (!data.name || data.name == '')
      throw new Error("Subscription name is required");
    if (!data.description || data.description == '')
      throw new Error("Subscription description is required");
    if (!data.price || data.price == '')
      throw new Error("Subscription price is required");
    if (!data.trial_period_days || data.trial_period_days == '')
      throw new Error("Subscription trial period is required");

    let subscriptionData = await SubscriptionModel.findOne({ _id: mongoose.Types.ObjectId(data._id) });
    if (subscriptionData) {
      let dataToUpdate = {
        name: data.name,
        description: data.description,
        price: data.price,
        trial_period_days: data.trial_period_days
      }

      let updateSubscription = await SubscriptionModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data._id) }, dataToUpdate , { new: true })
      if (!updateSubscription) {
        return { status: 0, message: "Something went wrong try after sometime" };
      }
      
      return { message: "Subscription updated successfully", status: 1 };
      
    } else {
      return { status: 0, message: "Subscription does not exist" };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.subscriptionPlanList = async (admin) => {
  try {

    let subscriptionData = await SubscriptionModel.find({ is_active: true });
    if (!subscriptionData) {
      return { status: 0, message: "Unable to fetch subscription list" };
    }
    let dataToSend = {
      subscriptionPlanList : subscriptionData
    }
    
    return { data: dataToSend, message: "Subscription list fetch successfully", status: 1 };
    
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteSubscription = async (data) => {
  try {
    if (!data._id || data._id == '')
      throw new Error("Subscription id is required");

    let subscriptionData = await SubscriptionModel.findOne({ _id: mongoose.Types.ObjectId(data._id) });
    if (subscriptionData) {
      let dataToUpdate = {
        is_active: false
      }

      let updateSubscription = await SubscriptionModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data._id) }, dataToUpdate , { new: true })
      if (!updateSubscription) {
        return { status: 0, message: "Something went wrong try after sometime" };
      }
      
      return { message: "Subscription deleted successfully", status: 1 };
      
    } else {
      return { status: 0, message: "Subscription does not exist" };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.blockSubscription = async (data) => {
  try {
    if (!data._id || data._id == '')
      throw new Error("Subscription id is required");

    let subscriptionData = await SubscriptionModel.findOne({ _id: mongoose.Types.ObjectId(data._id) });
    if (subscriptionData) {
      let dataToUpdate = {
        is_blocked: data.status
      }

      let updateSubscription = await SubscriptionModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data._id) }, dataToUpdate , { new: true })
      if (!updateSubscription) {
        return { status: 0, message: "Something went wrong try after sometime" };
      }

      let stat = data.status == "true" ? 'blocked' : 'unblocked';
      return { status: 1, message: `Subscription ${stat} successfully` };
      
    } else {
      return { status: 0, message: "Subscription does not exist" };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.addProduct = async (data) => {
  try {
    let { seller_id, product_name, product_description, product_image, product_currency,
      product_price, product_category, sub_category, sub_subcategory, offer_applicable, 
      product_expiry_date, return_replacement_applicable, maxm_replacement_days, maxm_return_days,
      product_identification, brand_name, manufacturing_company, temp_control, delivery_in_days, stock_available
     } = data;
    
    if (!seller_id || seller_id == '')
      return { status: 0, message: "Seller id is required" };
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
    // if (!offer_applicable || offer_applicable == '')
    //   return { status: 0, message: "Offer applicable is required" };
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
      seller_id: seller_id,
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
};

exports.editProduct = async (data) => {
  try {
    let { seller_id, product_name, product_description, product_image, product_currency,
      product_price, product_category, sub_category, sub_subcategory, offer_applicable, 
      product_expiry_date, return_replacement_applicable, maxm_replacement_days, maxm_return_days,
      product_identification, brand_name, manufacturing_company, temp_control, delivery_in_days, stock_available } = data;
    
    if (!data._id || data._id == '')
      return { status: 0, message: "Insufficient parameter, product id is required" };
    if (!seller_id || seller_id == '')
      return { status: 0, message: "Seller id is required" };
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
    // if (!offer_applicable || offer_applicable < 0)
    //   return { status: 0, message: "Offer applicable is required" };
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
      seller_id: seller_id,
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

exports.addTax = async (data) => {
  try {
    let { tax_percent, delivery_charge } = data;
    
    if (!tax_percent || tax_percent == '')
      return { status: 0, message: "Tax percent is required" };
    if (!delivery_charge || delivery_charge == '')
      return { status: 0, message: "Delivery charge is required" };

    let taxData = await TaxModel.findOne({});
    if(taxData){
      return {
        status: 0,
        message: "Tax already added please edit to change it"
      }
    }

    let dataToSave = {
      tax_percent,
      delivery_charge 
    }
    
    let res = new TaxModel(Object.assign({}, dataToSave));
    let saveTax = await res.save();

    if (!saveTax) {
      return {
        status: 0,
        message: "Something went wrong please try after sometime"
      }
    }

    return { status: 1, message: "Tax added successfully", data: saveTax };
    
  } catch (error) {
    throw new Error(error.message);
  }
};


exports.editTax = async (data) => {
  try {
    let { _id, tax_percent, delivery_charge } = data;
    
    if (!_id || _id == '')
      return { status: 0, message: "Insufficient parameter, tax id is required" };
    if (!tax_percent || tax_percent == '')
      return { status: 0, message: "Tax percent is required" };
    if (!delivery_charge || delivery_charge == '')
      return { status: 0, message: "Delivery charge is required" };

    let product = await TaxModel.findOne({ _id: mongoose.Types.ObjectId(data._id) });
    if(!product){
      return { status: 0, message: "Tax does not exist" };
    }
    let dataToUpdate = {
      tax_percent,
      delivery_charge 
    }

    let updateTax = await TaxModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data._id)}, dataToUpdate, { new: true } );
    if (!updateTax) {
      return { status: 0, message: "something went wrong try after sometime" };
    }

    return { status: 1, message: "Tax updated successfully", data: updateTax };
    
  } catch (error) {
    throw new Error(error.message);
  }
}


exports.getTax = async (admin) => {
  try {
    let tax = await TaxModel.findOne({}).lean();
  
    if (!tax) {
      return { status: 0, message: "Tax has not been added yet" };
    }

    let dataToSend = {
      taxData: tax
    }

    return { status: 1, message: "Tax fetch successfully", data: dataToSend };
    
  } catch (error) {
    throw new Error(error.message);
  }
}

exports.getComplaintList = async (seller) => {
  try {
    let complaints = await ComplaintModel.find({ complaint_status: 1, is_active: true }).populate('seller_id', 'full_name country_code mobile_number email').lean();
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

exports.viewComplaint = async (admin, data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "Complaint id is required" };

    let complaint = await ComplaintModel.findOne({ _id: mongoose.Types.ObjectId(data._id), is_active: true }).populate('seller_id', 'full_name country_code mobile_number email').lean();
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

exports.updateComplaintStatus = async (admin, data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "Complaint id is required" };
    if (!data.status || data.status == '')
      return { status: 0, message: "Complaint status is required" };

    let complaint = await ComplaintModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data._id) }, { complaint_status: data.status }, {new: true}).lean();
      if (!complaint) {
        return { status: 0, message: "Complaint not found" };
      }
      
      return { message: "Complaint status updated successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getNotificationList = async (admin) => {
  try {

    let notifications = await NotificationModel.find({ type: 2 }).populate('user_id', 'first_name last_name email').lean();
      if (!notifications) { 
        return { status: 0, message: "Notification not found" };
      }
      notifications = _.orderBy(notifications, item => item.created_at, ['desc']);

      let dataToSend = {
        notificationList: notifications
      }
      return { message: "Notification list fetched successfully", data: dataToSend,  status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};


exports.addBrand = async (data) => {
  try {
    if (!data.image || data.image == '')
      throw new Error("Brand image is required");
    if (!data.start_date || data.start_date == '')
      throw new Error("Start date is required");
    if (!data.end_date || data.end_date == '')
      throw new Error("End date is required");

      let dataToSave = {
        image: data.image,
        start_date: data.start_date,
        end_date: data.end_date
      }
      let brandData = new BrandModel(dataToSave);
      let saveBrand = await brandData.save();
      if (!saveBrand) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      return { data: saveBrand, message: "Brand added successfully", status: 1 };
  
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.editBrand = async (data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "Insufficient parameter, brand id is required" };
    if (!data.image || data.image == '')
      throw new Error("Brand image is required");
    if (!data.start_date || data.start_date == '')
      throw new Error("Start date is required");
    if (!data.end_date || data.end_date == '')
      throw new Error("End date is required");

    let brand = await BrandModel.findOne({ _id: mongoose.Types.ObjectId(data._id), is_active: true });
    if(!brand){
      return { status: 0, message: "Brand does not exist" };
    }
    let dataToUpdate = {
      image: data.image,
      start_date: data.start_date,
      end_date: data.end_date
    }

    let updateBrand = await BrandModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data._id)}, dataToUpdate, { new: true } );
    if (!updateBrand) {
      return { status: 0, message: "something went wrong try after sometime" };
    }

    return { status: 1, message: "Brand updated successfully", data: updateBrand };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getAllBrands = async (admin) => {
  try {
    if (!admin._id || admin._id == '')
      return { status: 0, message: "please login first to get brand list" };

    let allBrands = await BrandModel.find({ is_active: true }).exec();
      if (!allBrands) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      
      return { data: allBrands, message: "All brands fetch successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteBrand = async (data) => {
  try {
    if (!data._id || data._id == '')
      return { status: 0, message: "Brand id is required" };

    let brand = await BrandModel.findOneAndUpdate({ _id: data._id }, { $set: { is_active: false } }, { new: true })
      if (!brand) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      
      return { message: "Brand deleted successfully", status: 1 };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getDashboardData = async (data) => {
  try {
    if (!data.start_date || data.start_date == '')
      return { status: 0, message: "Start date is required" };
    if (!data.end_date || data.end_date == '')
      return { status: 0, message: "End date is required" };

    let totalUsersInHospital = await UserModel.countDocuments({ is_active: true, user_type: 1, $and: [{ date_joined: {'$gte': data.start_date}}, { date_joined: {'$lte':  data.end_date }}] }).lean();
    let totalUsersInClinic = await UserModel.countDocuments({ is_active: true, user_type: 4, $and: [{ date_joined: {'$gte': data.start_date}}, { date_joined: {'$lte':  data.end_date }}] }).lean();
    let totalDentistUsers = await UserModel.countDocuments({ is_active: true, user_type: 5, $and: [{ date_joined: {'$gte': data.start_date}}, { date_joined: {'$lte':  data.end_date }}] }).lean();
    let totalSellers = await SellerModel.countDocuments({ is_active: true, $and: [{ date_joined: {'$gte': data.start_date}}, { date_joined: {'$lte':  data.end_date }}] }).lean();
    let totalOrders = await OrderModel.countDocuments({ status: {'$gte': 1 }, $and: [{ created_at: {'$gte': data.start_date}}, { created_at: {'$lte':  data.end_date }}] }).lean();
    let totalOngoingOrders = await OrderModel.countDocuments({ $and: [{ status: {'$gte': 1 }}, { status: {'$lte': 6 }}, { created_at: {'$gte': data.start_date}}, { created_at: {'$lte':  data.end_date }}] }).lean();

    let dataToSend = {
      totalUsersInHospital: totalUsersInHospital,
      totalUsersInClinic: totalUsersInClinic,
      totalDentistUsers: totalDentistUsers,
      totalSellers: totalSellers,
      totalOrders: totalOrders,
      totalOngoingOrders: totalOngoingOrders
    }
    
      return { message: "Dashboard data fetched successfully", status: 1, data: dataToSend };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.dashboardOrderData = async (admin) => {
  try {
    let totalCompeletedOrders = await OrderModel.countDocuments({ status: 7 }).lean();
    let totalCancelledOrders = await OrderModel.countDocuments({ status: 8 }).lean();
    let totalOngoingOrders = await OrderModel.countDocuments({ $and: [{ status: {'$gte': 1 }}, { status: {'$lte': 6 }}] }).lean();
    let totalActiveUsers = await UserModel.countDocuments({ is_active: true }).lean();
    let totalActiveSellers = await SellerModel.countDocuments({ is_active: true }).lean();
    let purchasedSubscriptions = await PurchasedSubscriptionModel.find({ is_currently_active: true }, { _id: 1, amount: 1 }).lean();
    let totalPurchasedSubscriptionsRevenue = _.sum(_.map(purchasedSubscriptions, (doc) => doc.amount ));
    let orderRevenue = await OrderBookingModel.find({ status:  1 }, { total_amount: 1 }).lean();
    let totalOrderRevenue = _.sum(_.map(orderRevenue, (doc) => doc.total_amount ));
    
    let dataToSend = {
      totalCompeletedOrders: totalCompeletedOrders,
      totalCancelledOrders: totalCancelledOrders,
      totalOngoingOrders: totalOngoingOrders,
      totalActiveUsers: totalActiveUsers,
      totalActiveSellers: totalActiveSellers,
      totalPurchasedSubscriptionsRevenue: (totalPurchasedSubscriptionsRevenue.toFixed(2)),
      totalOrderRevenue: (totalOrderRevenue.toFixed(2))
    }
    
      return { message: "Dashboard data fetched successfully", status: 1, data: dataToSend };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updateProfile = async (admin, data) => {
  try {
    if (!data.email || data.email == '')
      return { status: 0, message: "Email is required" };
    if (!data.full_name || data.full_name == '')
      return { status: 0, message: "Full name is required" };
    if (!data.mobile_no || data.mobile_no == '')
      return { status: 0, message: "Mobile number is required" };

    let dataToUpdate = {
      email: data.email,
      full_name: data.full_name,
      profile_image: data.profile_image,
      about: data.about,
      address: data.address,
      mobile_no: data.mobile_no
    }

    let profile = await AdminModel.findOneAndUpdate({ _id: admin._id }, { $set: dataToUpdate }, { new: true })
      if (!profile) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      
      return { message: "Profile updated successfully", status: 1, data: profile };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getProfileData = async (admin) => {
  try {

    let profile = await AdminModel.findOne({ _id: admin._id }).lean();
      if (!profile) {
        return { status: 0, message: "something went wrong try after sometime" };
      }
      let dataToSend = {
        profile: profile
      }
      return { message: "Profile data fetched successfully", status: 1, data: dataToSend };
   
  } catch (err) {
    throw new Error(err.message);
  }
};

