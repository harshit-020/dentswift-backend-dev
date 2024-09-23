(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~layout-layout-module~shared-shared-module"],{

/***/ "./node_modules/ng2-tel-input/esm2015/ng2-tel-input.js":
/*!*************************************************************!*\
  !*** ./node_modules/ng2-tel-input/esm2015/ng2-tel-input.js ***!
  \*************************************************************/
/*! exports provided: Ng2TelInput, Ng2TelInputModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ng2TelInput", function() { return Ng2TelInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ng2TelInputModule", function() { return Ng2TelInputModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");



/**
 * @fileoverview added by tsickle
 * Generated from: src/ng2-tel-input.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const defaultUtilScript = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.1/js/utils.js';
class Ng2TelInput {
    /**
     * @param {?} el
     * @param {?} platformId
     */
    constructor(el, platformId) {
        this.el = el;
        this.platformId = platformId;
        this.ng2TelInputOptions = {};
        this.hasError = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.ng2TelOutput = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.countryChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.intlTelInputObject = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformBrowser"])(this.platformId)) {
            this.ng2TelInputOptions = Object.assign({}, this.ng2TelInputOptions, { utilsScript: this.getUtilsScript(this.ng2TelInputOptions) });
            this.ngTelInput = window.intlTelInput(this.el.nativeElement, Object.assign({}, this.ng2TelInputOptions));
            this.el.nativeElement.addEventListener("countrychange", (/**
             * @return {?}
             */
            () => {
                this.countryChange.emit(this.ngTelInput.getSelectedCountryData());
            }));
            this.intlTelInputObject.emit(this.ngTelInput);
        }
    }
    /**
     * @return {?}
     */
    onBlur() {
        /** @type {?} */
        let isInputValid = this.isInputValid();
        if (isInputValid) {
            /** @type {?} */
            let telOutput = this.ngTelInput.getNumber();
            this.hasError.emit(isInputValid);
            this.ng2TelOutput.emit(telOutput);
        }
        else {
            this.hasError.emit(isInputValid);
        }
    }
    /**
     * @return {?}
     */
    isInputValid() {
        return this.ngTelInput.isValidNumber();
    }
    /**
     * @param {?} country
     * @return {?}
     */
    setCountry(country) {
        this.ngTelInput.setCountry(country);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    getUtilsScript(options) {
        return options.utilsScript || defaultUtilScript;
    }
}
Ng2TelInput.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                selector: '[ng2TelInput]',
            },] },
];
/** @nocollapse */
Ng2TelInput.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"],] }] }
];
Ng2TelInput.propDecorators = {
    ng2TelInputOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['ng2TelInputOptions',] }],
    hasError: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"], args: ['hasError',] }],
    ng2TelOutput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"], args: ['ng2TelOutput',] }],
    countryChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"], args: ['countryChange',] }],
    intlTelInputObject: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"], args: ['intlTelInputObject',] }],
    onBlur: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['blur',] }]
};

