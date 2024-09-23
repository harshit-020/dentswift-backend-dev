const userController = require('../controller/user.controller');
const express = require("express");
const app = express();
const route = express.Router();

const authentication = require("../middlewares/authentication");
const s3bucket = require("../modules/aws-s3");

//M2 & M3
route.post("/sign_up", userController.registerUser);
route.post("/forgot_password", userController.forgotPassword);
route.post('/reset_password', authentication.verifyUserToken, userController.resetPassword);
route.post("/verify_otp", authentication.verifyUserToken, userController.verifyOtp);
route.post("/resend_otp", authentication.verifyUserToken, userController.resendOtp);
route.post("/upload_image", authentication.verifyUserToken, s3bucket.uploadImage, userController.uploadImage);
route.post("/login", userController.loginUser);
route.post("/basic_details", authentication.verifyUserToken,  userController.updateBasicDetails);
route.post("/add_user_details", authentication.verifyUserToken,  userController.addUserDetails);
route.post("/add_shipping_details", authentication.verifyUserToken, userController.addShippingDetails);
route.post("/login_with_social_account", userController.loginWithSocialAccount);

//M5
route.get("/get_category_list", authentication.verifyUserToken,  userController.getCategoryList);
route.post("/get_subcategory_list", authentication.verifyUserToken,  userController.getSubCategoryList);
route.post("/get_sub_subcategory_list", authentication.verifyUserToken,  userController.getSubSubCategoryList);
route.get("/get_coupon_list", authentication.verifyUserToken,  userController.getCouponList);
route.get("/get_brand_list", authentication.verifyUserToken,  userController.getBrandList);
route.post("/search_sub_category", authentication.verifyUserToken,  userController.searchSubCategory);
route.post("/search_sub_subcategory", authentication.verifyUserToken,  userController.searchSubSubCategory);

//M7
route.post("/get_product_list", authentication.verifyUserToken,  userController.getProductList);
route.post("/add_product_rating", authentication.verifyUserToken,  userController.addProductRating);
route.post("/get_product_details", authentication.verifyUserToken,  userController.getProductDetails);
route.get("/favourite_product_list", authentication.verifyUserToken,  userController.getFavoriteProductList);
route.post("/change_favourite_status", authentication.verifyUserToken,  userController.changeFavoriteStatus);
route.post("/search_product_list", authentication.verifyUserToken,  userController.searchProductList);
route.post("/search_favourite_products", authentication.verifyUserToken,  userController.searchFavouriteProducts);
route.get("/get_all_advertisements", authentication.verifyUserToken,  userController.getAllAdvertisemt);

//M8
route.post("/add_to_cart", authentication.verifyUserToken,  userController.addProductToCart);
route.post("/show_cart", authentication.verifyUserToken,  userController.showCartProducts);
route.post("/change_quantity", authentication.verifyUserToken,  userController.changeProductQuantity);
route.post("/remove_from_cart", authentication.verifyUserToken,  userController.removeProductFromCart);
route.post("/move_to_wishlist", authentication.verifyUserToken,  userController.moveProductToWishlist);
route.post("/add_address", authentication.verifyUserToken,  userController.addAddress);
route.post("/edit_address", authentication.verifyUserToken,  userController.editAddress);
route.post("/delete_address", authentication.verifyUserToken,  userController.deleteAddress);
route.get("/get_address_list", authentication.verifyUserToken,  userController.getAllAddressList);
route.get("/get_countries", userController.sendCountries);
route.post("/get_states", userController.sendStateList);
route.post("/get_cities", userController.sendCityList);
route.post("/buy_now", authentication.verifyUserToken,  userController.buyProduct);
route.post("/set_default_address", authentication.verifyUserToken,  userController.setDefaultAddress);
route.post("/place_order", authentication.verifyUserToken,  userController.placeProductsOrder);
route.post("/apply_coupon", authentication.verifyUserToken,  userController.applyCoupon);
route.post("/confirm_cheque_transaction", authentication.verifyUserToken,  userController.confirmChequeTransaction);
route.get("/create_token", authentication.verifyUserToken,  userController.createToken);
route.post("/add_user_card", authentication.verifyUserToken,  userController.addUserCard);
route.get("/get_card_list", authentication.verifyUserToken,  userController.getCardList);
route.post("/delete_card", authentication.verifyUserToken,  userController.deleteCard);
route.post("/make_stripe_payment", authentication.verifyUserToken,  userController.makeStripePayment);
route.post("/get_order_summary", authentication.verifyUserToken,  userController.getOrderSummary);

//M9
route.get("/ongoing_order_list", authentication.verifyUserToken,  userController.ongoingOrderList);
route.get("/past_order_list", authentication.verifyUserToken,  userController.pastOrderList);
route.post("/track_order", authentication.verifyUserToken,  userController.trackOrder);
route.post("/get_order_details", authentication.verifyUserToken,  userController.getOrderDetails);
route.post("/get_order_rating", authentication.verifyUserToken,  userController.getOrderRating);

//M12
/* For template section */
// route.post("/get_templates", authentication.verifyUserToken, userController.getTemplates);
route.get("/get_profile_details", authentication.verifyUserToken, userController.getProfileDetails);
route.post("/update_profile_details", authentication.verifyUserToken, userController.updateProfileDetails);
route.post("/change_password", authentication.verifyUserToken, userController.changePassword);
route.get("/logout", authentication.verifyUserToken, userController.logoutUser);
route.get("/term_condition",  userController.getTermCondition);
route.get("/about_us",  userController.getAboutUsPage);
route.get("/contact_us",  userController.getContactUsPage);
route.get("/legal_page",  userController.getLegalPage);
route.get("/help_page",  userController.getHelpPage);
route.get("/privacy_policy",  userController.getPrivacyPolicy);
route.get("/get_faq_list",  userController.getFaqList);

//UAT
route.get("/popular_products_list", authentication.verifyUserToken,  userController.getMostPurchashedProducts);
route.get("/notification_list", authentication.verifyUserToken,  userController.getNotificationList);
route.post("/update_app_version", authentication.verifyUserToken,  userController.updateAppVersion);

module.exports = route;