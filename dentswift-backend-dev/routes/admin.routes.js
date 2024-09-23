const adminController = require('../controller/admin.controller');
const express = require("express");
const app = express();
const route = express.Router();

const authentication = require("../middlewares/authentication");
const s3bucket = require("../modules/aws-s3");

//m2
route.post("/login", adminController.adminLogin);
route.post('/forgot_password', adminController.forgetPassword);
route.post('/reset_password', authentication.verifyAdminToken, adminController.resetPassword);
route.post('/changePassword', adminController.changePassword);
route.get('/logout', authentication.verifyAdminToken, adminController.logout);

//m3
route.get('/get_all_users', authentication.verifyAdminToken, adminController.getAllUsers);
route.get('/get_all_sellers', authentication.verifyAdminToken, adminController.getAllSellers);
route.post('/block_user', authentication.verifyAdminToken, adminController.blockUser);
// route.post('/delete_user', authentication.verifyAdminToken, adminController.deleteUser);
route.post('/block_seller', authentication.verifyAdminToken, adminController.blockSeller);
// route.post('/delete_seller', authentication.verifyAdminToken, adminController.deleteSeller);
route.post('/view_seller', authentication.verifyAdminToken, adminController.viewSeller);
route.post('/update_seller_status', authentication.verifyAdminToken, adminController.updateSellerStatus);

//m4
route.post("/upload_file", authentication.verifyAdminToken, s3bucket.uploadAdminFile, adminController.uploadAdminFile);
route.post('/add_category', authentication.verifyAdminToken, adminController.addCategory);
route.get('/get_category', authentication.verifyAdminToken, adminController.getCategory);
route.post('/edit_category', authentication.verifyAdminToken, adminController.editCategory);
route.post('/delete_category', authentication.verifyAdminToken, adminController.deleteCategory);
route.post('/get_category_byid', authentication.verifyAdminToken, adminController.getCategoryById);

route.post('/add_subcategory', authentication.verifyAdminToken, adminController.addSubCategory);
route.get('/get_subcategory', authentication.verifyAdminToken, adminController.getSubCategory);
route.post('/edit_subcategory', authentication.verifyAdminToken, adminController.editSubCategory);
route.post('/delete_subcategory', authentication.verifyAdminToken, adminController.deleteSubCategory);
route.post('/get_subcategory_byid', authentication.verifyAdminToken, adminController.getSubCategoryById);

route.post('/add_sub_subcategory', authentication.verifyAdminToken, adminController.addSubSubCategory);
route.get('/get_sub_subcategory', authentication.verifyAdminToken, adminController.getSubSubCategory);
route.post('/edit_sub_subcategory', authentication.verifyAdminToken, adminController.editSubSubCategory);
route.post('/delete_sub_subcategory', authentication.verifyAdminToken, adminController.deleteSubSubCategory);
route.post('/get_sub_subcategory_byid', authentication.verifyAdminToken, adminController.getSubSubCategoryById);

//M5
route.post('/add_coupon', authentication.verifyAdminToken, adminController.addCoupon);
route.post('/edit_coupon', authentication.verifyAdminToken, adminController.editCoupon);
route.get('/get_all_coupons', authentication.verifyAdminToken, adminController.getCoupons);
route.post('/delete_coupon', authentication.verifyAdminToken, adminController.deleteCoupon);
route.post('/view_coupon', authentication.verifyAdminToken, adminController.viewCoupon);

//M6
route.get('/get_all_products', authentication.verifyAdminToken, adminController.getAllProducts);
route.post("/view_product", authentication.verifyAdminToken, adminController.viewProduct);
route.post("/delete_product", authentication.verifyAdminToken, adminController.deleteProduct);
route.post("/edit_product", authentication.verifyAdminToken, adminController.editProduct);
route.post("/block_product", authentication.verifyAdminToken, adminController.blockProduct);

//M7
route.post("/add_advertisement", authentication.verifyAdminToken, adminController.addAdvertisement);
route.post("/edit_advertisement", authentication.verifyAdminToken, adminController.editAdvertisement);
route.get("/get_all_advertisements", authentication.verifyAdminToken, adminController.getAllAdvertisements);
route.post("/delete_advertisement", authentication.verifyAdminToken, adminController.deleteAdvertisement);