/**
 * @fileoverview added by tsickle
 * Generated from: src/ng2-tel-input.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Ng2TelInputModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: Ng2TelInputModule,
            providers: []
        };
    }
}
Ng2TelInputModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                declarations: [Ng2TelInput],
                exports: [Ng2TelInput]
            },] },
];




/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/common/footer/footer.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/common/footer/footer.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"layout-footer\">\n    <div class=\"layout-footer-body\">\n\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/common/header/header.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/common/header/header.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"layout-header\">\n    <div class=\"navbar navbar-default\">\n        <div class=\"navbar-header\">\n            <a class=\"navbar-brand navbar-brand-center d-flex align-items-center\" href=\"javascript:void(0)\">\n                <!-- <img class=\"hpx-60\" src=\"assets/img/favicon.png\" alt=\"Elephant\"> -->\n                <img class=\"navbar-brand-logo\" src=\"assets/img/logo-new.jpeg\" alt=\"Elephant\">\n            </a>\n            <button class=\"navbar-toggler visible-xs-block collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#sidenav\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"bars\">\n          <span class=\"bar-line bar-line-1 out\"></span>\n          <span class=\"bar-line bar-line-2 out\"></span>\n          <span class=\"bar-line bar-line-3 out\"></span>\n        </span>\n        <span class=\"bars bars-x\">\n          <span class=\"bar-line bar-line-4\"></span>\n          <span class=\"bar-line bar-line-5\"></span>\n        </span>\n      </button>\n            <button class=\"navbar-toggler visible-xs-block collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbar\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"arrow-up\"></span>\n        <span class=\"ellipsis ellipsis-vertical\">\n          <!-- <img class=\"ellipsis-object\" width=\"32\" height=\"32\" src=\"assets/img/user-2.jpg\" alt=\"Teddy Wilson\"> -->\n        </span>\n      </button>\n        </div>\n\n        <div class=\"navbar-toggleable\">\n\n            <!-- <div class=\"navbar-toggleable\" *ngIf=\"href=='/home/dashboard'\"> -->\n            <nav id=\"navbar\" class=\"navbar-collapse collapse\">\n                <!-- <button class=\"sidenav-toggler hidden-xs\" title=\"Collapse sidenav ( [ )\" aria-expanded=\"true\" type=\"button\">\n                <span class=\"sr-only\">Toggle navigation</span>\n                <span class=\"bars\">\n                    <span class=\"bar-line bar-line-1 out\"></span>\n                    <span class=\"bar-line bar-line-2 out\"></span>\n                    <span class=\"bar-line bar-line-3 out\"></span>\n                    <span class=\"bar-line bar-line-4 in\"></span>\n                    <span class=\"bar-line bar-line-5 in\"></span>\n                    <span class=\"bar-line bar-line-6 in\"></span>\n                </span>\n                </button> -->\n                <ul class=\"nav navbar-nav navbar-right\" *ngIf=\"currentUser\">\n                    <!-- <li>\n                        <a href=\"javascript:void(0)\" class=\"hidden-xs d-flex align-center p-0\" id=\"searchA\">\n                        <span class=\"searchbox\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Search here...\"/>\n                            <button class=\"icon icon-search icon-lg icon-fw btn-primary btn\" (click)=\"searchToggle()\"></button>\n                        </span>\n                        <span class=\"icon-with-child\" (click)=\"searchToggle()\">\n                            <span class=\"icon icon-search icon-lg\"></span>\n                        </span>\n                        </a>\n                        <span class=\"visible-xs-block searchbox\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Search here...\">\n                        <button class=\"icon icon-search icon-lg icon-fw btn-primary btn\"></button>\n                        </span>\n                    </li> -->\n                    <li class=\"header-bg\">\n                        Account Status :\n                        <span class=\"text-success\"> Active \n                            <span class=\"dot\"></span>\n                        </span>\n                        \n                    </li>\n                    <li class=\"dropdown\"  >\n                        <a (click)=\"getNotification()\" style=\"background-color: #F8FAFF;border-radius: 10px;padding:5px;\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n                            <img src=\"assets/img/bell.png\" alt=\"icon\" />\n                        </a>\n                        <ul class=\"dropdown-menu notification-dropdown\" aria-labelledby=\"dropdownMenuLink\" >\n                            <h5 class=\"m-0\"><strong>NOTIFICATIONS</strong></h5>\n                            <li *ngFor=\"let item of notification\">\n                                <h4>{{item?.title}}</h4>\n                                <p>{{item?.body}}</p>\n                                <span>{{item?.created_at | date}}</span>\n                            </li> \n                        </ul>\n                        <!-- <a routerLink=\"/home/support\" style=\"background-color: #F8FAFF;border-radius: 10px;padding:5px;\">\n                            <img src=\"assets/img/bell.png\" alt=\"icon\" />\n                        </a> -->\n                    </li>\n                    <!-- <li class=\"dropdown\">\n                        <a class=\"dropdown-toggle\" href=\"#\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\">\n                            <span class=\"icon-with-child hidden-xs\">\n                            <span class=\"icon icon-bell-o icon-lg\"></span>\n                            <span class=\"badge badge-danger badge-above right\">7</span>\n                            </span>\n                            <span class=\"visible-xs-block\">\n                            <span class=\"icon icon-bell icon-lg icon-fw\"></span>\n                            <span class=\"badge badge-danger pull-right\">7</span> Notifications\n                            </span>\n                        </a>\n                        <div class=\"dropdown-menu dropdown-menu-right dropdown-menu-lg\">\n                           \n                            <div class=\"dropdown-body\">\n                                <div class=\"list-group list-group-divided custom-scrollbar\">\n                                    <a class=\"list-group-item notification-item\" routerLink=\"/home/notification-management\">\n                                        <div class=\"notification\">\n                                            <div class=\"notification-media\">\n                                                <img src=\"assets/img/payment confirmed.png\" alt=\"icon\" />\n                                            </div>\n                                            <div class=\"notification-content\">\n                                                <h5 class=\"notification-heading\">Payment Confirmed</h5>\n                                                <p class=\"notification-text\">\n                                                    <small class=\"truncate\">Contrary to popular belief, lorem ipsum is not simply random text. Esono innumerevoli variazioni dei passaggi del.</small>\n                                                </p>\n                                            </div>\n                                        </div>\n                                    </a>\n                                    <a class=\"list-group-item\" routerLink=\"/home/notification-management\">\n                                        <div class=\"notification\">\n                                            <div class=\"notification-media\">\n                                                <img src=\"assets/img/payment confirmed.png\" alt=\"icon\" />\n                                            </div>\n                                            <div class=\"notification-content\">\n                                                <h5 class=\"notification-heading\">Payment Confirmed</h5>\n                                                <p class=\"notification-text\">\n                                                    <small class=\"truncate\">Contrary to popular belief, lorem ipsum is not simply random text. Esono innumerevoli variazioni dei passaggi del.</small>\n                                                </p>\n                                            </div>\n                                        </div>\n                                    </a>\n                                    <a class=\"list-group-item\" routerLink=\"/home/notification-management\">\n                                        <div class=\"notification\">\n                                            <div class=\"notification-media\">\n                                                <img src=\"assets/img/payment confirmed.png\" alt=\"icon\" />\n                                            </div>\n                                            <div class=\"notification-content\">\n                                                <h5 class=\"notification-heading\">Payment Confirmed</h5>\n                                                <p class=\"notification-text\">\n                                                    <small class=\"truncate\">Contrary to popular belief, lorem ipsum is not simply random text. Esono innumerevoli variazioni dei passaggi del.</small>\n                                                </p>\n                                            </div>\n                                        </div>\n                                    </a>\n\n                                </div>\n                            </div>\n                            <div class=\"dropdown-footer\">\n                                <a class=\"all-txt\" routerLink=\"/home/notification-management\">See All Notifications</a>\n                            </div>\n                        </div>\n                    </li> -->\n                    <!-- <li class=\"dropdown lang-select\">\n                        <button class=\"navbar-account-btn\" data-toggle=\"dropdown\" aria-haspopup=\"true\">\n                        <img class=\"rounded\" width=\"36\" height=\"36\" src=\"assets/img/globe.png\" alt=\"lang\"> En\n                        <span class=\"caret\"></span>\n                        </button>\n                        <ul class=\"dropdown-menu dropdown-menu-right dropdown-lang\">\n                            <li class=\"lang-content\">\n                                <img src=\"assets/img/world.png\" alt=\"icon\" />\n                                <p>Change Language</p>\n                            </li>\n                            <li>\n                                <p class=\"ln-txt\">English(U.S)</p>\n                                <label class=\"lang-check\">\n                                <input type=\"radio\" checked=\"checked\" name=\"radio\">\n                                <span class=\"checkmark\"></span>\n                                </label>\n                            </li>\n                            <li>\n                                <p class=\"ln-txt\">Arabic</p>\n                                <label class=\"lang-check\">\n                                <input type=\"radio\" name=\"radio\">\n                                <span class=\"checkmark\"></span>\n                                </label>\n                            </li>\n                        </ul>\n                    </li> -->\n                    <li class=\"dropdown header-profile\" routerLink=\"/home/profile-setting\">\n                        <button class=\"navbar-account-btn\">\n                    <img *ngIf=\"isLoging?.business_logo\" class=\"\" width=\"36\" height=\"36\" src=\"{{isLoging?.business_logo}}\" alt=\"img\"  > \n                    <img *ngIf=\"!isLoging?.business_logo\" class=\"\" width=\"36\" height=\"36\" src=\"assets/img/profile-logo.png\" alt=\"img\">  \n                    \n              <!-- Teddy Wilson -->\n                    {{isLoging?.full_name}}\n\n              <!-- <img class=\"\" width=\"36\" height=\"36\" src=\"assets/img/profile-logo.png\" alt=\"img\"> \n              {{currentUser?.full_name}} -->\n              <!-- <img src=\"{{isLoging?.}}\" alt=\"icon\" class=\"ml-2\" /> -->\n              <!-- <img src=\"assets/img/profile-logo.png\" alt=\"icon\" class=\"ml-2\" /> -->\n\n            </button>\n                    </li>\n\n                    <!-- <li class=\"visible-xs-block\">\n                        <a routerLink=\"/home/profile\">\n                        <span class=\"icon icon-user icon-lg icon-fw\"></span>\n                        Profile\n                        </a>\n                    </li>\n                    <li class=\"visible-xs-block\">\n                        <a routerLink=\"/login\">\n                        <span class=\"icon icon-power-off icon-lg icon-fw\"></span>\n                        Sign out\n                        </a>\n                    </li> -->\n                </ul>\n            </nav>\n        </div>\n    </div>\n\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/common/left-sidebar/left-sidebar.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/common/left-sidebar/left-sidebar.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"layout-sidebar\">\n    <!-- <div class=\"layout-sidebar-backdrop\"></div> -->\n    <div class=\"layout-sidebar-body\">\n        <div class=\"custom-scrollbar\">\n            <nav id=\"sidenav\" class=\"sidenav-collapse collapse\">\n                <ul class=\"sidenav\">\n                    <li class=\"sidenav-heading\"></li>\n                    <li class=\"sidenav-item dashboarNav\" routerLinkActive=\"active\">\n                        <a routerLink=\"/home/dashboard\">\n                            <span class=\"sidenav-icon\">\n                                <img src=\"assets/img/outline-Category.png\" alt=\"icon\" class=\"blue-icon\" />\n                                <img src=\"assets/img/Bold-Category.png\" alt=\"icon\" class=\"white-icon\" />\n                            </span>\n                            <span class=\"sidenav-label\">Dashboard</span>\n                        </a>\n                    </li>\n                    <li class=\"sidenav-item orderNav\" routerLinkActive=\"active\">\n                        <a routerLink=\"/home/order-management\">\n                            <span class=\"sidenav-icon\">\n                                <img src=\"assets/img/outline-Buy.png\" alt=\"icon\" class=\"blue-icon\" />\n                                <img src=\"assets/img/Bold-Buy.png\" alt=\"icon\" class=\"white-icon\" />\n                            </span>\n                            <span class=\"sidenav-label\">Orders</span>\n                        </a>\n                    </li>\n                    <li class=\"sidenav-item productNav\" routerLinkActive=\"active\">\n                        <a routerLink=\"/home/product-management\">\n                            <span class=\"sidenav-icon\">\n                                <img src=\"assets/img/outline.png\" alt=\"icon\" class=\"blue-icon\" />\n                                <img src=\"assets/img/fill-bold.png\" alt=\"icon\" class=\"white-icon\" />\n                            </span>\n                            <span class=\"sidenav-label\">Products</span>\n                        </a>\n                    </li>\n                    <li class=\"sidenav-item inventoryNav\" routerLinkActive=\"active\">\n                        <a routerLink=\"/home/inventory-management\">\n                            <span class=\"sidenav-icon\">\n                                <img src=\"assets/img/outline-Graph.png\" alt=\"icon\" class=\"blue-icon\" />\n                                <img src=\"assets/img/Bold-Graph.png\" alt=\"icon\" class=\"white-icon\" />\n                            </span>\n                            <span class=\"sidenav-label\">Inventory</span>\n                        </a>\n                    </li>\n                    <li class=\"sidenav-item paymentNav\" routerLinkActive=\"active\">\n                        <a routerLink=\"/home/payment-management\">\n                            <span class=\"sidenav-icon\">\n                                <img src=\"assets/img/Wallet.png\" alt=\"icon\" class=\"blue-icon\" />\n                                <img src=\"assets/img/Bold-Wallet.png\" alt=\"icon\" class=\"white-icon\" />\n                            </span>\n                            <span class=\"sidenav-label\">\n                                Financials</span>\n                        </a>\n                    </li>\n                    <li class=\"sidenav-item offerNav\" routerLinkActive=\"active\">\n                        <a routerLink=\"/home/offer-details\">\n                            <span class=\"sidenav-icon\">\n                                <img src=\"assets/img/outline-Discount.png\" alt=\"icon\" class=\"blue-icon\" />\n                                <img src=\"assets/img/Bold-Discount.png\" alt=\"icon\" class=\"white-icon\" />\n                            </span>\n                            <span class=\"sidenav-label\"> Membership/<br>\n                                Subscription</span>\n                        </a>\n                    </li>\n                  \n                    <li class=\"sidenav-item reportNav\" routerLinkActive=\"active\">\n                        <a routerLink=\"/home/report-management\">\n                            <span class=\"sidenav-icon\">\n                                <img src=\"assets/img/outline-Paper.png\" alt=\"icon\" class=\"blue-icon\" />\n                                <img src=\"assets/img/Bold-Paper.png\" alt=\"icon\" class=\"white-icon\" />\n                            </span>\n                            <span class=\"sidenav-label\">Reports</span>\n                        </a>\n                    </li>\n                  \n                    <li class=\"sidenav-item supportNav\" routerLinkActive=\"active\">\n                        <a routerLink=\"/home/support-chat\">\n                            <span class=\"sidenav-icon\">\n                                <img src=\"assets/img/support.png\" alt=\"icon\" class=\"blue-icon\" />\n                                <img src=\"assets/img/support_hover.png\" alt=\"icon\" class=\"white-icon\" />\n                            </span>\n                            <span class=\"sidenav-label\">Support</span>\n                        </a>\n                    </li>\n\n\n\n                </ul>\n            </nav>\n\n            <nav id=\"sidenav\" class=\"sidenav-collapse collapse bottom-section\">\n                <ul class=\"sidenav\">\n                    <li class=\"sidenav-item\" routerLinkActive=\"active\">\n                        <a href=\"javascript:void(0)\" (click)=\"logoutSeller()\">\n                            <span class=\"sidenav-icon\">\n                                <img src=\"assets/img/outline-Logout.png\" alt=\"icon\" class=\"blue-icon\" />\n                                <img src=\"assets/img/login-icon.png\" alt=\"icon\" class=\"white-icon\" />\n                            </span>\n                            <span class=\"sidenav-label\"> Logout</span>\n                        </a>\n                    </li>\n                </ul>\n            </nav>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/common/login-header/login-header.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/common/login-header/login-header.component.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"layout-header\">\n    <div class=\"navbar navbar-default\">\n        <div class=\"navbar-header\">\n            <a class=\"navbar-brand navbar-brand-center d-flex align-items-center\" href=\"javascript:void(0)\">\n                <!-- <img class=\"hpx-60\" src=\"assets/img/favicon.png\" alt=\"Elephant\"> -->\n                <img class=\"navbar-brand-logo\" src=\"assets/img/logo-new.jpeg\" alt=\"Elephant\">\n            </a>\n            <button class=\"navbar-toggler visible-xs-block collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#sidenav\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"bars\">\n          <span class=\"bar-line bar-line-1 out\"></span>\n          <span class=\"bar-line bar-line-2 out\"></span>\n          <span class=\"bar-line bar-line-3 out\"></span>\n        </span>\n        <span class=\"bars bars-x\">\n          <span class=\"bar-line bar-line-4\"></span>\n          <span class=\"bar-line bar-line-5\"></span>\n        </span>\n      </button>\n            <button class=\"navbar-toggler visible-xs-block collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbar\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"arrow-up\"></span>\n        <span class=\"ellipsis ellipsis-vertical\">\n          <!-- <img class=\"ellipsis-object\" width=\"32\" height=\"32\" src=\"assets/img/user-2.jpg\" alt=\"Teddy Wilson\"> -->\n        </span>\n      </button>\n        </div>\n\n        <div class=\"navbar-toggleable\">\n\n            <!-- <div class=\"navbar-toggleable\" *ngIf=\"href=='/home/dashboard'\"> -->\n            <nav id=\"navbar\" class=\"navbar-collapse collapse\">\n                <!-- <button class=\"sidenav-toggler hidden-xs\" title=\"Collapse sidenav ( [ )\" aria-expanded=\"true\" type=\"button\">\n                <span class=\"sr-only\">Toggle navigation</span>\n                <span class=\"bars\">\n                    <span class=\"bar-line bar-line-1 out\"></span>\n                    <span class=\"bar-line bar-line-2 out\"></span>\n                    <span class=\"bar-line bar-line-3 out\"></span>\n                    <span class=\"bar-line bar-line-4 in\"></span>\n                    <span class=\"bar-line bar-line-5 in\"></span>\n                    <span class=\"bar-line bar-line-6 in\"></span>\n                </span>\n                </button> -->\n                \n            </nav>\n        </div>\n    </div>\n\n</div>");

/***/ }),

