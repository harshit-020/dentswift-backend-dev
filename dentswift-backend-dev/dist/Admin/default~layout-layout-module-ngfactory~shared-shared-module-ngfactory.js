(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~layout-layout-module-ngfactory~shared-shared-module-ngfactory"],{

/***/ "./src/app/service/authentication.service.ts":
/*!***************************************************!*\
  !*** ./src/app/service/authentication.service.ts ***!
  \***************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");




var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(router, http) {
        this.router = router;
        this.http = http;
    }
    AuthenticationService.prototype.toaster = function (arg0, arg1, arg2) {
        throw new Error("Method not implemented.");
    };
    AuthenticationService.prototype.isLogin = function () {
        var token;
        var remembered = localStorage.getItem("rememberMe");
        if (remembered == undefined) {
            token = sessionStorage.getItem("naija_admin");
        }
        else {
            token = localStorage.getItem("naija_admin");
        }
        if (token)
            return true;
        else
            false;
    };
    AuthenticationService.prototype.upload_file = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/upload_file", data);
    };
    AuthenticationService.prototype.login = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/login", data);
    };
    AuthenticationService.prototype.get_category = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/get_category");
    };
    // upload_image(data){
    //     return this.http.post(environment.sellerUrl+`upload_image`,data);
    // }
    AuthenticationService.prototype.add_category = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/add_category", data);
    };
    AuthenticationService.prototype.update_category = function (data, id) {
        return this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/category_manage/api/category/" + id, data);
    };
    AuthenticationService.prototype.delete_category = function (id) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/delete_category", {
            _id: id,
        });
    };
    AuthenticationService.prototype.edit_category = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/edit_category", data);
    };
    // ::::::::::::::::::::::::::::::::::::: BRAND Management ::::::::::::::::::::::::::::::::::::::::::::::: //
    AuthenticationService.prototype.brandList = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/category_manage/api/brand");
    };
    AuthenticationService.prototype.addbrand = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/category_manage/api/brand", data);
    };
    AuthenticationService.prototype.editBarnd = function (data, id) {
        return this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/category_manage/api/brand/" + id, data);
    };
    AuthenticationService.prototype.delete_brand = function (id) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/delete_brand", { _id: id });
    };
    // ::::::::::::::::::::::::::::::::::::: SUB Category ::::::::::::::::::::::::::::::::::::::::::::::: //
    AuthenticationService.prototype.get_sub_category = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/get_subcategory");
    };
    AuthenticationService.prototype.add_sub_category = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/add_subcategory", data);
    };
    AuthenticationService.prototype.edit_sub_category = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/edit_subcategory", data);
    };
    AuthenticationService.prototype.delete_sub_category = function (id) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/delete_subcategory", {
            _id: id,
        });
    };
    AuthenticationService.prototype.forgot = function (email_id) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/forgot_password", {
            email_id: email_id,
        });
    };
    AuthenticationService.prototype.verify = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "forgotpass_otp_verify_email", data);
    };
    AuthenticationService.prototype.reset = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/reset_password", data);
    };
    AuthenticationService.prototype.changePassword = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/changePassword", data);
    };
    AuthenticationService.prototype.profile = function (data) {
        // debugger;
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "profile", data);
    };
    // ::::::::::::::::::::::::::::::::::::: SUB-SUBCATEGORY Mgmt ::::::::::::::::::::::::::::::::::::::::::::::: //
    AuthenticationService.prototype.get_sub_subcategory = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/get_sub_subcategory");
    };
    AuthenticationService.prototype.get_subcategory_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/get_subcategory");
    };
    AuthenticationService.prototype.uploadFile = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/upload_file", data);
    };
    AuthenticationService.prototype.addSubSubCategory = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/add_sub_subcategory", data);
    };
    AuthenticationService.prototype.get_subsubcategory_data = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/get_sub_subcategory_byid", data);
    };
    AuthenticationService.prototype.editSubSubCategory = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/edit_sub_subcategory", data);
    };
    AuthenticationService.prototype.deleteSubSubCategory = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/delete_sub_subcategory", data);
    };
    // ::::::::::::::::::::::::::::::::::::: USER Mgmt ::::::::::::::::::::::::::::::::::::::::::::::: //
    AuthenticationService.prototype.getAllUsers = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/get_all_users");
    };
    AuthenticationService.prototype.block_user = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/block_user", data);
    };
    AuthenticationService.prototype.delete_user = function (id) {
        return this.http.delete(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + ("/accounts/api/user_manage/" + id));
    };
    // ::::::::::::::::::::::::::::::::::::: Seller mgmt ::::::::::::::::::::::::::::::::::::::::::::::: //
    AuthenticationService.prototype.getAllSellers = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/get_all_sellers");
    };
    AuthenticationService.prototype.block_seller = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/block_seller", data);
    };
    AuthenticationService.prototype.addquestionary = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/questionnaire_manage/api/create_question", data);
    };
    AuthenticationService.prototype.deletequestionnaire = function (id) {
        return this.http.delete(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/questionnaire_manage/api/question/" + id);
    };
    AuthenticationService.prototype.deletechoice = function (id) {
        return this.http.delete(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/questionnaire_manage/api/choice/" + id);
    };
    AuthenticationService.prototype.getquestionary = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/questionnaire_manage/api/question_list");
    };
    AuthenticationService.prototype.get_questions_list = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/questionnaire_manage/api/get_questions_list", data);
    };
    AuthenticationService.prototype.get_questionary_filter_list = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/questionnaire_manage/api/question_filter_list", data);
    };
    AuthenticationService.prototype.updatequestionary = function (id, data) {
        return this.http.put(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/questionnaire_manage/api/question/" + id, data);
    };
    AuthenticationService.prototype.updatequestions = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/questionnaire_manage/api/update_questions", data);
    };
    AuthenticationService.prototype.deletequestionary = function (id) {
        return this.http.delete(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/questionnaire_manage/api/question/" + id);
    };
    // ==========================
    AuthenticationService.prototype.deal_closed_by_admin = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/product_manage/api/deal_closed_by_admin", data);
    };
    // country(){
    //     return this.http.get(environment.userUrl+`getCountryList`);
    // }
    // state(data){
    //     return this.http.post(environment.userUrl+`getStateList`,data);
    // }
    // city(data){
    //     return this.http.post(environment.sellerUrl +`getCityList`,data);
    // }
    // sign_up(data){
    //     return this.http.post(environment.sellerUrl+`sign_up`,data);
    // }
    // sign_up_web(data){
    //     return this.http.post(environment.sellerUrl+`sign_up_web`,data);
    // }
    AuthenticationService.prototype.get_member_ship = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "get_member_ship");
    };
    AuthenticationService.prototype.add_member_ship = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "add_member_ship", data);
    };
    AuthenticationService.prototype.update_member_ship = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "update_member_ship", data);
    };
    AuthenticationService.prototype.delete_member_ship = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "delete_member_ship", data);
    };
    AuthenticationService.prototype.block_member_ship = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "block_member_ship", data);
    };
    AuthenticationService.prototype.get_subscription = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/subscription_plan_list");
    };
    AuthenticationService.prototype.add_subscription = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "add_subscription", data);
    };
    AuthenticationService.prototype.update_subscription = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "update_subscription", data);
    };
    // delete_subscription(data) {
    //   return this.http.post(environment.baseUrl + `delete_subscription`, data);
    // }
    AuthenticationService.prototype.block_subscription = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "block_subscription", data);
    };
    AuthenticationService.prototype.get_promotion = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "get_promotion");
    };
    AuthenticationService.prototype.add_promotion = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "add_promotion", data);
    };
    AuthenticationService.prototype.update_promotion = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "update_promotion", data);
    };
    AuthenticationService.prototype.delete_promotion = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "delete_promotion", data);
    };
    AuthenticationService.prototype.block_promotion = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "block_promotion", data);
    };
    AuthenticationService.prototype.purchased_membership = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "purchased_membership");
    };
    AuthenticationService.prototype.brand_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/get_all_brands");
    };
    //::::::::::::::::::::::::::::::::::::: Advertisement Mgmt :::::::::::::::::::::::::::::::::::::::::::::::
    AuthenticationService.prototype.advertisement_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/get_all_advertisements");
    };
    AuthenticationService.prototype.block_advertisement = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "block_advertisement", data);
    };
    AuthenticationService.prototype.delete_advertisement = function (id) {
        console.log(id);
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/delete_advertisement", { _id: id,
        });
    };
    AuthenticationService.prototype.add_advertisement = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/add_advertisement", data);
    };
    AuthenticationService.prototype.edit_advertisement = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/edit_advertisement", data);
    };
    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    AuthenticationService.prototype.rating_review = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "rating_review");
    };
    //Category listing
    AuthenticationService.prototype.logout = function () {
        // sessionStorage.removeItem("naija_admin");
        // // localStorage.removeItem('rememberMe');
        // this.router.navigateByUrl("login");
        // return true;
        localStorage.removeItem('access_token');
        localStorage.removeItem('currentUser');
        var routerLink = "/login";
        this.router.navigateByUrl(routerLink);
        return true;
    };
    // ::::::::::::::::::::::::::::::::::::: PRODUCT List ::::::::::::::::::::::::::::::::::::::::::::::: //
    // productlist_request(type){
    //     return this.http.get(environment.baseUrl+`/product_manage/api/product_list_request/`+type);
    // }
    AuthenticationService.prototype.get_product_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/get_all_products");
    };
    AuthenticationService.prototype.productlist_admin = function (type) {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/product_manage/api/product_list_admin/" + type);
    };
    AuthenticationService.prototype.productlist_filter = function (type, data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/product_manage/api/product_list_admin/" + type, data);
    };
    AuthenticationService.prototype.block_product = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/block_product", data);
    };
    // block_product(id, data) {
    //   console.log(id, data);
    //   return this.http.put(
    //     environment.baseUrl + `/product_manage/api/product/${id}`,
    //     data
    //   );
    // }
    AuthenticationService.prototype.deleteproduct = function (id) {
        // console.log(id);
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/delete_product", {
            _id: id,
        });
    };
    AuthenticationService.prototype.productlist_request = function (id) {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + ("/product_manage/api/product_list_request/" + id));
    };
    AuthenticationService.prototype.getproductlist_admin = function (id) {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + ("/product_manage/api/product_list_admin/" + id));
    };
    AuthenticationService.prototype.appoveorreject = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/product_manage/api/approve_reject_product", data);
    };
    AuthenticationService.prototype.quoteprice = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/product_manage/api/quote_price_by_admin", data);
    };
    AuthenticationService.prototype.productstatus = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "/product_manage/api/product_status", data);
    };
    // ::::::::::::::::::::::::::::::::::::: COUPON Mgmt ::::::::::::::::::::::::::::::::::::::::::::::: //
    AuthenticationService.prototype.get_coupon_mgmt = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/get_all_coupons");
    };
    AuthenticationService.prototype.delete_coupon = function (id) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/delete_coupon", {
            _id: id,
        });
    };
    AuthenticationService.prototype.create_Coupon = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/add_coupon", data);
    };
    AuthenticationService.prototype.edit_Coupon = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/edit_coupon", data);
    };
    // ::::::::::::::::::::::::::::::::::::: ORDER Mgmt ::::::::::::::::::::::::::::::::::::::::::::::: //
    AuthenticationService.prototype.get_order_mgmt = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/ongoing_order_list");
    };
    AuthenticationService.prototype.get_Payment_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/order_booking_list");
    };
    AuthenticationService.prototype.view_payment_list = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/order_booking_details", data);
    };
    AuthenticationService.prototype.get_completed_order_mgmt = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/completed_order_list");
    };
    AuthenticationService.prototype.get_cancelled_order_mgmt = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/cancelled_order_list");
    };
    AuthenticationService.prototype.get_view_order_mgmt = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/ongoing_order_details", data);
    };
    AuthenticationService.prototype.get_view_completed_order_mgmt = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/completed_order_details", data);
    };
    AuthenticationService.prototype.get_view_cancelled_order_mgmt = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/cancelled_order_details", data);
    };
    // ::::::::::::::::::::::::::::::::::::: REPORT Mgmt ::::::::::::::::::::::::::::::::::::::::::::::: //
    AuthenticationService.prototype.get_ongoing_order_report_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/ongoing_orders_report");
    };
    AuthenticationService.prototype.get_completed_order_report_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/completed_orders_report");
    };
    AuthenticationService.prototype.get_cancel_order_report_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/cancelled_orders_report");
    };
    AuthenticationService.prototype.get_orderCommisssion_report_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/order_commission_list");
    };
    AuthenticationService.prototype.get_sellerCommisssion_report_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/seller_commission_report");
    };
    AuthenticationService.prototype.get_finance_report_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/finance_report");
    };
    AuthenticationService.prototype.get_user_report_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/get_user_report");
    };
    AuthenticationService.prototype.get_today_completed_report_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/today_completed_orders");
    };
    AuthenticationService.prototype.get_monthly_completed_report_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/month_completed_orders");
    };
    AuthenticationService.prototype.get_quaterly_completed_report_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/quarter_completed_orders");
    };
    AuthenticationService.prototype.get_yearly_completed_report_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/year_completed_orders");
    };
    AuthenticationService.prototype.get_seller_order_report_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/seller_order_report");
    };
    AuthenticationService.prototype.get_user_order_report_list = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/user_order_report");
    };
    AuthenticationService.prototype.get_taxList = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/get_tax");
    };
    AuthenticationService.prototype.delete_subscription = function (id) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/delete_subscription", {
            _id: id,
        });
    };
    AuthenticationService.prototype.create_Subs = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/add_subscription", data);
    };
    AuthenticationService.prototype.edit_Subs = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/edit_subscription", data);
    };
    AuthenticationService.prototype.create_Tax = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/add_tax", data);
    };
    AuthenticationService.prototype.edit_Tax = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/edit_tax", data);
    };
    AuthenticationService.prototype.add_Product = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/add_product", data);
    };
    AuthenticationService.prototype.edit_Product = function (data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/edit_product", data);
    };
    AuthenticationService.prototype.post = function (url, data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/" + url, data);
    };
    AuthenticationService.prototype.get = function (url) {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/" + url);
    };
    AuthenticationService.prototype.get_complaint = function () {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].baseUrl + "admin/get_complaint_list");
    };
    AuthenticationService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ factory: function AuthenticationService_Factory() { return new AuthenticationService(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"])); }, token: AuthenticationService, providedIn: "root" });
    return AuthenticationService;
}());



/***/ }),

