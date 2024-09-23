const sellerController = require('../controller/seller.controller');
const express = require("express");
const app = express();
const route = express.Router();

const authentication = require("../middlewares/authentication");
const s3bucket = require("../modules/aws-s3");

//M3
route.post("/sign_up", sellerController.signupSeller);
route.post("/forgot_password", sellerController.forgotPassword);
route.post('/reset_password', authentication.verifySellerToken, sellerController.resetPassword);
route.post("/login", sellerController.loginSeller);
route.post("/resend_otp", authentication.verifySellerToken, sellerController.resendOtp);
route.post("/verify_otp", authentication.verifySellerToken, sellerController.verifyOtp);
// route.post("/profile_details", authentication.verifySellerToken, s3bucket.uploadProfileImages, sellerController.profileDetails);
route.post("/profile_details", authentication.verifySellerToken, sellerController.profileDetails);
route.post("/upload_file", authentication.verifySellerToken, s3bucket.uploadFile, sellerController.uploadFile);
route.get("/get_countries", sellerController.sendCountries);
route.post("/get_cities", sellerController.sendCities);

route.post("/get_seller_data", authentication.verifySellerToken, sellerController.getSellerData);
route.get("/send_email_verification", authentication.verifySellerToken, sellerController.sendEmailVerification);
route.get('/logout', authentication.verifySellerToken, sellerController.logout);

//M6
route.post("/add_product", authentication.verifySellerToken, sellerController.addProduct);
route.post("/edit_product", authentication.verifySellerToken, sellerController.editProduct);
route.get("/get_all_products", authentication.verifySellerToken, sellerController.getAllProducts);
route.post("/delete_product", authentication.verifySellerToken, sellerController.deleteProduct);
route.post("/view_product", authentication.verifySellerToken, sellerController.viewProduct);
route.post("/block_product", authentication.verifySellerToken, sellerController.blockProduct);
route.post("/search_product", authentication.verifySellerToken, sellerController.searchProduct);
route.post("/sort_products", authentication.verifySellerToken, sellerController.sortProducts);
route.get("/get_category_list", authentication.verifySellerToken,  sellerController.getCategoryList);
route.post("/get_subcategory_list", authentication.verifySellerToken,  sellerController.getSubCategoryList);
route.post("/get_sub_subcategory_list", authentication.verifySellerToken,  sellerController.getSubSubCategoryList);

//M8
route.post("/add_inventory", authentication.verifySellerToken,  sellerController.addInventory);
route.post("/edit_inventory", authentication.verifySellerToken,  sellerController.editInventory);
route.post("/inventory_details", authentication.verifySellerToken,  sellerController.getInventoryDetails);
route.get("/get_inventory_list", authentication.verifySellerToken,  sellerController.getInventoryList);
route.post("/delete_inventory", authentication.verifySellerToken,  sellerController.deleteInventory);
route.post("/change_stock_quantity", authentication.verifySellerToken,  sellerController.changeStockQuantity);
route.post("/search_stock", authentication.verifySellerToken,  sellerController.searchStock);
route.post("/sort_stock_list", authentication.verifySellerToken,  sellerController.sortStockList);

route.get("/new_order_list", authentication.verifySellerToken,  sellerController.getNewOrderList);
route.post("/get_order_details", authentication.verifySellerToken,  sellerController.getOrderDetails);
route.post("/cancel_order", authentication.verifySellerToken,  sellerController.cancelOrder);
route.post("/update_order_status", authentication.verifySellerToken,  sellerController.updateOrderStatus);
route.get("/ongoing_order_list", authentication.verifySellerToken,  sellerController.getOngoingOrderList);
route.get("/past_order_list", authentication.verifySellerToken,  sellerController.pastOrderList);

//M9
route.get("/get_seller_details", authentication.verifySellerToken,  sellerController.getSellerDetails);
route.get("/get_payment_details", authentication.verifySellerToken,  sellerController.getPaymentDetails);
route.get("/payment_cancel_details", authentication.verifySellerToken,  sellerController.getPaymentCancelDetails);

//M10
route.get("/ongoing_order_report", authentication.verifySellerToken,  sellerController.getOngoingReports);
route.get("/completed_order_report", authentication.verifySellerToken,  sellerController.getCompletedOrdersReports);
route.get("/cancelled_order_report", authentication.verifySellerToken,  sellerController.getCancelledOrdersReports);
route.get("/commission_details_report", authentication.verifySellerToken,  sellerController.getCommissionDetailsReports);
route.post("/dashboard_report", authentication.verifySellerToken,  sellerController.getDashboardReports);
route.get("/dashboard_chart_report", authentication.verifySellerToken,  sellerController.getDashboardChartReports);
route.get("/get_admin_details", authentication.verifySellerToken,  sellerController.getAdminDetails);

//M12
route.post("/update_mobile_no", authentication.verifySellerToken,  sellerController.updateMobileNumber);
route.post("/update_email", authentication.verifySellerToken,  sellerController.updateEmail);
route.post("/update_store_details", authentication.verifySellerToken,  sellerController.updateStoreDetails);
route.get("/get_bank_details", authentication.verifySellerToken,  sellerController.getBankDetails);
route.post("/update_bank_details", authentication.verifySellerToken,  sellerController.updateBankDetails);

//UAT
route.post('/purchase_subscription', authentication.verifySellerToken, sellerController.purchaseSubscription)
route.get("/financial_report", authentication.verifySellerToken,  sellerController.getFinancialReport);
route.get("/payment_report", authentication.verifySellerToken,  sellerController.getPaymentReport);
route.get("/get_plan_list", authentication.verifySellerToken,  sellerController.getPlanList);
route.get("/active_plan_details", authentication.verifySellerToken,  sellerController.activePlanDetails);
route.get("/term_condition",  sellerController.getTermCondition);
route.get("/about_us",  sellerController.getAboutUsPage);
route.get("/contact_us",  sellerController.getContactUsPage);
route.get("/legal_page",  sellerController.getLegalPage);
route.get("/help_page",  sellerController.getHelpPage);
route.get("/privacy_policy",  sellerController.getPrivacyPolicy);
route.get("/get_faq_list",  sellerController.getFaqList);
route.post("/update_business_details", authentication.verifySellerToken,  sellerController.updateBusinessDetails);
route.get("/get_business_details", authentication.verifySellerToken,  sellerController.getBusinessDetails);
route.post("/raise_new_issue", authentication.verifySellerToken,  sellerController.raiseNewIssue);
route.post("/view_issue", authentication.verifySellerToken,  sellerController.viewIssue);
route.get("/get_complaint_list", authentication.verifySellerToken,  sellerController.getComplaintList);
route.get("/get_store_details", authentication.verifySellerToken,  sellerController.getStoreDetails);
route.get("/notification_list", authentication.verifySellerToken,  sellerController.getNotificationList);
route.get("/subscription_notification", authentication.verifySellerToken,  sellerController.subscriptionNotification);

module.exports = route;