/***/ "./src/app/common/comman-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/common/comman-routing.module.ts ***!
  \*************************************************/
/*! exports provided: CommonRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonRoutingModule", function() { return CommonRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");



const routes = [];
let CommonRoutingModule = class CommonRoutingModule {
};
CommonRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], CommonRoutingModule);



/***/ }),

/***/ "./src/app/common/comman.module.ts":
/*!*****************************************!*\
  !*** ./src/app/common/comman.module.ts ***!
  \*****************************************/
/*! exports provided: CommanModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommanModule", function() { return CommanModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _comman_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./comman-routing.module */ "./src/app/common/comman-routing.module.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header/header.component */ "./src/app/common/header/header.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/common/footer/footer.component.ts");
/* harmony import */ var _left_sidebar_left_sidebar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./left-sidebar/left-sidebar.component */ "./src/app/common/left-sidebar/left-sidebar.component.ts");
/* harmony import */ var _login_header_login_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./login-header/login-header.component */ "./src/app/common/login-header/login-header.component.ts");




// import { CommanRoutingModule } from './comman-routing.module';




let CommanModule = class CommanModule {
};
CommanModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_5__["FooterComponent"], _left_sidebar_left_sidebar_component__WEBPACK_IMPORTED_MODULE_6__["LeftSidebarComponent"], _login_header_login_header_component__WEBPACK_IMPORTED_MODULE_7__["LoginHeaderComponent"],],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _comman_routing_module__WEBPACK_IMPORTED_MODULE_3__["CommonRoutingModule"],
        ],
        exports: [
            _header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_5__["FooterComponent"], _left_sidebar_left_sidebar_component__WEBPACK_IMPORTED_MODULE_6__["LeftSidebarComponent"], _login_header_login_header_component__WEBPACK_IMPORTED_MODULE_7__["LoginHeaderComponent"]
        ]
    })
], CommanModule);