//M10
route.get("/ongoing_order_list", authentication.verifyAdminToken, adminController.ongoingOrderList);
route.get("/completed_order_list", authentication.verifyAdminToken, adminController.completedOrderList);
route.get("/cancelled_order_list", authentication.verifyAdminToken, adminController.cancelledOrderList);
route.post("/ongoing_order_details", authentication.verifyAdminToken, adminController.ongoingOrderDetails);
route.post("/completed_order_details", authentication.verifyAdminToken, adminController.completedOrderDetails);
route.post("/cancelled_order_details", authentication.verifyAdminToken, adminController.cancelledOrderDetails);

route.get("/order_booking_list", authentication.verifyAdminToken, adminController.orderBookingList);
route.post("/order_booking_details", authentication.verifyAdminToken, adminController.orderBookingDetails);
route.get("/order_commission_list", authentication.verifyAdminToken, adminController.orderCommissionList);

route.get("/ongoing_orders_report", authentication.verifyAdminToken, adminController.getOngoingOrdersReport);
route.get("/completed_orders_report", authentication.verifyAdminToken, adminController.getCompletedOrdersReport);
route.get("/cancelled_orders_report", authentication.verifyAdminToken, adminController.getCancelledOrdersReport);
route.get("/seller_commission_report", authentication.verifyAdminToken, adminController.getSellerCommissionReport);
route.get("/get_user_report", authentication.verifyAdminToken, adminController.getUserReport);
route.get("/today_completed_orders", authentication.verifyAdminToken, adminController.getTodayCompletedOrdersReport);
route.get("/month_completed_orders", authentication.verifyAdminToken, adminController.getMonthCompletedOrdersReport);
route.get("/quarter_completed_orders", authentication.verifyAdminToken, adminController.getQuarterCompletedOrdersReport);
route.get("/year_completed_orders", authentication.verifyAdminToken, adminController.getYearCompletedOrdersReport);
route.get("/finance_report", authentication.verifyAdminToken, adminController.getFinanceReport);
route.get("/seller_order_report", authentication.verifyAdminToken, adminController.getSellerOrderReport);
route.get("/user_order_report", authentication.verifyAdminToken, adminController.getUserOrderReport);


//M12
route.post("/send_notification", authentication.verifyAdminToken, adminController.sendNotification);
route.get("/get_setting_data", authentication.verifyAdminToken, adminController.getSettingData);
route.post("/update_setting_data", authentication.verifyAdminToken, adminController.updateSettingData);
route.post("/add_faq", authentication.verifyAdminToken, adminController.addNewFaq);
route.get("/get_faq_list", authentication.verifyAdminToken, adminController.getFaqList);
route.post("/update_faq", authentication.verifyAdminToken, adminController.updateFaq);
route.post("/delete_faq", authentication.verifyAdminToken, adminController.deleteFaq);

//UAT
route.post("/add_subscription", authentication.verifyAdminToken, adminController.addSubscription);
route.post("/edit_subscription", authentication.verifyAdminToken, adminController.editSubscription);
route.get("/subscription_plan_list", authentication.verifyAdminToken, adminController.subscriptionPlanList);
route.post("/delete_subscription", authentication.verifyAdminToken, adminController.deleteSubscription);
route.post("/block_subscription", authentication.verifyAdminToken, adminController.blockSubscription);
route.post("/add_product", authentication.verifyAdminToken, adminController.addProduct);
route.post("/edit_product", authentication.verifyAdminToken, adminController.editProduct);
route.post("/add_tax", authentication.verifyAdminToken, adminController.addTax);
route.post("/edit_tax", authentication.verifyAdminToken, adminController.editTax);
route.get("/get_tax", authentication.verifyAdminToken, adminController.getTax);
route.get("/get_complaint_list", authentication.verifyAdminToken, adminController.getComplaintList);
route.post("/view_complaint", authentication.verifyAdminToken, adminController.viewComplaint);
route.post("/update_complaint_status", authentication.verifyAdminToken, adminController.updateComplaintStatus);
route.get("/notification_list", authentication.verifyAdminToken, adminController.getNotificationList);

route.post("/add_brand", authentication.verifyAdminToken, adminController.addBrand);
route.post("/edit_brand", authentication.verifyAdminToken, adminController.editBrand);
route.get("/get_all_brands", authentication.verifyAdminToken, adminController.getAllBrands);
route.post("/delete_brand", authentication.verifyAdminToken, adminController.deleteBrand);

//Dashboard
route.post("/get_dashboard_data", authentication.verifyAdminToken, adminController.getDashboardData);
route.get("/dashboard_order_data", authentication.verifyAdminToken, adminController.dashboardOrderData);
route.post("/update_profile", authentication.verifyAdminToken, adminController.updateProfile);
route.get("/get_profile_data", authentication.verifyAdminToken, adminController.getProfileData);

module.exports = route;