/***/ "./src/app/service/utils.service.ts":
/*!******************************************!*\
  !*** ./src/app/service/utils.service.ts ***!
  \******************************************/
/*! exports provided: UtilsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilsService", function() { return UtilsService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");



var UtilsService = /** @class */ (function () {
    function UtilsService(toast) {
        this.toast = toast;
        this.profile = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]('default');
        this.profileStatus = this.profile.asObservable();
    }
    /*storage*/
    UtilsService.prototype.set = function (key, data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    };
    UtilsService.prototype.get = function (key) {
        return JSON.parse(sessionStorage.getItem(key));
    };
    UtilsService.prototype.update = function (key, dataKey, data) {
        var BData = this.get(key);
        this.removeData(key);
        BData[dataKey] = data;
        window.localStorage.setItem(key, JSON.stringify(BData));
    };
    UtilsService.prototype.removeData = function (key) {
        window.localStorage.removeItem(key);
    };
    UtilsService.prototype.clear = function () {
        window.localStorage.clear();
    };
    /*toaster*/
    UtilsService.prototype.alert = function (type, msg) {
        switch (type) {
            case "success":
                this.toast.success(msg, 'SUCCESS');
                break;
            case "info":
                this.toast.info(msg, 'INFORMATION');
                break;
            case "error":
                this.toast.error(msg, 'ERROR');
                break;
            case "warn":
                this.toast.warning(msg, 'WARNING');
                break;
            default:
                this.toast.success(msg, 'SUCCESS');
                break;
        }
    };
    /*location service*/
    // setLocation(callback){
    //   navigator.geolocation.getCurrentPosition((data)=> {
    //     this.getAddressFromMarker(data['coords']['latitude'], data['coords']['longitude'], callback);
    //   });
    // }
    // getAddressFromMarker(lat, lng, callback){
    //   var that = this;
    //   var loc_str = that.get('bringness_data').location.address_string;
    //   if(loc_str != "") callback();
    //   var geocoder = new google.maps.Geocoder();
    //   geocoder.geocode
    //     ({
    //         latLng: {lat: lat, lng: lng}
    //     }, 
    //     function(results, status) 
    //     {
    //       that.update('bringness_data', 'location', {
    //         address_string: results.length != 0 ? results[2].formatted_address : '',
    //         lat: lat,
    //         long: lng
    //       });
    //       callback();
    //     }
    //   );
    // }
    UtilsService.prototype.scrollToTop = function () {
        window.scrollTo(0, 0);
    };
    UtilsService.prototype.profileChanged = function (msg) {
        this.profile.next(msg);
    };
    UtilsService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ factory: function UtilsService_Factory() { return new UtilsService(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"])); }, token: UtilsService, providedIn: "root" });
    return UtilsService;
}());



/***/ })

}]);
//# sourceMappingURL=default~layout-layout-module-ngfactory~shared-shared-module-ngfactory.js.map