/***/ }),

/***/ "./src/app/common/footer/footer.component.css":
/*!****************************************************!*\
  !*** ./src/app/common/footer/footer.component.css ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbW1vbi9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/common/footer/footer.component.ts":
/*!***************************************************!*\
  !*** ./src/app/common/footer/footer.component.ts ***!
  \***************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let FooterComponent = class FooterComponent {
    constructor() { }
    ngOnInit() {
    }
};
FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-footer',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./footer.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/common/footer/footer.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./footer.component.css */ "./src/app/common/footer/footer.component.css")).default]
    })
], FooterComponent);



/***/ }),

/***/ "./src/app/common/header/header.component.css":
/*!****************************************************!*\
  !*** ./src/app/common/header/header.component.css ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#searchA .searchbox,\n#searchA.active .icon-with-child {\n    display: none;\n}\n\n#searchA.active .searchbox {\n    display: block;\n}\n\n#searchA .searchbox input {\n    width: 30px;\n    transition: ease-in-out 1s;\n    -moz-transition: ease-in-out 1s;\n    -webkit-transition: ease-in-out 1s;\n}\n\n#searchA.active .searchbox input {\n    width: 180px;\n}\n\n.header-bg {\n    padding: 10px 0;\n    background-color: #F8FAFF;\n    border-radius: 10px;\n    margin-right: 10px;\n}\n\n.dot {\n    width: 8px;\n    height: 8px;\n    background-color: #0EA130;\n    display: inline-block;\n    border-radius: 100px;\n    margin-right: 5px;\n}\n\n.notification-dropdown {\n    width: 300px;\n    height: 400px;\n    overflow-y: auto;\n    color: #333;\n}\n\n.notification-dropdown li {\n    padding: 5px 10px;\n    border-bottom: 1px solid #dedede;\n}\n\n.notification-dropdown h5 {\n    border-bottom: 2px solid #dedede;\n    padding: 5px 10px;\n}\n\n.notification-dropdown li span {\n    font-size: 10px;\n    margin-left: auto;\n    display: block;\n    text-align: right;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tbW9uL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7SUFFSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCwwQkFBMEI7SUFDMUIsK0JBQStCO0lBQy9CLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsV0FBVztJQUNYLHlCQUF5QjtJQUN6QixxQkFBcUI7SUFDckIsb0JBQW9CO0lBQ3BCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxnQ0FBZ0M7SUFDaEMsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsaUJBQWlCO0FBQ3JCIiwiZmlsZSI6InNyYy9hcHAvY29tbW9uL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNzZWFyY2hBIC5zZWFyY2hib3gsXG4jc2VhcmNoQS5hY3RpdmUgLmljb24td2l0aC1jaGlsZCB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cblxuI3NlYXJjaEEuYWN0aXZlIC5zZWFyY2hib3gge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4jc2VhcmNoQSAuc2VhcmNoYm94IGlucHV0IHtcbiAgICB3aWR0aDogMzBweDtcbiAgICB0cmFuc2l0aW9uOiBlYXNlLWluLW91dCAxcztcbiAgICAtbW96LXRyYW5zaXRpb246IGVhc2UtaW4tb3V0IDFzO1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogZWFzZS1pbi1vdXQgMXM7XG59XG5cbiNzZWFyY2hBLmFjdGl2ZSAuc2VhcmNoYm94IGlucHV0IHtcbiAgICB3aWR0aDogMTgwcHg7XG59XG5cbi5oZWFkZXItYmcge1xuICAgIHBhZGRpbmc6IDEwcHggMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjhGQUZGO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4uZG90IHtcbiAgICB3aWR0aDogOHB4O1xuICAgIGhlaWdodDogOHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwRUExMzA7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xuICAgIG1hcmdpbi1yaWdodDogNXB4O1xufVxuXG4ubm90aWZpY2F0aW9uLWRyb3Bkb3duIHtcbiAgICB3aWR0aDogMzAwcHg7XG4gICAgaGVpZ2h0OiA0MDBweDtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIGNvbG9yOiAjMzMzO1xufVxuXG4ubm90aWZpY2F0aW9uLWRyb3Bkb3duIGxpIHtcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RlZGVkZTtcbn1cblxuLm5vdGlmaWNhdGlvbi1kcm9wZG93biBoNSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNkZWRlZGU7XG4gICAgcGFkZGluZzogNXB4IDEwcHg7XG59XG5cbi5ub3RpZmljYXRpb24tZHJvcGRvd24gbGkgc3BhbiB7XG4gICAgZm9udC1zaXplOiAxMHB4O1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/common/header/header.component.ts":
/*!***************************************************!*\
  !*** ./src/app/common/header/header.component.ts ***!
  \***************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_service_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/authentication.service */ "./src/app/service/authentication.service.ts");




let HeaderComponent = class HeaderComponent {
    // loginHeader: boolean;
    constructor(router, api) {
        this.router = router;
        this.api = api;
        this.href = "";
    }
    ngOnInit() {
        this.getNotification();
        this.href = this.router.url;
        // console.log(this.href);
        // console.log(localStorage.getItem("currentUser"))
        $('.sidenav-toggler').on('click', function () {
            $(this).toggleClass('collapsed');
            $('.sidenav-collapse .sidenav').toggleClass('sidenav-collapsed');
            $('body').toggleClass('layout-sidebar-collapsed');
            if ($(this).hasClass('collapsed')) {
                $(this).attr('title', 'Expand sidenav');
            }
            else {
                $(this).attr('title', 'Collapse sidenav');
            }
        });
        this.currentUser = localStorage.getItem('currentUser');
        this.isLoging = JSON.parse(this.currentUser);
        // console.log(this.isLoging.full_name, "======>");
        // if(this.currentUser){
        //   this.loginHeader=true;
        // }
        // else{
        //   this.loginHeader=false;
        // }
        // if(this.currentUser == undefined){
        //   return
        // }
    }
    getNotification() {
        this.api.get('notification_list').subscribe(data => {
            // console.log(data,'Notification');
            this.notification = data['response']['notificationList'];
            console.log(this.notification, "Notification");
        }, err => {
            console.log(err);
        });
    }
    searchToggle() {
        document.getElementById('searchA').classList.toggle('active');
    }
};
HeaderComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: src_app_service_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"] }
];
HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-header',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./header.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/common/header/header.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./header.component.css */ "./src/app/common/header/header.component.css")).default]
    })
], HeaderComponent);



/***/ }),

/***/ "./src/app/common/left-sidebar/left-sidebar.component.css":
/*!****************************************************************!*\
  !*** ./src/app/common/left-sidebar/left-sidebar.component.css ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".sidenav>li.active>a .blue-icon {\n    display: none;\n}\n\n.sidenav>li a .white-icon {\n    display: none;\n}\n\n.sidenav>li.active>a .white-icon {\n    display: block;\n}\n\n/* .sidenav>li.active>a:hover .white-icon {\n    display: block;\n}\n\n.sidenav>li.active:hover>a .white-icon {\n    display: block;\n} */\n\n.bottom-section {\n    position: absolute;\n    top: 90%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tbW9uL2xlZnQtc2lkZWJhci9sZWZ0LXNpZGViYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFHQTs7Ozs7O0dBTUc7O0FBRUg7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtBQUNaIiwiZmlsZSI6InNyYy9hcHAvY29tbW9uL2xlZnQtc2lkZWJhci9sZWZ0LXNpZGViYXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zaWRlbmF2PmxpLmFjdGl2ZT5hIC5ibHVlLWljb24ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5zaWRlbmF2PmxpIGEgLndoaXRlLWljb24ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5zaWRlbmF2PmxpLmFjdGl2ZT5hIC53aGl0ZS1pY29uIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbn1cblxuXG4vKiAuc2lkZW5hdj5saS5hY3RpdmU+YTpob3ZlciAud2hpdGUtaWNvbiB7XG4gICAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5zaWRlbmF2PmxpLmFjdGl2ZTpob3Zlcj5hIC53aGl0ZS1pY29uIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbn0gKi9cblxuLmJvdHRvbS1zZWN0aW9uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA5MCU7XG59Il19 */");

/***/ }),

/***/ "./src/app/common/left-sidebar/left-sidebar.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/common/left-sidebar/left-sidebar.component.ts ***!
  \***************************************************************/
/*! exports provided: LeftSidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeftSidebarComponent", function() { return LeftSidebarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var _service_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/utils.service */ "./src/app/service/utils.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _service_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../service/authentication.service */ "./src/app/service/authentication.service.ts");






let LeftSidebarComponent = class LeftSidebarComponent {
    constructor(toastr, utils, api, router) {
        this.toastr = toastr;
        this.utils = utils;
        this.api = api;
        this.router = router;
    }
    ngOnInit() {
        $('.sidenav-collapse .sidenav li a').click(function () {
            if ($('body').hasClass('layout-sidebar-collapsed')) {
                $('.sidenav-collapse .sidenav').addClass('sidenav-collapsed');
            }
            else {
                $('.sidenav-collapse .sidenav').removeClass('sidenav-collapsed');
            }
        });
        // $('.has-subnav > a').on('click', function(){
        //   $(this).parent('li').toggleClass('open');
        //   $(this).next('ul').toggleClass('collapse');
        //   $(this).next('ul').slideToggle('');
        // });
        // $('.sidenav-toggler').on('click', function(){
        //   $('body').toggleClass('layout-sidebar-collapsed');
        //   $('.sidenav-collapse').toggleClass('sidenav-collapsed');
        // $('.sidenav-collapse').toggleClass('collapse');
        //  });
        //  $('.has-subnav > a').click(function(){
        //   if($('body').hasClass('layout-sidebar-collapsed')){
        //     $(this).closest('.has-subnav').toggleClass('active');
        //     $(this).next('ul').slideToggle('');
        //   }else{
        //     $(this).click('disabled', true);
        //   }
        // });
        setTimeout(() => {
            $(document).ready(function () {
                if ($('.dashboardPage').length) {
                    $('.sidenav-item').removeClass('active');
                    $('.dashboarNav').addClass('active');
                }
                if ($('.orderPage').length) {
                    $('.sidenav-item').removeClass('active');
                    $('.orderNav').addClass('active');
                }
                if ($('.inventoryPage').length) {
                    $('.sidenav-item').removeClass('active');
                    $('.inventoryNav').addClass('active');
                }
                if ($('.offerPage').length) {
                    $('.sidenav-item').removeClass('active');
                    $('.offerNav').addClass('active');
                }
                if ($('.paymentPage').length) {
                    $('.sidenav-item').removeClass('active');
                    $('.paymentNav').addClass('active');
                }
                if ($('.reportPage').length) {
                    $('.sidenav-item').removeClass('active');
                    $('.reportNav').addClass('active');
                }
                if ($('.productPage').length) {
                    $('.sidenav-item').removeClass('active');
                    $('.productNav').addClass('active');
                }
                if ($('.supportPage').length) {
                    $('.sidenav-item').removeClass('active');
                    $('.supportNav').addClass('active');
                }
            });
        }, 500);
    }
    logoutSeller() {
        this.api.logout().subscribe(data => {
            console.log(data, "::::::::::::::::::::i am here");
            this.utils.alert('', 'seller logged out successfully');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('rememberMe');
            this.router.navigate(['/login']);
        }, error => {
            console.log(error);
            // this.toastr.error("Please enter valid email and password");
            this.router.navigate(['/login']);
            // this.utils.alert('error', error['error']['message']);
        });
    }
};
LeftSidebarComponent.ctorParameters = () => [
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
    { type: _service_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"] },
    { type: _service_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
LeftSidebarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-left-sidebar',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./left-sidebar.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/common/left-sidebar/left-sidebar.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./left-sidebar.component.css */ "./src/app/common/left-sidebar/left-sidebar.component.css")).default]
    })
], LeftSidebarComponent);



/***/ }),

/***/ "./src/app/common/login-header/login-header.component.css":
/*!****************************************************************!*\
  !*** ./src/app/common/login-header/login-header.component.css ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#searchA .searchbox,\n#searchA.active .icon-with-child {\n    display: none;\n}\n\n#searchA.active .searchbox {\n    display: block;\n}\n\n#searchA .searchbox input {\n    width: 30px;\n    transition: ease-in-out 1s;\n    -moz-transition: ease-in-out 1s;\n    -webkit-transition: ease-in-out 1s;\n}\n\n#searchA.active .searchbox input {\n    width: 180px;\n}\n\n.header-bg {\n    padding: 10px 0;\n    background-color: #F8FAFF;\n    border-radius: 10px;\n    margin-right: 10px;\n}\n\n.dot {\n    width: 8px;\n    height: 8px;\n    background-color: #0EA130;\n    display: inline-block;\n    border-radius: 100px;\n    margin-right: 5px;\n}\n\n.notification-dropdown {\n    width: 300px;\n    height: 400px;\n    overflow-y: auto;\n    color: #333;\n}\n\n.notification-dropdown li {\n    padding: 5px 10px;\n    border-bottom: 1px solid #dedede;\n}\n\n.notification-dropdown h5 {\n    border-bottom: 2px solid #dedede;\n    padding: 5px 10px;\n}\n\n.notification-dropdown li span {\n    font-size: 10px;\n    margin-left: auto;\n    display: block;\n    text-align: right;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tbW9uL2xvZ2luLWhlYWRlci9sb2dpbi1oZWFkZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7SUFFSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCwwQkFBMEI7SUFDMUIsK0JBQStCO0lBQy9CLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsV0FBVztJQUNYLHlCQUF5QjtJQUN6QixxQkFBcUI7SUFDckIsb0JBQW9CO0lBQ3BCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxnQ0FBZ0M7SUFDaEMsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsaUJBQWlCO0FBQ3JCIiwiZmlsZSI6InNyYy9hcHAvY29tbW9uL2xvZ2luLWhlYWRlci9sb2dpbi1oZWFkZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNzZWFyY2hBIC5zZWFyY2hib3gsXG4jc2VhcmNoQS5hY3RpdmUgLmljb24td2l0aC1jaGlsZCB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cblxuI3NlYXJjaEEuYWN0aXZlIC5zZWFyY2hib3gge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4jc2VhcmNoQSAuc2VhcmNoYm94IGlucHV0IHtcbiAgICB3aWR0aDogMzBweDtcbiAgICB0cmFuc2l0aW9uOiBlYXNlLWluLW91dCAxcztcbiAgICAtbW96LXRyYW5zaXRpb246IGVhc2UtaW4tb3V0IDFzO1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogZWFzZS1pbi1vdXQgMXM7XG59XG5cbiNzZWFyY2hBLmFjdGl2ZSAuc2VhcmNoYm94IGlucHV0IHtcbiAgICB3aWR0aDogMTgwcHg7XG59XG5cbi5oZWFkZXItYmcge1xuICAgIHBhZGRpbmc6IDEwcHggMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjhGQUZGO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4uZG90IHtcbiAgICB3aWR0aDogOHB4O1xuICAgIGhlaWdodDogOHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwRUExMzA7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xuICAgIG1hcmdpbi1yaWdodDogNXB4O1xufVxuXG4ubm90aWZpY2F0aW9uLWRyb3Bkb3duIHtcbiAgICB3aWR0aDogMzAwcHg7XG4gICAgaGVpZ2h0OiA0MDBweDtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIGNvbG9yOiAjMzMzO1xufVxuXG4ubm90aWZpY2F0aW9uLWRyb3Bkb3duIGxpIHtcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RlZGVkZTtcbn1cblxuLm5vdGlmaWNhdGlvbi1kcm9wZG93biBoNSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNkZWRlZGU7XG4gICAgcGFkZGluZzogNXB4IDEwcHg7XG59XG5cbi5ub3RpZmljYXRpb24tZHJvcGRvd24gbGkgc3BhbiB7XG4gICAgZm9udC1zaXplOiAxMHB4O1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/common/login-header/login-header.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/common/login-header/login-header.component.ts ***!
  \***************************************************************/
/*! exports provided: LoginHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginHeaderComponent", function() { return LoginHeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let LoginHeaderComponent = class LoginHeaderComponent {
    constructor() { }
    ngOnInit() {
    }
};
LoginHeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-login-header',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./login-header.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/common/login-header/login-header.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./login-header.component.css */ "./src/app/common/login-header/login-header.component.css")).default]
    })
], LoginHeaderComponent);



/***/ }),

/***/ "./src/app/service/authentication.service.ts":
/*!***************************************************!*\
  !*** ./src/app/service/authentication.service.ts ***!
  \***************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");





let AuthenticationService = class AuthenticationService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
    }
    isLogin() {
        var token;
        var remembered = localStorage.getItem('rememberMe');
        if (remembered == undefined) {
            token = sessionStorage.getItem('currentUser');
        }
        else {
            token = localStorage.getItem('currentUser');
        }
        if (token)
            return true;
        else
            false;
    }
    getToken() {
        let admin = JSON.parse(localStorage.getItem('currentUser'));
        this.token = admin.token;
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
                'access_token': this.token
            })
        };
    }
    signup(data) {
        // environment.baseUrl+
        return this.http.post(`seller/sign_up`, data);
    }
    resendOtp() {
        // this.getToken();
        return this.http.post(`seller/resend_otp`, this.httpOptions);
    }
    login(data) {
        return this.http.post(`seller/login`, data);
    }
    forgotPassword(data) {
        return this.http.post(`seller/forgot_password`, data);
    }
    verifyOtp(data) {
        // this.getToken();        
        return this.http.post(`seller/verify_otp`, data);
        // return this.http.post(environment.baseUrl+`seller/verify_otp`, data);
    }
    verifyPasswordOtp(data) {
        // this.getToken();        
        return this.http.post(`seller/verify_otp`, data);
        // return this.http.post(environment.baseUrl+`seller/verify_otp`, data);
    }
    resetPassword(data) {
        return this.http.post(`seller/reset_password`, data);
    }
    get_all_country() {
        return this.http.get(`seller/get_countries`);
    }
    get_city_of_country(data) {
        return this.http.post(`seller/get_cities`, data);
    }
    uploadFile(data) {
        return this.http.post(`seller/upload_file`, data);
    }
    addBankDetails(data) {
        return this.http.post(`seller/profile_details`, data);
    }
    sendEmailVerification() {
        return this.http.get(`seller/send_email_verification`);
    }
    fetchSellerDetails(data) {
        return this.http.post(`seller/get_seller_data`, data);
    }
    logout() {
        return this.http.get(`seller/logout`);
        // this.router.navigateByUrl('login');
        // return true;
    }
    profile(data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + `profile`, data);
    }
    userlist() {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + `userList`);
    }
    deleteUser(data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + 'delete', data);
    }
    blockUnblock(data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + 'block', data);
    }
    Unblockblock(data) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].baseUrl + 'Unblockblock', data);
    }
    productsListing() {
        // return this.http.get('http://15.184.116.154:3000/seller/get_all_products');
        return this.http.get(`seller/get_all_products`);
    }
    // delete(path):Observable<any>{
    //     return this.http.(`$environment.baseUrl}${path}`)
    //     }
    delete_product(id) {
        return this.http.post(`seller/delete_product`, {
            _id: id
        });
    }
    addProduct(data) {
        return this.http.post(`seller/add_product`, data);
    }
    // categoryList
    categoryList() {
        return this.http.get(`seller/get_category_list`);
    }
    // subcategoryList
    subcategoryList(data) {
        return this.http.post(`seller/get_subcategory_list`, data);
    }
    // Sub_Sub_CategoryList
    sub_subcategoryList(data) {
        return this.http.post(`seller/get_sub_subcategory_list`, data);
    }
    BlockUnblockProduct(data) {
        return this.http.post(`seller/block_product`, data);
    }
    editProductSeller(data) {
        return this.http.post("seller/edit_product", data);
    }
    sortingProduct(data) {
        return this.http.post(`seller/sort_products`, data);
    }
    addStock(data) {
        return this.http.post(`seller/add_inventory`, data);
    }
    getinventryData() {
        return this.http.get('seller/get_inventory_list');
    }
    editMStock(data) {
        return this.http.post('seller/edit_inventory', data);
    }
    deleteInventory(id) {
        return this.http.post(`seller/delete_inventory`, {
            _id: id
        });
    }
    sortStock(data) {
        return this.http.post('seller/delete_inventory', data);
    }
    post(url, data) {
        return this.http.post('seller/' + url, data);
    }
    get(url) {
        return this.http.get('seller/' + url);
    }
    getNewOrderData() {
        return this.http.get('seller/new_order_list');
    }
    getLegal() {
        return this.http.get('seller/legal_page', { responseType: 'text' });
    }
    getPrivacy() {
        return this.http.get('seller/privacy_policy', { responseType: 'text' });
    }
    getTermsandCondition() {
        return this.http.get('seller/term_condition', { responseType: 'text' });
    }
    viewOrderdetails(data) {
        return this.http.post('seller/get_order_details', data);
    }
    getOngoingOrderData() {
        return this.http.get('seller/ongoing_order_list');
    }
    getPastOrderData() {
        return this.http.get('seller/past_order_list');
    }
};
AuthenticationService.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
AuthenticationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], AuthenticationService);



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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");




let UtilsService = class UtilsService {
    constructor(toast) {
        this.toast = toast;
        this.profile = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]('default');
        this.profileStatus = this.profile.asObservable();
    }
    /*storage*/
    set(key, data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    }
    get(key) {
        return JSON.parse(sessionStorage.getItem(key));
    }
    update(key, dataKey, data) {
        let BData = this.get(key);
        this.removeData(key);
        BData[dataKey] = data;
        window.localStorage.setItem(key, JSON.stringify(BData));
    }
    removeData(key) {
        window.localStorage.removeItem(key);
    }
    clear() {
        window.localStorage.clear();
    }
    /*toaster*/
    alert(type, msg) {
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
    }
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
    scrollToTop() {
        window.scrollTo(0, 0);
    }
    profileChanged(msg) {
        this.profile.next(msg);
    }
};
UtilsService.ctorParameters = () => [
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] }
];
UtilsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], UtilsService);



/***/ })

}]);
//# sourceMappingURL=default~layout-layout-module~shared-shared-module-es2015.js.map