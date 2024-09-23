function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["shared-shared-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/email-verification/email-verification.component.html": function node_modulesRawLoaderDistCjsJsSrcAppSharedEmailVerificationEmailVerificationComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-login-header></app-login-header>\n<!-- <app-left-sidebar></app-left-sidebar> -->\n<div class=\"layout-main\">\n    <div class=\"container\">\n        <div class=\"home-bg d-flex\">\n            <div class=\"left-section\" style=\"background-image: url('assets/img/login-bg.png');\">\n                <div class=\"login-bottom-text\">\n                    <h4>Become a DentSwift Partner</h4>\n                    <p>Login or create account to start selling</p>\n                </div>\n\n            </div>\n            <div class=\"form-section-section\">\n                <div class=\"login-middle\">\n                    <div class=\"login\">\n                        <div class=\"login-body\">\n\n                            <div class=\"login-form\">\n                                <!-- <div class=\"text-center\" style=\"margin-bottom: 40px;\">\n                                    <h4 class=\"form-title\">Welcome Back</h4>\n                                    <p class=\"form-sub-title\">Login to your account</p>\n                                </div> -->\n                                <form class=\"mt-5\"  [formGroup]=\"forgotPassForm\" (ngSubmit)=\"onSubmit()\">\n                                    <div class=\"form-group\">\n                                        <!-- <label class=\"req-field\">*Required fields</label> -->\n                                        <label>E-mail Address</label>\n                                        <input class=\"form-control\" type=\"email\" formControlName=\"email\" >\n\n                                    </div>\n                                    <div class=\"form-group text-center\" >\n                                        <h2 style=\"color: #8F8F8F;font-size: 18px;\">Or</h2>\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <!-- <label class=\"req-field\">*Required fields</label> -->\n                                        <label>Mobile Number </label>\n                                        <input class=\"form-control\"  onkeydown=\"return ( event.ctrlKey || event.altKey \n                                        || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) \n                                        || (95<event.keyCode && event.keyCode<106)\n                                        || (event.keyCode==8) || (event.keyCode==9) \n                                        || (event.keyCode>34 && event.keyCode<40) \n                                        || (event.keyCode==46) )\"  ng2TelInput [ng2TelInputOptions]=\"{initialCountry: 'ae'}\" (countryChange)=\"onCountryChange($event)\" type=\"text\" placeholder=\"Enter Mobile No.\" formControlName=\"mobile_number\">\n                                    </div>\n\n                                    <div class=\"form-group\">\n                                        <button class=\"btn btn-primary btn-block mt-5 mb-4 login-btn\" type=\"submit\">Send </button>\n                                    </div>\n                                    <!-- routerLink=\"/otp-verification\" -->\n                                    <!-- <div class=\"form-group\">\n                                        <p class=\"account-text text-center\">Don't have an account? <a routerLink=\"/sign-up\">Create an account</a></p>\n                                    </div> -->\n                                </form>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/forgot-password/forgot-password.component.html": function node_modulesRawLoaderDistCjsJsSrcAppSharedForgotPasswordForgotPasswordComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-login-header></app-login-header>\n<div class=\"layout-main\">\n    <div class=\"container\">\n        <div class=\"home-bg d-flex\">\n            <div class=\"left-section\" style=\"background-image: url('assets/img/login-bg.png');\">\n                <div class=\"login-bottom-text\">\n                    <h4>Become a DentSwift Partner</h4>\n                    <p>Login or create account to start selling</p>\n                </div>\n\n            </div>\n            <div class=\"form-section-section\">\n                <div class=\"login-middle\">\n                    <div class=\"login\">\n                        <div class=\"login-body\">\n\n                            <div class=\"login-form\">\n                                <div class=\"otp-verify-header\" style=\"margin-bottom: 40px;\">\n                                    <div class=\"mb-3\" routerLink=\"\">\n                                        <img src=\"assets/img/left-arrow.png\" alt=\"icon\" style=\"cursor: pointer;\" />\n                                    </div>\n                                    <h4 class=\"form-title\">Forget Password</h4>\n                                    <p class=\"form-sub-title\">OTP Sent to Registered mobile number</p>\n\n                                </div>\n                                <form class=\"mt-4\" [formGroup]=\"resetPassForm\" (ngSubmit)=\"onSubmit()\">\n                                    <div class=\"form-group mat-form-control\">\n                                        <label>Enter New Password</label>\n                                        <mat-form-field>\n                                            <div class=\"main-input\">\n                                                <input matInput placeholder=\"Password\" class=\"form-control\" [type]=\"hide ? 'password' : 'text'\" formControlName=\"newPassword\">\n                                                <mat-icon class=\"show-password\" matSuffix (click)=\"hide = !hide\">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>\n                                                <div *ngIf=\"submitted && f.newPassword.errors\" class=\"invalid-feedback\">\n                                                    <div *ngIf=\"f.newPassword.errors.required\">New password is required</div>\n                                                    <div *ngIf=\"f.newPassword.errors.minlength\"> Password must be at least 8 characters </div>\n                                                </div>\n                                            </div>\n\n                                        </mat-form-field>\n                                    </div>\n                                    <div class=\"form-group mat-form-control\">\n                                        <label>Re Enter Password</label>\n                                        <mat-form-field>\n                                            <div class=\"main-input\">\n                                                <input matInput placeholder=\"Password\" class=\"form-control\" [type]=\"hide1 ? 'password' : 'text'\" formControlName=\"confirmPassword\">\n                                                <mat-icon class=\"show-password\" matSuffix (click)=\"hide1 = !hide1\">{{hide1 ? 'visibility_off' : 'visibility'}}</mat-icon>\n                                                <div *ngIf=\"submitted && f.confirmPassword.errors\" class=\"invalid-feedback\">\n                                                    <div *ngIf=\"f.confirmPassword.errors.required\">Confirm password is required</div>\n                                                    <div *ngIf=\"f.confirmPassword.errors.minlength\"> Password must be at least 8 characters </div>\n                                                </div>\n                                            </div>\n\n                                        </mat-form-field>\n                                    </div>\n\n                                    <!-- <div class=\"form-group\">\n                                        <div class=\"otp-verify-header\">\n                                            <h5 class=\"top-bottom-text\">Enter OTP</h5>\n                                        </div>\n                                    </div> -->\n\n                                    <!-- <div class=\"form-group otp-verify\">\n                                        <input type=\"text\" (keypress)=\"keyPress($event)\" onkeypress=\"return event.charCode >= 48 && event.charCode <=57\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input type=\"text\" (keypress)=\"keyPress($event)\" onkeypress=\"return event.charCode >= 48 && event.charCode <=57\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input type=\"text\" (keypress)=\"keyPress($event)\" onkeypress=\"return event.charCode >= 48 && event.charCode <=57\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input type=\"text\" (keypress)=\"keyPress($event)\" onkeypress=\"return event.charCode >= 48 && event.charCode <=57\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                    </div>\n                                    <div class=\"form-group clearfix\">\n                                        <p class=\"text-center\" style=\"color: #202020;\"> Don't receive the OTP? &nbsp;<a href=\"javascript:void(0)\" class=\"text-center\">RESEND OTP</a></p>\n                                     \n                                    </div> -->\n                                    <div class=\"form-group\">\n                                        <button class=\"btn btn-primary btn-block mt-5 mb-4 login-btn\" type=\"submit\">CHANGE PASSWORD</button>\n                                    </div>\n                                    <!-- routerLink=\"/login\" -->\n                                </form>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/login/login.component.html": function node_modulesRawLoaderDistCjsJsSrcAppSharedLoginLoginComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-login-header></app-login-header>\n<!-- <app-left-sidebar></app-left-sidebar> -->\n<div class=\"layout-main\">\n    <div class=\"container\">\n        <div class=\"home-bg d-flex\">\n            <div class=\"left-section\" style=\"background-image: url('assets/img/login-bg.png')\">\n                <div class=\"login-bottom-text\">\n                    <h4>Become a DentSwift Partner</h4>\n                    <p>Login or create account to start selling</p>\n                </div>\n            </div>\n            <div class=\"form-section-section\">\n                <div class=\"login-middle\">\n                    <div class=\"login\">\n                        <div class=\"login-body\">\n                            <ul class=\"login-list\">\n                                <li>\n                                    <a href=\"javascript:void(0)\" class=\"active\">LOGIN</a>\n                                </li>\n                                <li>\n                                    <a routerLink=\"/sign-up\">CREATE ACCOUNT</a>\n                                </li>\n                            </ul>\n                            <div class=\"login-form\">\n                                <div class=\"text-center\" style=\"margin-bottom: 40px\">\n                                    <h4 class=\"form-title\"> Login to Merchant Pass</h4>\n                                    <!-- <p class=\"form-sub-title\">Login to your account</p> -->\n                                </div>\n                                <form class=\"mt-4\" [formGroup]=\"loginForm\">\n                                    <div class=\"form-group\">\n                                        <!-- <label class=\"req-field\">*Required fields</label> -->\n                                        <!-- <label>E-mail/Mobile Number</label> -->\n                                        <label>E-mail</label>\n                                        <input class=\"form-control\" type=\"email\" formControlName=\"email\" />\n                                        <div *ngIf=\"submitted && f.email.errors\" class=\"invalid-feedback\">\n                                            <div *ngIf=\"f.email.errors.required\">\n                                                Email or Mobile no. is required\n                                            </div>\n                                            <!-- <div *ngIf=\"f.email.errors.email\">\n                                                Email must be a valid email address\n                                            </div> -->\n                                        </div>\n                                    </div>\n\n                                    <div class=\"form-group mat-form-control\">\n                                        <label>Password</label>\n\n                                        <div class=\"main-input\">\n                                            <input placeholder=\"Password\" placeholder=\"\" class=\"form-control\" [type]=\"hide ? 'password' : 'text'\" formControlName=\"password\" />\n                                            <mat-icon class=\"show-password\" matSuffix (click)=\"hide = !hide\">{{ hide ? \"visibility_off\" : \"visibility\" }}</mat-icon>\n                                            <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n                                                <div *ngIf=\"f.password.errors.required\">\n                                                    Password is required\n                                                </div>\n                                                <div *ngIf=\"f.password.errors.minlength\">\n                                                    Password must be at least 7 characters\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group remember-home\">\n                                        <div class=\"remember_me\">\n                                            <input type=\"checkbox\" class=\"checkbox\" checked=\"checked\" id=\"remember_me\" />\n                                            <label for=\"remember_me\">Remember</label>\n                                        </div>\n                                        <a routerLink=\"/email-verification\" class=\"pull-right\">Forgot password?</a\n                    >\n                  </div>\n                  <div class=\"form-group\">\n                    <button\n                      class=\"btn btn-primary btn-block mt-5 mb-4 login-btn\"\n                      type=\"submit\"\n                      (click)=\"onSubmit()\"\n                    >\n                      Login\n                      <span class=\"ml-2\"\n                        ><img src=\"assets/img/login-icon.png\" alt=\"icon\"\n                      /></span>\n                    </button>\n                  </div>\n\n                  <!-- <div class=\"form-group\">\n                                        <p class=\"account-text text-center\">Don't have an account? <a routerLink=\"/sign-up\">Create an account</a></p>\n                                    </div> -->\n                                </form>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- <div class=\"row\">\n\n\n                <div class=\"col-lg-6 col-md-6\">\n\n                </div>\n                <div class=\"col-lg-6 col-md-6\">\n\n                </div>\n            </div> -->\n        </div>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/otp-password-verification/otp-password-verification.component.html": function node_modulesRawLoaderDistCjsJsSrcAppSharedOtpPasswordVerificationOtpPasswordVerificationComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-login-header></app-login-header>\n<div class=\"layout-main\">\n    <div class=\"container\">\n        <div class=\"home-bg d-flex\">\n            <div class=\"left-section\" style=\"background-image: url('assets/img/login-bg.png');\">\n                <div class=\"login-bottom-text\">\n                    <h4>Become a DentSwift Partner</h4>\n                    <p>Login or create account to start selling</p>\n                </div>\n\n            </div>\n            <div class=\"form-section-section\">\n                <div class=\"login-middle\">\n                    <div class=\"login\">\n                        <div class=\"login-body\">\n\n                            <div class=\"login-form\">\n                                <div class=\"otp-verify-header\" style=\"margin-bottom: 40px;\">\n                                    <h4 class=\"form-title\">User Verification</h4>\n                                    <p class=\"form-sub-title\">OTP Sent to Registered mobile number/email address</p>\n                                    <h5 class=\"top-bottom-text\">Mobile Verification</h5>\n                                </div>\n                                <form class=\"mt-4\" (ngSubmit)=\"verifyOtp()\" [formGroup]=\"otpform\">\n                                    <div class=\"form-group otp-verify\">\n                                        <!-- <input type=\"text\" (keypress)=\"keyPress($event)\" onkeypress=\"return event.charCode >= 48 && event.charCode <=57\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input type=\"text\" (keypress)=\"keyPress($event)\" onkeypress=\"return event.charCode >= 48 && event.charCode <=57\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input type=\"text\" (keypress)=\"keyPress($event)\" onkeypress=\"return event.charCode >= 48 && event.charCode <=57\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input type=\"text\" (keypress)=\"keyPress($event)\" onkeypress=\"return event.charCode >= 48 && event.charCode <=57\" class=\"form-control otp\" name=\"\" maxlength=\"1\"> -->\n                                        <!-- [(ngModel)]=\"otp1\"  -->\n                                        <input autocomplete=\"off\" id='1' type=\"text\" (keyup)=\"movetoNext($event , 1)\" name=\"otp1\" formControlName=\"otp1\" onkeydown=\"return ( event.ctrlKey || event.altKey \n                                                        || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) \n                                                        || (95<event.keyCode && event.keyCode<106)\n                                                        || (event.keyCode==8) || (event.keyCode==9) \n                                                        || (event.keyCode>34 && event.keyCode<40) \n                                                        || (event.keyCode==46) )\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input autocomplete=\"off\" id='2' type=\"text\" (keyup)=\"movetoNext($event , 2)\" name=\"otp2\" formControlName=\"otp2\" onkeydown=\"return ( event.ctrlKey || event.altKey \n                                                        || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) \n                                                        || (95<event.keyCode && event.keyCode<106)\n                                                        || (event.keyCode==8) || (event.keyCode==9) \n                                                        || (event.keyCode>34 && event.keyCode<40) \n                                                        || (event.keyCode==46) )\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input autocomplete=\"off\" id='3' type=\"text\" (keyup)=\"movetoNext($event , 3)\" name=\"otp3\" formControlName=\"otp3\" onkeydown=\"return ( event.ctrlKey || event.altKey \n                                                        || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) \n                                                        || (95<event.keyCode && event.keyCode<106)\n                                                        || (event.keyCode==8) || (event.keyCode==9) \n                                                        || (event.keyCode>34 && event.keyCode<40) \n                                                        || (event.keyCode==46) )\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input autocomplete=\"off\" id='4' type=\"text\" (keyup)=\"movetoNext($event , 4)\" name=\"otp4\" formControlName=\"otp4\" onkeydown=\"return ( event.ctrlKey || event.altKey \n                                                        || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) \n                                                        || (95<event.keyCode && event.keyCode<106)\n                                                        || (event.keyCode==8) || (event.keyCode==9) \n                                                        || (event.keyCode>34 && event.keyCode<40) \n                                                        || (event.keyCode==46) )\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                    </div>\n                                    <div class=\"form-group clearfix\">\n                                        <p class=\"text-center\" style=\"color: #202020;\"> Don't receive the OTP? &nbsp;<a href=\"javascript:void(0)\" class=\"text-center\" (click)=\"resendOtp()\">RESEND OTP</a></p>\n                                        <p class=\"text-center\" style=\"color: #666667;font-size: 12px;\">00:58 sec</p>\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <button class=\"btn btn-primary btn-block mt-5 mb-4 login-btn\" type=\"submit\">VERIFY</button>\n                                    </div>\n                                    <!-- routerLink=\"/forgot-password\" -->\n                                    <!-- routerLink=\"/register\" -->\n                                    <p class=\"text-center\">\n                                        <a href=\"javascript:void(0)\" style=\"text-decoration: underline;\" (click)=\"sendEmailVerification()\">Email Verification</a>\n                                    </p>\n\n                                    <!-- <div class=\"form-group\">\n                                        <p class=\"account-text text-center\">Don't have an account? <a routerLink=\"/sign-up\">Create an account</a></p>\n                                    </div> -->\n                                </form>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/otp-verification/otp-verification.component.html": function node_modulesRawLoaderDistCjsJsSrcAppSharedOtpVerificationOtpVerificationComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-login-header></app-login-header>\n<div class=\"layout-main\">\n    <div class=\"container\">\n        <div class=\"home-bg d-flex\">\n            <div class=\"left-section\" style=\"background-image: url('assets/img/login-bg.png');\">\n                <div class=\"login-bottom-text\">\n                    <h4>Become a DentSwift Partner</h4>\n                    <p>Login or create account to start selling</p>\n                </div>\n\n            </div>\n            <div class=\"form-section-section\">\n                <div class=\"login-middle\">\n                    <div class=\"login\">\n                        <div class=\"login-body\">\n\n                            <div class=\"login-form\">\n                                <div class=\"otp-verify-header\" style=\"margin-bottom: 40px;\">\n                                    <h4 class=\"form-title\">User Verification</h4>\n                                    <p class=\"form-sub-title\">OTP Sent to Registered mobile number/email address</p>\n                                    <h5 class=\"top-bottom-text\">Mobile Verification</h5>\n                                </div>\n                                <form class=\"mt-4\" (ngSubmit)=\"verifyOtp()\" [formGroup]=\"otpform\">\n                                    <div class=\"form-group otp-verify\">\n                                        <!-- <input type=\"text\" (keypress)=\"keyPress($event)\" onkeypress=\"return event.charCode >= 48 && event.charCode <=57\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input type=\"text\" (keypress)=\"keyPress($event)\" onkeypress=\"return event.charCode >= 48 && event.charCode <=57\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input type=\"text\" (keypress)=\"keyPress($event)\" onkeypress=\"return event.charCode >= 48 && event.charCode <=57\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input type=\"text\" (keypress)=\"keyPress($event)\" onkeypress=\"return event.charCode >= 48 && event.charCode <=57\" class=\"form-control otp\" name=\"\" maxlength=\"1\"> -->\n                                        <!-- [(ngModel)]=\"otp1\"  -->\n                                        <input autocomplete=\"off\" id='1' type=\"text\" (keyup)=\"movetoNext($event , 1)\" name=\"otp1\" formControlName=\"otp1\" onkeydown=\"return ( event.ctrlKey || event.altKey \n                                                        || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) \n                                                        || (95<event.keyCode && event.keyCode<106)\n                                                        || (event.keyCode==8) || (event.keyCode==9) \n                                                        || (event.keyCode>34 && event.keyCode<40) \n                                                        || (event.keyCode==46) )\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input autocomplete=\"off\" id='2' type=\"text\" (keyup)=\"movetoNext($event , 2)\" name=\"otp2\" formControlName=\"otp2\" onkeydown=\"return ( event.ctrlKey || event.altKey \n                                                        || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) \n                                                        || (95<event.keyCode && event.keyCode<106)\n                                                        || (event.keyCode==8) || (event.keyCode==9) \n                                                        || (event.keyCode>34 && event.keyCode<40) \n                                                        || (event.keyCode==46) )\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input autocomplete=\"off\" id='3' type=\"text\" (keyup)=\"movetoNext($event , 3)\" name=\"otp3\" formControlName=\"otp3\" onkeydown=\"return ( event.ctrlKey || event.altKey \n                                                        || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) \n                                                        || (95<event.keyCode && event.keyCode<106)\n                                                        || (event.keyCode==8) || (event.keyCode==9) \n                                                        || (event.keyCode>34 && event.keyCode<40) \n                                                        || (event.keyCode==46) )\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                        <input autocomplete=\"off\" id='4' type=\"text\" (keyup)=\"movetoNext($event , 4)\" name=\"otp4\" formControlName=\"otp4\" onkeydown=\"return ( event.ctrlKey || event.altKey \n                                                        || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) \n                                                        || (95<event.keyCode && event.keyCode<106)\n                                                        || (event.keyCode==8) || (event.keyCode==9) \n                                                        || (event.keyCode>34 && event.keyCode<40) \n                                                        || (event.keyCode==46) )\" class=\"form-control otp\" name=\"\" maxlength=\"1\">\n                                    </div>\n                                    <div class=\"form-group clearfix\">\n                                        <p class=\"text-center\" style=\"color: #202020;\"> Don't receive the OTP? &nbsp;<a href=\"javascript:void(0)\" class=\"text-center\" (click)=\"resendOtp()\">RESEND OTP</a></p>\n                                        <p class=\"text-center\" style=\"color: #666667;font-size: 12px;\">00:{{timeLeft}}</p>\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <button class=\"btn btn-primary btn-block mt-5 mb-4 login-btn\" type=\"submit\">VERIFY</button>\n                                    </div>\n                                    <!-- routerLink=\"/forgot-password\" -->\n                                    <!-- routerLink=\"/register\" -->\n                                    <!-- <p class=\"text-center\">\n                                        <a href=\"javascript:void(0)\" style=\"text-decoration: underline;\" (click)=\"sendEmailVerification()\">Email Verification</a>\n                                    </p> -->\n\n                                    <!-- <div class=\"form-group\">\n                                        <p class=\"account-text text-center\">Don't have an account? <a routerLink=\"/sign-up\">Create an account</a></p>\n                                    </div> -->\n                                </form>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/payment-details/payment-details.component.html": function node_modulesRawLoaderDistCjsJsSrcAppSharedPaymentDetailsPaymentDetailsComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<!-- <app-header></app-header> -->\n<app-login-header></app-login-header>\n\n<div class=\"layout-main\">\n    <div class=\"container\">\n        <div class=\"home-bg d-flex\">\n            <div class=\"left-section\" style=\"background-image: url('assets/img/login-bg.png');\">\n                <div class=\"login-bottom-text\">\n                    <h4>Become a DentSwift Partner</h4>\n                    <p>Login or create account to start selling</p>\n                </div>\n\n            </div>\n            <div class=\"form-section-section\">\n                <div class=\"login-middle\">\n                    <div class=\"login\">\n                        <div class=\"login-body\">\n\n                            <div class=\"login-form\">\n                                <div class=\"otp-verify-header\" style=\"margin-bottom: 10px;\">\n                                    <div class=\"mb-3\" style=\"display: flex;align-items: center;\">\n                                        <p style=\"width: 100%;\" routerLink=\"/register\"> <img src=\"assets/img/left-arrow.png\" alt=\"icon\" style=\"cursor: pointer;\" /></p>\n                                        <p style=\"color: #666667;font-size: 13px;\">3/5</p>\n                                    </div>\n                                    <h4 class=\"form-title\">Enter Payment Details</h4>\n                                    <p class=\"form-sub-title\">Pay to business plan.</p>\n\n                                </div>\n                                <form class=\"mt-4\">\n                                    <div class=\"row\">\n                                        <div class=\"col-lg-12 mb-5\">\n                                            <div class=\"remember_me payCheque\">\n                                                <input type=\"radio\" class=\"checkbox\" name=\"card\" checked=\"checked\" id=\"cash\">\n                                                <label for=\"cash\">Pay Cheque / Cash</label>\n                                            </div>\n                                            <div class=\"remember_me pay_debit_card\">\n                                                <input type=\"radio\" class=\"checkbox\" name=\"card\" id=\"card\">\n                                                <label for=\"card\">Pay Debit Card / Credit Card</label>\n                                            </div>\n                                        </div>\n                                        <div class=\"col-lg-12\">\n\n                                        </div>\n                                        <!-- <div class=\"col-lg-12\">\n                                            <ul class=\"payment-list\">\n                                                <li><a href=\"javascript:void(0)\" class=\"active\">Pay Cheque / Cash</a></li>\n                                                <li><a href=\"javascript:void(0)\">Pay Debit Card / Credit Card</a></li>\n                                            </ul>\n                                        </div> -->\n                                    </div>\n                                    <div class=\"payment-form\">\n                                        <div class=\"form-group\">\n                                            <label>Card Number</label>\n                                            <input type=\"text\" class=\"form-control\"  />\n                                        </div>\n                                        <div class=\"form-group\">\n                                            <label>Account Holder</label>\n                                            <input type=\"text\" class=\"form-control\" placeholder=\"Doe John\" />\n                                        </div>\n                                        <div class=\"form-group\">\n                                            <label>Exp. Date</label>\n                                            <input type=\"text\" id=\"start_date\" class=\"form-control\" placeholder=\"MM - YYYY\" />\n                                        </div>\n                                        <div class=\"form-group\">\n                                            <label>CVV No.</label>\n                                            <input type=\"text\" class=\"form-control\" placeholder=\"\" />\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <button class=\"btn btn-primary btn-block mt-5 mb-4 login-btn\" type=\"submit\" routerLink=\"/home/dashboard\"> PROCEED</button>\n                                        <!-- data-target=\"#success-modal\" data-toggle=\"modal\" -->\n                                    </div>\n                                </form>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n\n\n<!-- Success modal start -->\n<div class=\"modal fade custom-modal\" id=\"success-modal\" role=\"dialog\">\n    <div class=\"modal-dialog  modal-dialog-centered modal-sm\">\n        <div class=\"modal-content\">\n            <!-- <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n                  <img src=\"assets/img/close_cross.png\" alt=\"icon\" />\n              </button>\n            </div> -->\n            <div class=\"modal-body\">\n                <div class=\"row\">\n                    <div class=\"col-md-12 text-center mb-4\">\n                        <img src=\"assets/img/tick.png\" alt=\"image\" />\n                    </div>\n                    <div class=\"col-md-12\">\n                        <h4 class=\"modal-title text-center\">Payment Success, Welcome To DentSwift</h4>\n                        <p class=\"modal-txt text-center\">Thank you for registration. Your account will be activated after verification.</p>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- Success modal start -->";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/register/register.component.html": function node_modulesRawLoaderDistCjsJsSrcAppSharedRegisterRegisterComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-login-header></app-login-header>\n<div class=\"layout-main\">\n    <div class=\"container\">\n        <div class=\"home-bg d-flex align-items-center\">\n            <!-- <div class=\"left-section\" style=\"background-image: url('assets/img/login-bg.png');\">\n                <div class=\"login-bottom-text\">\n                    <h4>Become a DentSwift Partner</h4>\n                    <p>Login or create account to start selling</p>\n                </div>\n\n            </div> -->\n            <div class=\"form-section-section\">\n                <div class=\"login-middle\">\n                    <div class=\"login\">\n                        <div class=\"login-body\">\n                            <!-- /* */ -->\n                            <form class=\"mt-4\"  [formGroup]=\"profileDetailsForm\" >\n                                <div class=\"login-form\">\n                                    <div class=\"row\">\n                                        <div class=\"col-12 col-sm-12 col-md-8 col-lg-8\">\n                                            <div class=\"row\">\n                                                <div class=\"col-12 col-lg-12\">\n                                                    <div class=\"otp-verify-header\" style=\"margin-bottom: 30px;\">\n                                                        <div class=\"mb-5\">\n                                                            <img class=\"mr-2\" routerLink=\"/sign-up\" src=\"assets/img/left-arrow.png\" alt=\"icon\" style=\"cursor: pointer;\" /> Kindly fill all required fields to register with DentSwift Merchant Pass\n                                                        </div>\n                                                        <h4 class=\"form-title\">Registration</h4>\n                                                        <p class=\"form-sub-title\">Provide your Registration</p>\n\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>First Name</label>\n                                                        <input type=\"text\" class=\"form-control\" placeholder=\"\"  onkeypress=\"return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode==32)\" formControlName=\"first_name\" [ngClass]=\"{ 'is-invalid': submitted && f.first_name.errors }\" value={{sellerData?.first_name}} />\n                                                        <div *ngIf=\"submitted && f.first_name.errors\" class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.first_name.errors.required\">First name is required</div>\n                                                        </div>\n                                                    </div>\n\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>Last Name</label>\n                                                        <input type=\"text\" class=\"form-control\" placeholder=\"\"  onkeypress=\"return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode==32)\" formControlName=\"last_name\" [ngClass]=\"{ 'is-invalid': submitted && f.last_name.errors }\"  value={{sellerData?.last_name}} />\n                                                        <div *ngIf=\"submitted && f.last_name.errors\" class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.last_name.errors.required\">Last name is required</div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>Mobile Number</label>\n                                                        <input type=\"text\" onkeydown=\"return ( event.ctrlKey || event.altKey \n                                                        || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) \n                                                        || (95<event.keyCode && event.keyCode<106)\n                                                        || (event.keyCode==8) || (event.keyCode==9) \n                                                        || (event.keyCode>34 && event.keyCode<40) \n                                                        || (event.keyCode==46) )\"  ng2TelInput [ng2TelInputOptions]=\"{initialCountry: 'ae'}\" (countryChange)=\"onCountryChange($event)\" (intlTelInputObject)=\"telInputObject($event)\"class=\"form-control\" placeholder=\"\" formControlName=\"mobile_number\" [ngClass]=\"{ 'is-invalid': submitted && f.mobile_number.errors }\"  value={{sellerData?.mobile_number}} />\n                                                        <div *ngIf=\"submitted && f.mobile_number.errors\" class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.mobile_number.errors.required\">Mobile number is required</div>\n                                                            <div *ngIf=\"f.mobile_number.errors.minlength\">Mobile number length must be between 8 - 12 characters</div>\n                                                            <div *ngIf=\"f.mobile_number.errors.maxlength\">Mobile number length must be between 8 - 12 characters</div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>Landline Number</label>\n                                                        <input type=\"text\" class=\"form-control\" onkeydown=\"return ( event.ctrlKey || event.altKey \n                                                        || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) \n                                                        || (95<event.keyCode && event.keyCode<106)\n                                                        || (event.keyCode==8) || (event.keyCode==9) \n                                                        || (event.keyCode>34 && event.keyCode<40) \n                                                        || (event.keyCode==46) )\"  placeholder=\"\" formControlName=\"landline_no\" [ngClass]=\"{ 'is-invalid': submitted && f.landline_no.errors }\" value={{sellerData?.landline_no}} />\n                                                        <!-- <div *ngIf=\"submitted && f.landline_no.errors\" class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.landline_no.errors.required\">Mobile number is required</div>\n                                                        </div> -->\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>Email Address</label>\n                                                        <input type=\"email\" class=\"form-control\" placeholder=\"\"  formControlName=\"email\" [ngClass]=\"{ 'is-invalid': submitted && f.email.errors }\" value={{sellerData?.email}} />\n                                                        <div *ngIf=\"submitted && f.email.errors\" class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.email.errors.required\">Email is required</div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>  Manager/Director Email</label>\n                                                        <input type=\"email\" class=\"form-control\" placeholder=\"\" formControlName=\"authorized_signatory_email\" [ngClass]=\"{ 'is-invalid': submitted && f.authorized_signatory_email.errors }\" value={{sellerData?.authorized_signatory_email}} />\n                                                        <div *ngIf=\"submitted && f.authorized_signatory_email.errors\" class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.authorized_signatory_email.errors.required\"> Manager/Director Email</div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <!-- <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>Enter New Password</label>\n                                                        <mat-form-field>\n                                                            <div class=\"main-input\">\n                                                                <input matInput placeholder=\"Password\" class=\"form-control\" [type]=\"hide ? 'password' : 'text'\" formControlName=\"password\" [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\"  />\n                                                                <mat-icon class=\"show-password\" matSuffix (click)=\"hide = !hide\">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>\n                                                                <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n                                                                    <div *ngIf=\"f.password.errors.required\">New password is required</div>\n                                                                    <div *ngIf=\"f.password.errors.minLength\">New password must be at least 8 characters</div>\n                                                                </div>\n                                                            </div>\n\n                                                        </mat-form-field>\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>Re Enter Password</label>\n                                                        <mat-form-field>\n                                                            <div class=\"main-input\">\n                                                                <input matInput placeholder=\"Password\" class=\"form-control\" [type]=\"hide1 ? 'password' : 'text'\" formControlName=\"confirmPassword\" [ngClass]=\"{ 'is-invalid': submitted && f.confirmPassword.errors }\" />\n                                                                <mat-icon class=\"show-password\" matSuffix (click)=\"hide1 = !hide1\">{{hide1 ? 'visibility_off' : 'visibility'}}</mat-icon>\n                                                                <div *ngIf=\"submitted && f.confirmPassword.errors\" class=\"invalid-feedback\">\n                                                                    <div *ngIf=\"f.confirmPassword.errors.required\">Confirm password is required</div>\n                                                                    <div *ngIf=\"f.confirmPassword.errors.minLength\">Confirm password must be at least 8 characters</div>\n                                                                </div>\n                                                            </div>\n\n                                                        </mat-form-field>\n                                                    </div>\n                                                </div> -->\n                                            </div>\n                                            <div class=\"row\">\n                                                <div class=\"col-12 col-lg-12\">\n                                                    <div class=\"otp-verify-header\" style=\"margin-bottom: 30px;\">\n\n                                                        <h4 class=\"form-title\"> Merchant/Business Details</h4>\n                                                        <p class=\"form-sub-title\">Provide your  Merchant/Business Details</p>\n\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label> Merchant/Business Name</label>\n                                                        <input type=\"text\" class=\"form-control\" placeholder=\"\"  onkeypress=\"return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode==32)\" formControlName=\"store_name\" [ngClass]=\"{ 'is-invalid': submitted && f.store_name.errors }\" value={{sellerData?.store_name}} />\n                                                        <div *ngIf=\"submitted && f.store_name.errors\" class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.store_name.errors.required\"> Merchant/Business name is required</div>\n                                                        </div>\n                                                    </div>\n\n                                                </div>\n                                                <!-- <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>Store/Business Name</label>\n                                                        <input type=\"text\" class=\"form-control\" placeholder=\"AS PER THE TRADING LICENSE\" />\n                                                    </div>\n\n                                                </div> -->\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label> Merchant Business Type</label>\n                                                        <!-- <input type=\"text\" class=\"form-control\" placeholder=\"\"  onkeypress=\"return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode==32)\" formControlName=\"store_business_type\" [ngClass]=\"{ 'is-invalid': submitted && f.store_business_type.errors }\" value={{sellerData?.store_business_type}} />\n                                                        <div *ngIf=\"submitted && f.store_business_type.errors\" class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.store_business_type.errors.required\">business type is required</div>\n                                                        </div> -->\n                                                        <select class=\"form-control\" formControlName=\"store_business_type\">\n                                                            <!-- <option value=\"\">Choose</option> -->\n                                                            <option value=\"  Manufacturer\">  Manufacturer</option>\n                                                            <option value=\"Authorized Dental Agent\">Authorized Dental Agent</option> \n                                                            <option value=\"  Dental Distribution\">  Dental Distribution</option>\n                                                            <option value=\"  Product Retailer\">  Product Retailer</option>\n                                                            <option value=\"  Dental Laboratory\">  Dental Laboratory</option>\n                                                            <option value=\"  Product Retailer\">  Product Retailer</option>\n                                                            <option value=\"   Educational institution\">   Educational institution</option>\n                                                        </select>\n\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label> Merchant commercial name</label>\n                                                        <input type=\"text\" class=\"form-control\" placeholder=\"\"  onkeypress=\"return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode==32)\" formControlName=\"store_commercial_name\" [ngClass]=\"{ 'is-invalid': submitted && f.store_commercial_name.errors }\" value={{sellerData?.store_commercial_name}} />\n                                                        <div *ngIf=\"submitted && f.store_commercial_name.errors\" class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.store_commercial_name.errors.required\"> commercial name is required</div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>Address\n                                                        </label>\n                                                        <input type=\"text\" class=\"form-control\" placeholder=\"\"  formControlName=\"store_address\" [ngClass]=\"{ 'is-invalid': submitted && f.store_address.errors }\" value={{sellerData?.store_address}} />\n                                                        <div *ngIf=\"submitted && f.store_address.errors\" class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.store_address.errors.required\">address is required</div>\n                                                        </div>\n                                                    </div>\n\n                                                </div>\n\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>Country</label>\n                                                       <select class=\"form-control\"\n                                                            (change)=\"countryChange($event)\"\n                                                            formControlName=\"store_country\"\n                                                            [ngClass]=\"{'is-invalid': submitted && f.store_country.errors}\">\n                                                            <option></option>\n                                                            <option value=\"\" selected disabled>Select Country</option>\n                                                            <option *ngFor=\"let c of country_list; let i = index\" id=\"{{c.isoCode}}\" value=\"{{c.name}}\">\n                                                                {{c.name}}\n                                                            </option>\n                                                        </select>\n                                                        <div *ngIf=\"submitted && f.store_country.errors\"\n                                                            class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.store_country.errors.required\">Country is\n                                                                required.</div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>City</label>\n                                                        <select class=\"form-control\" formControlName=\"store_city\"\n                                                            [ngClass]=\"{'is-invalid': submitted && f.store_city.errors}\">\n                                                            <option></option>\n                                                            <option selected disabled value=\"\">Select City</option>\n                                                            <option *ngFor=\"let c of city_list\" value=\"{{c.name}}\">\n                                                                {{c.name}}</option>\n                                                        </select>\n                                                        <div *ngIf=\"submitted && f.store_city.errors\"\n                                                            class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.store_city.errors.required\">City is\n                                                                required.\n                                                            </div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-12 col-lg-12\">\n                                                    <div class=\"form-group mb-4\">\n                                                        <hr class=\"mb-5 mt-2\">\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <!-- <div class=\"form-group main-input\"> -->\n                                                    <div class=\"form-group\">\n                                                        <label> Upload  Trading License</label>\n                                                        <div>\n                                                            <input *ngIf = \"!name\" type=\"text\" class=\"form-control inputbox1\" placeholder=\"\">\n                                                            <input *ngIf = \"name\" type=\"text\" class=\"form-control inputbox1\" placeholder=\"\" value={{name}}>\n                                                            <div class=\"input-right-section\">\n                                                                <img src=\"assets/img/upload-file.png\" alt=\"icon\" /> Upload\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"input-right-section\" style=\"width: 100px;\">\n                                                            <input type=\"file\" class=\"form-control\" placeholder=\"\" style=\"opacity: 0;\" (change)=\"upload_store_trading_license($event)\"  formControlName=\"store_trading_license\" />\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <!-- <div class=\"form-group main-input\"> -->\n                                                    <div class=\"form-group\">\n                                                        <label>Upload Photo ID</label>\n                                                        <div>\n                                                            <input *ngIf = \"!signatoryId\" type=\"text\" class=\"form-control inputbox1\" placeholder=\"\">\n                                                            <input *ngIf = \"signatoryId\" type=\"text\" class=\"form-control inputbox1\" placeholder=\"\" value={{signatoryId}}>\n                                                            <div class=\"input-right-section\">\n                                                                <img src=\"assets/img/upload-file.png\" alt=\"icon\" /> Upload\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"input-right-section\" style=\"width: 100px;\">\n                                                            <input type=\"file\" class=\"form-control\" placeholder=\"\" style=\"opacity: 0;\" (change)=\"upload_store_signatory_id($event)\"  formControlName=\"store_signatory_id\"  />\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <!-- <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label> Upload Signatory Emirated ID Number</label>\n                                                        <div>\n                                                            <input *ngIf = \"!vatCertificate\" type=\"text\" class=\"form-control inputbox1\" placeholder=\"\">\n                                                            <input *ngIf = \"vatCertificate\" type=\"text\" class=\"form-control inputbox1\" placeholder=\"\" value={{vatCertificate}}>\n                                                            <div class=\"input-right-section\">\n                                                                <img src=\"assets/img/upload-file.png\" alt=\"icon\" /> Upload\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"input-right-section\" style=\"width: 100px;\">\n                                                            <input type=\"file\" class=\"form-control\" placeholder=\"\" style=\"opacity: 0;\"  (change)=\"upload_store_vat_certificate($event)\"  formControlName=\"store_signatory_number\" />\n                                                        </div>\n                                                    </div>\n                                                </div> -->\n                                            </div>\n                                            <div class=\"row\">\n                                                <div class=\"col-12 col-lg-12\">\n                                                    <div class=\"otp-verify-header\" style=\"margin-bottom: 30px;\">\n\n                                                        <h4 class=\"form-title\">Bank Details</h4>\n                                                        <p class=\"form-sub-title\">Provide your bank details</p>\n\n                                                    </div>\n                                                </div>\n\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>Account Number/IBAN</label>\n                                                        <input type=\"text\" class=\"form-control\"   placeholder=\"\"  formControlName=\"account_number\" [ngClass]=\"{ 'is-invalid': submitted && f.account_number.errors }\" />\n                                                        <div *ngIf=\"submitted && f.account_number.errors\" class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.account_number.errors.required\">Account number is required</div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>Account Name</label>\n                                                        <input type=\"text\" class=\"form-control\"  onkeypress=\"return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode==32)\" placeholder=\"\"  formControlName=\"account_holder_name\" [ngClass]=\"{ 'is-invalid': submitted && f.account_holder_name.errors }\" />\n                                                        <div *ngIf=\"submitted && f.account_holder_name.errors\" class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.account_holder_name.errors.required\">Account holder name is required</div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>Bank Name</label>\n                                                        <input type=\"text\" class=\"form-control\"  onkeypress=\"return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode==32)\" (keydown)=\"nameEvent($event)\" placeholder=\"\" formControlName=\"bank_name\" [ngClass]=\"{ 'is-invalid': submitted && f.bank_name.errors }\" />\n                                                        <div *ngIf=\"submitted && f.bank_name.errors\" class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.bank_name.errors.required\">Bank name is required</div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <div class=\"form-group\">\n                                                        <label>Swift Code</label>\n                                                        <input type=\"text\" class=\"form-control\" placeholder=\"\" formControlName=\"swift_code\" [ngClass]=\"{ 'is-invalid': submitted && f.swift_code.errors }\"  />\n                                                        <div *ngIf=\"submitted && f.swift_code.errors\" class=\"invalid-feedback\">\n                                                            <div *ngIf=\"f.swift_code.errors.required\">Swift code is required</div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-12 col-sm-12 col-md-6 col-lg-6\">\n                                                    <!-- <div class=\"form-group main-input\"></div> -->\n                                                    <div class=\"form-group\">\n                                                        <label>Upload IBAN Certificate</label>\n                                                        <div>\n                                                            <input *ngIf = \"!ibanCert\" type=\"text\" class=\"form-control inputbox1\" placeholder=\"\">\n                                                            <input *ngIf = \"ibanCert\" type=\"text\" class=\"form-control inputbox1\" placeholder=\"\" value={{ibanCert}}>\n                                                            <div class=\"input-right-section\">\n                                                                <img src=\"assets/img/upload-file.png\" alt=\"icon\" /> Upload\n                                                            </div>\n                                                        </div>\n                                                        <div class=\"input-right-section\" style=\"width: 100px;\">\n                                                            <input type=\"file\" class=\"form-control\" placeholder=\"\" style=\"opacity: 0;\" (change)=\"upload_iban_certificate($event)\"  formControlName=\"iban_certificate\"   />\n                                                        </div>\n                                                    </div>\n\n                                                </div>\n\n                                            </div>\n                                            <div class=\"row\">\n                                                <div class=\"col-12 col-lg-12\">\n                                                    <div class=\"otp-verify-header\" style=\"margin-bottom: 30px;\">\n\n                                                        <h4 class=\"form-title\">Select Membership</h4>\n                                                        <p class=\"form-sub-title\">Select Membership Plan</p>\n\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-lg-12\">\n                                                    <div class=\"plan-radio\">\n                                                        <label class=\"checkbox\">\n                                                            <input type=\"radio\" name=\"selected_plan\" checked=\"checked\" hidden=\"\" formControlName=\"selected_plan\" value=\"basic\" (change)=\"onPlanChange($event.target.value)\" />\n                                                            <span class=\"label-btn\">Starter</span>\n                                                            <!-- data-target=\"#success-modal\" data-toggle=\"modal\" -->\n                                                        </label>\n                                                        <label class=\"checkbox\">\n                                                            <input type=\"radio\" name=\"selected_plan\" hidden=\"\" formControlName=\"selected_plan\" value=\"premium\" (change)=\"onPlanChange($event.target.value)\" />\n                                                            <span class=\"label-btn\"> Business Plus</span>\n                                                            <!-- data-target=\"#success-modal\" data-toggle=\"modal\" -->\n                                                        </label>\n                                                        <label class=\"checkbox\">\n                                                            <input type=\"radio\" name=\"selected_plan\" hidden=\"\" formControlName=\"selected_plan\" value=\"lecturer\" (change)=\"onPlanChange($event.target.value)\" />\n                                                            <span class=\"label-btn\"> Enterprise</span>\n                                                          \n                                                        </label>\n                                                        <!-- <label class=\"checkbox\">\n                                                            <input type=\"radio\" name=\"selected_plan\" hidden=\"\" formControlName=\"selected_plan\" value=\"universitys\" (change)=\"onPlanChange($event.target.value)\" />\n                                                            <span class=\"label-btn\">Universitys</span>\n                                                            \n                                                        </label>\n                                                        <label class=\"checkbox\">\n                                                            <input type=\"radio\" name=\"selected_plan\" hidden=\"\" formControlName=\"selected_plan\" value=\"dental_library\" (change)=\"onPlanChange($event.target.value)\" />\n                                                            <span class=\"label-btn\">Dental Library</span>\n                                                           \n                                                        </label> -->\n\n\n                                                        <!-- <div class=\"add-plan\">\n                                                            <div class=\"\">\n                                                                <h4>+ Add </h4>\n                                                                <span>(Dental Laboratory)</span>\n                                                            </div>\n                                                        </div> -->\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-lg-12\">\n                                                    <div class=\"remember_me\">\n                                                        <input type=\"checkbox\" class=\"checkbox\" id=\"remember_me\"  formControlName='checkbox' (ngModelChange)='onCheckboxChange()' >\n                                                        <label for=\"remember_me\">I acknowledge reading and accept <a href=\"https://dentswift.com/terms-conditions.html\" target=\"_blank\">Terms & Conditions.</a></label>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                            <div class=\"form-group\" >\n                                                <!-- routerLink=\"/payment-details\" -->\n                                                <button class=\"btn btn-primary btn-block mt-5 mb-4 login-btn\"  title=\"Thank\" style=\"max-width: 400px;\" type=\"button\" (click) =\"onSubmit()\" >SUBMIT & PROCEED</button>\n                                            </div>\n                                        </div>\n\n                                    </div>\n\n\n\n                                </div>\n\n                            </form>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- \n<div *ngIf=\"issucessmodelopen\" class=\"modal fade custom-modal\" id=\"success-modal\" data-backdrop=\"static\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"staticBackdropLabel\" aria-hidden=\"true\" role=\"dialog\">\n    <div class=\"modal-dialog  modal-dialog-centered modal-md\">\n        <div class=\"modal-content pb-4\">\n            <div class=\"modal-header\">\n                \n            </div>\n            <div class=\"modal-body\">\n                <div class=\"row\">\n                    <div class=\"col-md-12 text-center mb-4\">\n                        <img src=\"assets/img/tick.png\" alt=\"image\" />\n                    </div>\n                    <div class=\"col-md-12\">\n                        <h4 class=\"modal-title text-center\"> Thank you for Registration</h4>\n                        <p class=\"modal-txt text-center\">DentSwift Agent will \n                            contact you to complete your membership enrollment</p>\n\n                    </div>\n                </div>\n            </div>\n            <div class=\"text-center\">\n                <button  class=\"btn btn-primary mt-3 mb-2 login-btn\" style=\"width: 200px;\"  type=\"button\" (click) =\"gotodashboard()\" data-dismiss=\"modal\">Go To Dashboard</button>\n            </div>\n        </div>\n    </div>\n</div> -->\n<!-- Success modal start -->\n<!-- <div class=\"modal fade custom-modal\" id=\"success-modal\" role=\"dialog\">\n    <div class=\"modal-dialog  modal-dialog-centered modal-md\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n                  <img src=\"assets/img/close_cross.png\" alt=\"icon\" />\n              </button>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"row\">\n                    <div class=\"col-md-12 text-center mb-4\">\n                        <img src=\"assets/img/tick.png\" alt=\"image\" />\n                    </div>\n                    <div class=\"col-md-12\">\n                        <h4 class=\"modal-title text-center\">Thank you for Registration,</h4>\n                        <p class=\"modal-txt text-center\"> a DentSwift Agent will \n                            contact you to complete your membership enrollment</p>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div> -->\n<!-- Success modal start -->";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/signup/signup.component.html": function node_modulesRawLoaderDistCjsJsSrcAppSharedSignupSignupComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-login-header></app-login-header>\n<!-- <app-left-sidebar></app-left-sidebar> -->\n<div class=\"layout-main\">\n    <div class=\"container\">\n        <div class=\"home-bg d-flex\">\n            <div class=\"left-section\" style=\"background-image: url('assets/img/login-bg.png');\">\n                <div class=\"login-bottom-text\">\n                    <h4>Become a DentSwift Partner</h4>\n                    <p>Login or create account to start selling</p>\n                </div>\n\n            </div>\n            <div class=\"form-section-section\">\n                <div class=\"login-middle\">\n                    <div class=\"login\">\n                        <div class=\"login-body\">\n                            <ul class=\"login-list\">\n                                <li>\n                                    <a routerLink=\"/login\">LOGIN</a>\n                                </li>\n                                <li>\n                                    <a href=\"javascript:void(0)\" class=\"active\">CREATE ACCOUNT</a>\n                                </li>\n                            </ul>\n                            <div class=\"login-form\">\n                                <div class=\"text-center\" style=\"margin-bottom: 40px;\">\n                                    <h4 class=\"form-title\">New to DentSwift</h4>\n                                    <!-- <p class=\"form-sub-title\">Create your account</p> -->\n                                </div>\n                                <form class=\"mt-4\" [formGroup]=\"registerForm\" (ngSubmit)=\"onSubmit()\">\n                                    <div class=\"form-group\">\n                                        <label> Business Name</label>\n                                        <input class=\"form-control\" type=\"text\" placeholder=\"\"   onkeypress=\"return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode==32)\" formControlName=\"full_name\" [ngClass]=\"{ 'is-invalid': submitted && f.full_name.errors }\">\n                                        <div *ngIf=\"submitted && f.full_name.errors\" class=\"invalid-feedback\">\n                                            <div *ngIf=\"f.full_name.errors.required\">Name is required</div>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <label>Mobile Number</label>\n                                        <input class=\"form-control\"  onkeydown=\"return ( event.ctrlKey || event.altKey \n                                        || (47<event.keyCode && event.keyCode<58 && event.shiftKey==false) \n                                        || (95<event.keyCode && event.keyCode<106)\n                                        || (event.keyCode==8) || (event.keyCode==9) \n                                        || (event.keyCode>34 && event.keyCode<40) \n                                        || (event.keyCode==46) )\" ng2TelInput [ng2TelInputOptions]=\"{initialCountry: 'ae'}\" (countryChange)=\"onCountryChange($event)\" type=\"text\" placeholder=\"\" formControlName=\"mobile_number\" [ngClass]=\"{ 'is-invalid': submitted && f.mobile_number.errors }\">\n                                        <div *ngIf=\"submitted && f.mobile_number.errors\" class=\"invalid-feedback\">\n                                            <div *ngIf=\"f.mobile_number.errors.required\">Mobile number is required</div>\n                                            <div *ngIf=\"f.mobile_number.errors.minlength\">Mobile number length must be between 8 - 12 characters</div>\n                                            <div *ngIf=\"f.mobile_number.errors.maxlength\">Mobile number length must be between 8 - 12 characters</div>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <label>Email Address</label>\n                                        <input class=\"form-control\" type=\"email\" placeholder=\"\" formControlName=\"email\" [ngClass]=\"{ 'is-invalid': submitted && f.email.errors }\">\n                                        <div *ngIf=\"submitted && f.email.errors\" class=\"invalid-feedback\">\n                                            <div *ngIf=\"f.email.errors.required\">Email is required</div>\n                                        </div>\n                                    </div>\n\n                                    <div class=\"form-group mat-form-control\">\n                                        <label>Password*</label>\n                                        <mat-form-field>\n                                            <div class=\"main-input\">\n                                                <input matInput placeholder=\"Password\" class=\"form-control\" [type]=\"hide ? 'password' : 'text'\" formControlName=\"password\" [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\">\n                                                <mat-icon class=\"show-password\" matSuffix (click)=\"hide = !hide\">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>\n                                                <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n                                                    <div *ngIf=\"f.password.errors.required\">Password is required</div>\n                                                    <div *ngIf=\"f.password.errors.minlength\">Password must be at least 8 characters</div>\n                                                </div>\n                                            </div>\n                                        </mat-form-field>\n                                    </div>\n                                    <div class=\"form-group mat-form-control\">\n                                        <label>Confirm Password*</label>\n                                        <mat-form-field>\n                                            <div class=\"main-input\">\n                                                <input matInput placeholder=\"Password\" class=\"form-control\" [type]=\"hide1 ? 'password' : 'text'\" formControlName=\"confirm_password\" [ngClass]=\"{ 'is-invalid': submitted && f.confirm_password.errors }\">\n                                                <mat-icon class=\"show-password\" matSuffix (click)=\"hide1 = !hide1\">{{hide1 ? 'visibility_off' : 'visibility'}}</mat-icon>\n                                                <div *ngIf=\"submitted && f.confirm_password.errors\" class=\"invalid-feedback\">\n                                                    <div *ngIf=\"f.confirm_password.errors.required\">Confirm password is required</div>\n                                                    <div *ngIf=\"f.confirm_password.errors.minlength\">Confirm password must be at least 8 characters</div>\n                                                </div>\n                                            </div>\n                                        </mat-form-field>\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <button class=\"btn btn-primary btn-block mt-5 mb-4 login-btn\" type=\"submit\">Register <span class=\"ml-2\"><img src=\"assets/img/signup-icon.png\" alt=\"icon\"/></span></button>\n                                    </div>\n                                    <!-- routerLink=\"/otp-verification\" -->\n                                    <div class=\"form-group\">\n                                        <p class=\"account-text text-center\">Don't have an account? <a routerLink=\"/sign-up\">Create an account</a></p>\n                                    </div>\n                                </form>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/thank-you/thank-you.component.html": function node_modulesRawLoaderDistCjsJsSrcAppSharedThankYouThankYouComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-login-header></app-login-header>\n\n<div class=\"containerDiv\" >\n    <div class=\"leftside\">\n    </div>\n    <div class=\"rightside\">\n        <div class=\"rightdiv_container\">\n            <div class=\"logo\"><img src=\"assets/images/logo.png\" alt=\"\"></div>\n            <div class=\"text-center thankubox\">\n                <!-- <h1>Thank You</h1>\n                <p>Your Payment is successfully done .</p>\n                <p><a href=\"https://b-influencer.com/\">Back to home</a></p> -->\n                <div class=\"row\">\n                    <div class=\"col-md-12 text-center mb-4\">\n                        <img src=\"assets/img/tick.png\" alt=\"image\" />\n                    </div>\n                    <div class=\"col-md-12\">\n                        <h4 class=\"modal-title text-center\"> Thank you for Registration</h4>\n                        <p class=\"modal-txt text-center\">DentSwift Agent will\n                            contact you to complete your membership enrollment</p>\n\n                    </div>\n                    <div class=\"text-center\">\n                        <button class=\"btn btn-primary mt-3 mb-2 login-btn\" style=\"width: 200px;\" type=\"button\"\n                            (click)=\"gotodashboard()\" data-dismiss=\"modal\">Go To\n                            Dashboard</button>\n                    </div>\n\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
    /***/
  },

  /***/
  "./src/app/shared/email-verification/email-verification.component.css": function srcAppSharedEmailVerificationEmailVerificationComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "body {\n    display: table-cell !important;\n    vertical-align: middle !important;\n}\n\n.form-group>label {\n    padding: 1px 3px;\n    margin: 0px;\n    font-size: 14px;\n    color: #8F8F8F;\n    line-height: 1.2;\n    position: absolute;\n    left: 15px;\n    top: 0px;\n    z-index: 11;\n    transform: translateY(-50%);\n    background-color: #fff;\n}\n\n/* .home-bg {\n    height: 400px;\n} */\n\n.form-control {\n    width: 100%;\n    display: block;\n    width: 100%;\n    height: 45px;\n    padding: 6px 12px;\n    font-size: 16px;\n    line-height: 1.538462;\n    color: #202020;\n    background: #FFFFFF1A;\n    border: 1px solid #D2D2D2;\n    border-radius: 25px;\n}\n\n.home-bg .left-section {\n    width: 60%;\n    background-repeat: no-repeat;\n    background-size: cover;\n    -o-object-fit: cover;\n       object-fit: cover;\n    background-position: bottom;\n    position: relative;\n    border-top-left-radius: 20px;\n    border-bottom-left-radius: 20px;\n}\n\n.login-bottom-text {\n    position: absolute;\n    bottom: 20px;\n    left: 30px;\n}\n\n.login-bottom-text h4 {\n    font-size: 34px;\n    color: #fff;\n}\n\n.form-title {\n    font-size: 22px;\n    color: #202020;\n    margin-bottom: 5px;\n}\n\n.form-sub-title {\n    font-size: 14px;\n    color: #666667;\n}\n\n.login-bottom-text p {\n    font-size: 18px;\n    color: #fff;\n}\n\n.home-bg .form-section-section {\n    width: 40%;\n}\n\n.login-btn {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n    padding: 10px 15px;\n}\n\n.login-btn:focus {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n}\n\n.remember_me .checkbox {\n    display: none;\n    padding: 20px;\n    margin: .5em 0 1.5em;\n}\n\n.remember_me .checkbox:checked+label:after {\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n    filter: alpha(opacity=100);\n    opacity: 1;\n}\n\n.remember_me label[for] {\n    position: relative;\n    padding-left: 40px;\n    cursor: pointer;\n}\n\n.remember_me label[for]:before {\n    content: '';\n    position: absolute;\n    border: 1px solid hsl(229deg 47% 52%);\n    width: 20px;\n    height: 20px;\n    top: 2px;\n    left: 10px;\n    border-radius: 100px;\n    background: hsl(229deg 47% 52%);\n}\n\n.remember_me label[for]:after {\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    filter: alpha(opacity=0);\n    opacity: 0;\n    content: '';\n    position: absolute;\n    width: 9px;\n    height: 5px;\n    background-color: transparent;\n    top: 9px;\n    left: 16px;\n    border: 3px solid #fff;\n    border-top: none;\n    border-right: none;\n    transform: rotate(-45deg);\n}\n\n.remember-home {\n    display: flex;\n    align-items: center;\n}\n\n.remember-home .remember_me {\n    width: 100%;\n}\n\n.remember-home a {\n    font-size: 13px;\n    color: hsl(229deg 46% 43%);\n    font-weight: 500;\n    width: 170px;\n}\n\n@media only screen and (max-width: 600px) {\n    .home-bg.d-flex {\n        display: block !important;\n    }\n    .home-bg {\n        padding: 50px 0;\n    }\n    .login-list li {\n        font-size: 14px;\n    }\n    .home-bg .left-section {\n        height: 100vh;\n        width: 100%;\n        display: none;\n    }\n    .home-bg .form-section-section {\n        width: 100%;\n    }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2VtYWlsLXZlcmlmaWNhdGlvbi9lbWFpbC12ZXJpZmljYXRpb24uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLDhCQUE4QjtJQUM5QixpQ0FBaUM7QUFDckM7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLGVBQWU7SUFDZixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsUUFBUTtJQUNSLFdBQVc7SUFDWCwyQkFBMkI7SUFDM0Isc0JBQXNCO0FBQzFCOztBQUdBOztHQUVHOztBQUVIO0lBQ0ksV0FBVztJQUNYLGNBQWM7SUFDZCxXQUFXO0lBQ1gsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YscUJBQXFCO0lBQ3JCLGNBQWM7SUFDZCxxQkFBcUI7SUFDckIseUJBQXlCO0lBQ3pCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLFVBQVU7SUFDViw0QkFBNEI7SUFDNUIsc0JBQXNCO0lBQ3RCLG9CQUFpQjtPQUFqQixpQkFBaUI7SUFDakIsMkJBQTJCO0lBQzNCLGtCQUFrQjtJQUNsQiw0QkFBNEI7SUFDNUIsK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztBQUNmOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGNBQWM7SUFDZCxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsY0FBYztBQUNsQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxrR0FBa0c7SUFDbEcsOEVBQThFO0lBQzlFLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtHQUFrRztJQUNsRyw4RUFBOEU7SUFDOUUsV0FBVztJQUNYLG1CQUFtQjtJQUNuQix5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsYUFBYTtJQUNiLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLGtFQUFrRTtJQUNsRSwwQkFBMEI7SUFDMUIsVUFBVTtBQUNkOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksV0FBVztJQUNYLGtCQUFrQjtJQUNsQixxQ0FBcUM7SUFDckMsV0FBVztJQUNYLFlBQVk7SUFDWixRQUFRO0lBQ1IsVUFBVTtJQUNWLG9CQUFvQjtJQUNwQiwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxnRUFBZ0U7SUFDaEUsd0JBQXdCO0lBQ3hCLFVBQVU7SUFDVixXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixXQUFXO0lBQ1gsNkJBQTZCO0lBQzdCLFFBQVE7SUFDUixVQUFVO0lBQ1Ysc0JBQXNCO0lBQ3RCLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFLbEIseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGVBQWU7SUFDZiwwQkFBMEI7SUFDMUIsZ0JBQWdCO0lBQ2hCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSTtRQUNJLHlCQUF5QjtJQUM3QjtJQUNBO1FBQ0ksZUFBZTtJQUNuQjtJQUNBO1FBQ0ksZUFBZTtJQUNuQjtJQUNBO1FBQ0ksYUFBYTtRQUNiLFdBQVc7UUFDWCxhQUFhO0lBQ2pCO0lBQ0E7UUFDSSxXQUFXO0lBQ2Y7QUFDSiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9lbWFpbC12ZXJpZmljYXRpb24vZW1haWwtdmVyaWZpY2F0aW9uLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJib2R5IHtcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsICFpbXBvcnRhbnQ7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZSAhaW1wb3J0YW50O1xufVxuXG4uZm9ybS1ncm91cD5sYWJlbCB7XG4gICAgcGFkZGluZzogMXB4IDNweDtcbiAgICBtYXJnaW46IDBweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6ICM4RjhGOEY7XG4gICAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMTVweDtcbiAgICB0b3A6IDBweDtcbiAgICB6LWluZGV4OiAxMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cblxuXG4vKiAuaG9tZS1iZyB7XG4gICAgaGVpZ2h0OiA0MDBweDtcbn0gKi9cblxuLmZvcm0tY29udHJvbCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA0NXB4O1xuICAgIHBhZGRpbmc6IDZweCAxMnB4O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBsaW5lLWhlaWdodDogMS41Mzg0NjI7XG4gICAgY29sb3I6ICMyMDIwMjA7XG4gICAgYmFja2dyb3VuZDogI0ZGRkZGRjFBO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEMkQyRDI7XG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcbn1cblxuLmhvbWUtYmcgLmxlZnQtc2VjdGlvbiB7XG4gICAgd2lkdGg6IDYwJTtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogYm90dG9tO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAyMHB4O1xuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDIwcHg7XG59XG5cbi5sb2dpbi1ib3R0b20tdGV4dCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMjBweDtcbiAgICBsZWZ0OiAzMHB4O1xufVxuXG4ubG9naW4tYm90dG9tLXRleHQgaDQge1xuICAgIGZvbnQtc2l6ZTogMzRweDtcbiAgICBjb2xvcjogI2ZmZjtcbn1cblxuLmZvcm0tdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICBjb2xvcjogIzIwMjAyMDtcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG59XG5cbi5mb3JtLXN1Yi10aXRsZSB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAjNjY2NjY3O1xufVxuXG4ubG9naW4tYm90dG9tLXRleHQgcCB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGNvbG9yOiAjZmZmO1xufVxuXG4uaG9tZS1iZyAuZm9ybS1zZWN0aW9uLXNlY3Rpb24ge1xuICAgIHdpZHRoOiA0MCU7XG59XG5cbi5sb2dpbi1idG4ge1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzRGNjRDNCAwJSwgdmFyKC0tdW5uYW1lZC1jb2xvci0zYjRkYTApIDEwMCUpIDAlIDAlO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzRGNjRDNCAwJSwgIzNCNERBMCAxMDAlKSAwJSAwJTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiA0OHB4O1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgcGFkZGluZzogMTBweCAxNXB4O1xufVxuXG4ubG9naW4tYnRuOmZvY3VzIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsIHZhcigtLXVubmFtZWQtY29sb3ItM2I0ZGEwKSAxMDAlKSAwJSAwJTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsICMzQjREQTAgMTAwJSkgMCUgMCU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogNDhweDtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4ucmVtZW1iZXJfbWUgLmNoZWNrYm94IHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgbWFyZ2luOiAuNWVtIDAgMS41ZW07XG59XG5cbi5yZW1lbWJlcl9tZSAuY2hlY2tib3g6Y2hlY2tlZCtsYWJlbDphZnRlciB7XG4gICAgLW1zLWZpbHRlcjogXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQWxwaGEoT3BhY2l0eT0xMDApXCI7XG4gICAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTEwMCk7XG4gICAgb3BhY2l0eTogMTtcbn1cblxuLnJlbWVtYmVyX21lIGxhYmVsW2Zvcl0ge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBwYWRkaW5nLWxlZnQ6IDQwcHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ucmVtZW1iZXJfbWUgbGFiZWxbZm9yXTpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBoc2woMjI5ZGVnIDQ3JSA1MiUpO1xuICAgIHdpZHRoOiAyMHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgICB0b3A6IDJweDtcbiAgICBsZWZ0OiAxMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xuICAgIGJhY2tncm91bmQ6IGhzbCgyMjlkZWcgNDclIDUyJSk7XG59XG5cbi5yZW1lbWJlcl9tZSBsYWJlbFtmb3JdOmFmdGVyIHtcbiAgICAtbXMtZmlsdGVyOiBcInByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5BbHBoYShPcGFjaXR5PTApXCI7XG4gICAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTApO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiA5cHg7XG4gICAgaGVpZ2h0OiA1cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgdG9wOiA5cHg7XG4gICAgbGVmdDogMTZweDtcbiAgICBib3JkZXI6IDNweCBzb2xpZCAjZmZmO1xuICAgIGJvcmRlci10b3A6IG5vbmU7XG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgICAtbW96LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG4gICAgLW8tdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xufVxuXG4ucmVtZW1iZXItaG9tZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ucmVtZW1iZXItaG9tZSAucmVtZW1iZXJfbWUge1xuICAgIHdpZHRoOiAxMDAlO1xufVxuXG4ucmVtZW1iZXItaG9tZSBhIHtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgY29sb3I6IGhzbCgyMjlkZWcgNDYlIDQzJSk7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB3aWR0aDogMTcwcHg7XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcbiAgICAuaG9tZS1iZy5kLWZsZXgge1xuICAgICAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xuICAgIH1cbiAgICAuaG9tZS1iZyB7XG4gICAgICAgIHBhZGRpbmc6IDUwcHggMDtcbiAgICB9XG4gICAgLmxvZ2luLWxpc3QgbGkge1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgfVxuICAgIC5ob21lLWJnIC5sZWZ0LXNlY3Rpb24ge1xuICAgICAgICBoZWlnaHQ6IDEwMHZoO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gICAgLmhvbWUtYmcgLmZvcm0tc2VjdGlvbi1zZWN0aW9uIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/shared/email-verification/email-verification.component.ts": function srcAppSharedEmailVerificationEmailVerificationComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EmailVerificationComponent", function () {
      return EmailVerificationComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
    /* harmony import */


    var _service_utils_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../service/utils.service */
    "./src/app/service/utils.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../service/authentication.service */
    "./src/app/service/authentication.service.ts");

    var EmailVerificationComponent = /*#__PURE__*/function () {
      function EmailVerificationComponent(formBuilder, toastr, utils, api, router) {
        _classCallCheck(this, EmailVerificationComponent);

        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.utils = utils;
        this.api = api;
        this.router = router;
        this.submitted = false;
      }

      _createClass(EmailVerificationComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.forgotPassForm = this.formBuilder.group({
            email: [''],
            country_code: ['971'],
            mobile_number: ['']
          });
        } // convenience getter for easy access to form fields

      }, {
        key: "f",
        get: function get() {
          return this.forgotPassForm.controls;
        }
      }, {
        key: "onCountryChange",
        value: function onCountryChange(event) {
          this.forgotPassForm.value.country_code = "+" + event.dialCode;
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this = this;

          this.submitted = true; // stop here if form is invalid

          if (this.forgotPassForm.invalid) {
            return;
          }

          if ((this.forgotPassForm.value.email == undefined || this.forgotPassForm.value.email == "") && (this.forgotPassForm.value.mobile_number == undefined || this.forgotPassForm.value.mobile_number == "")) {
            return this.toastr.error("Please enter email or mobile number");
          }

          var data = {
            email: this.forgotPassForm.value.email,
            country_code: this.forgotPassForm.value.country_code,
            mobile_number: this.forgotPassForm.value.mobile_number
          };
          this.api.forgotPassword(data).subscribe(function (data) {
            console.log('success', data);
            console.log(data["response"]);
            console.log(":::::::::::::::::");

            _this.toastr.success(data["message"]);

            localStorage.setItem("currentUser", JSON.stringify(data["response"]));
            localStorage.setItem('access_token', data['access_token']);

            _this.router.navigate(['/otp-password-verification']);
          }, function (error) {
            console.log('oops', error.error.message);

            _this.toastr.error(error.error.message);
          });
        }
      }, {
        key: "telInputObject",
        value: function telInputObject(obj) {
          console.log(obj);
          obj.setCountry('ae');
        }
      }]);

      return EmailVerificationComponent;
    }();

    EmailVerificationComponent.ctorParameters = function () {
      return [{
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]
      }, {
        type: _service_utils_service__WEBPACK_IMPORTED_MODULE_4__["UtilsService"]
      }, {
        type: _service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
      }];
    };

    EmailVerificationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-email-verification',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./email-verification.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/email-verification/email-verification.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./email-verification.component.css */
      "./src/app/shared/email-verification/email-verification.component.css"))["default"]]
    })], EmailVerificationComponent);
    /***/
  },

  /***/
  "./src/app/shared/forgot-password/forgot-password.component.css": function srcAppSharedForgotPasswordForgotPasswordComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "body {\n    display: table-cell !important;\n    vertical-align: middle !important;\n}\n\n.form-group>label {\n    padding: 1px 3px;\n    margin: 0px;\n    font-size: 14px;\n    color: #8F8F8F;\n    line-height: 1.2;\n    position: absolute;\n    left: 15px;\n    top: 0px;\n    z-index: 11;\n    transform: translateY(-50%);\n    background-color: #fff;\n}\n\n/* .home-bg {\n    height: 400px;\n} */\n\n.form-control {\n    width: 100%;\n    display: block;\n    width: 100%;\n    height: 45px;\n    padding: 6px 12px;\n    font-size: 16px;\n    line-height: 1.538462;\n    color: #202020;\n    background: #FFFFFF1A;\n    border: 1px solid #D2D2D2;\n    border-radius: 25px;\n}\n\n.home-bg .left-section {\n    width: 60%;\n    background-repeat: no-repeat;\n    background-size: cover;\n    -o-object-fit: cover;\n       object-fit: cover;\n    background-position: bottom;\n    position: relative;\n    border-top-left-radius: 20px;\n    border-bottom-left-radius: 20px;\n}\n\n.login-bottom-text {\n    position: absolute;\n    bottom: 20px;\n    left: 30px;\n}\n\n.login-bottom-text h4 {\n    font-size: 34px;\n    color: #fff;\n}\n\n.otp-verify-header .form-title {\n    font-size: 22px;\n    color: #3B4DA0;\n    margin-bottom: 5px;\n    font-weight: 600;\n}\n\n.otp-verify-header .form-sub-title {\n    font-size: 14px;\n    color: #202020;\n}\n\n.otp-verify-header .top-bottom-text {\n    font-size: 18px;\n    font-weight: 600;\n    color: #3B4DA0;\n    margin: 40px 0;\n    text-align: center;\n}\n\n.otp-verify input {\n    width: 40px;\n    height: 44px;\n    color: #3B4DA0;\n    background: #3A3A3A00;\n    border: 1px solid #D2D2D2;\n    border-radius: 5px;\n}\n\n.otp-verify input:focus {\n    border-color: #3B4DA0;\n}\n\n.login-bottom-text p {\n    font-size: 18px;\n    color: #fff;\n}\n\n.home-bg .form-section-section {\n    width: 40%;\n}\n\n.login-btn {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n    padding: 10px 15px;\n}\n\n.login-btn:focus {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n}\n\n.form-group.mat-form-control label {\n    top: 10px !important;\n    left: 25px;\n}\n\n.mat-form-field {\n    border: 0 !important;\n}\n\n@media only screen and (max-width: 600px) {\n    .home-bg.d-flex {\n        display: block !important;\n    }\n    .home-bg {\n        padding: 50px 0;\n    }\n    .home-bg .left-section {\n        height: 100vh;\n        width: 100%;\n        display: none;\n    }\n    .home-bg .form-section-section {\n        width: 100%;\n    }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLDhCQUE4QjtJQUM5QixpQ0FBaUM7QUFDckM7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLGVBQWU7SUFDZixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsUUFBUTtJQUNSLFdBQVc7SUFDWCwyQkFBMkI7SUFDM0Isc0JBQXNCO0FBQzFCOztBQUdBOztHQUVHOztBQUVIO0lBQ0ksV0FBVztJQUNYLGNBQWM7SUFDZCxXQUFXO0lBQ1gsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YscUJBQXFCO0lBQ3JCLGNBQWM7SUFDZCxxQkFBcUI7SUFDckIseUJBQXlCO0lBQ3pCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLFVBQVU7SUFDViw0QkFBNEI7SUFDNUIsc0JBQXNCO0lBQ3RCLG9CQUFpQjtPQUFqQixpQkFBaUI7SUFDakIsMkJBQTJCO0lBQzNCLGtCQUFrQjtJQUNsQiw0QkFBNEI7SUFDNUIsK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztBQUNmOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxjQUFjO0lBQ2Qsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixjQUFjO0lBQ2QscUJBQXFCO0lBQ3JCLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztBQUNmOztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksa0dBQWtHO0lBQ2xHLDhFQUE4RTtJQUM5RSxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrR0FBa0c7SUFDbEcsOEVBQThFO0lBQzlFLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksb0JBQW9CO0lBQ3BCLFVBQVU7QUFDZDs7QUFFQTtJQUNJLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJO1FBQ0kseUJBQXlCO0lBQzdCO0lBQ0E7UUFDSSxlQUFlO0lBQ25CO0lBQ0E7UUFDSSxhQUFhO1FBQ2IsV0FBVztRQUNYLGFBQWE7SUFDakI7SUFDQTtRQUNJLFdBQVc7SUFDZjtBQUNKIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHkge1xuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGwgIWltcG9ydGFudDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlICFpbXBvcnRhbnQ7XG59XG5cbi5mb3JtLWdyb3VwPmxhYmVsIHtcbiAgICBwYWRkaW5nOiAxcHggM3B4O1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogIzhGOEY4RjtcbiAgICBsaW5lLWhlaWdodDogMS4yO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAxNXB4O1xuICAgIHRvcDogMHB4O1xuICAgIHotaW5kZXg6IDExO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuXG5cbi8qIC5ob21lLWJnIHtcbiAgICBoZWlnaHQ6IDQwMHB4O1xufSAqL1xuXG4uZm9ybS1jb250cm9sIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDQ1cHg7XG4gICAgcGFkZGluZzogNnB4IDEycHg7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjUzODQ2MjtcbiAgICBjb2xvcjogIzIwMjAyMDtcbiAgICBiYWNrZ3JvdW5kOiAjRkZGRkZGMUE7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI0QyRDJEMjtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xufVxuXG4uaG9tZS1iZyAubGVmdC1zZWN0aW9uIHtcbiAgICB3aWR0aDogNjAlO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBib3R0b207XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIwcHg7XG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMjBweDtcbn1cblxuLmxvZ2luLWJvdHRvbS10ZXh0IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAyMHB4O1xuICAgIGxlZnQ6IDMwcHg7XG59XG5cbi5sb2dpbi1ib3R0b20tdGV4dCBoNCB7XG4gICAgZm9udC1zaXplOiAzNHB4O1xuICAgIGNvbG9yOiAjZmZmO1xufVxuXG4ub3RwLXZlcmlmeS1oZWFkZXIgLmZvcm0tdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICBjb2xvcjogIzNCNERBMDtcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLm90cC12ZXJpZnktaGVhZGVyIC5mb3JtLXN1Yi10aXRsZSB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAjMjAyMDIwO1xufVxuXG4ub3RwLXZlcmlmeS1oZWFkZXIgLnRvcC1ib3R0b20tdGV4dCB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6ICMzQjREQTA7XG4gICAgbWFyZ2luOiA0MHB4IDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ub3RwLXZlcmlmeSBpbnB1dCB7XG4gICAgd2lkdGg6IDQwcHg7XG4gICAgaGVpZ2h0OiA0NHB4O1xuICAgIGNvbG9yOiAjM0I0REEwO1xuICAgIGJhY2tncm91bmQ6ICMzQTNBM0EwMDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRDJEMkQyO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLm90cC12ZXJpZnkgaW5wdXQ6Zm9jdXMge1xuICAgIGJvcmRlci1jb2xvcjogIzNCNERBMDtcbn1cblxuLmxvZ2luLWJvdHRvbS10ZXh0IHAge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBjb2xvcjogI2ZmZjtcbn1cblxuLmhvbWUtYmcgLmZvcm0tc2VjdGlvbi1zZWN0aW9uIHtcbiAgICB3aWR0aDogNDAlO1xufVxuXG4ubG9naW4tYnRuIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsIHZhcigtLXVubmFtZWQtY29sb3ItM2I0ZGEwKSAxMDAlKSAwJSAwJTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsICMzQjREQTAgMTAwJSkgMCUgMCU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogNDhweDtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcbn1cblxuLmxvZ2luLWJ0bjpmb2N1cyB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCB2YXIoLS11bm5hbWVkLWNvbG9yLTNiNGRhMCkgMTAwJSkgMCUgMCU7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCAjM0I0REEwIDEwMCUpIDAlIDAlO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDQ4cHg7XG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmZvcm0tZ3JvdXAubWF0LWZvcm0tY29udHJvbCBsYWJlbCB7XG4gICAgdG9wOiAxMHB4ICFpbXBvcnRhbnQ7XG4gICAgbGVmdDogMjVweDtcbn1cblxuLm1hdC1mb3JtLWZpZWxkIHtcbiAgICBib3JkZXI6IDAgIWltcG9ydGFudDtcbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgIC5ob21lLWJnLmQtZmxleCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIC5ob21lLWJnIHtcbiAgICAgICAgcGFkZGluZzogNTBweCAwO1xuICAgIH1cbiAgICAuaG9tZS1iZyAubGVmdC1zZWN0aW9uIHtcbiAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIC5ob21lLWJnIC5mb3JtLXNlY3Rpb24tc2VjdGlvbiB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/shared/forgot-password/forgot-password.component.ts": function srcAppSharedForgotPasswordForgotPasswordComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ForgotPasswordComponent", function () {
      return ForgotPasswordComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
    /* harmony import */


    var _service_utils_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../service/utils.service */
    "./src/app/service/utils.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../service/authentication.service */
    "./src/app/service/authentication.service.ts");

    var ForgotPasswordComponent = /*#__PURE__*/function () {
      function ForgotPasswordComponent(formBuilder, toastr, utils, api, router) {
        _classCallCheck(this, ForgotPasswordComponent);

        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.utils = utils;
        this.api = api;
        this.router = router;
        this.hide = true;
        this.hide1 = true;
        this.submitted = false;
      }

      _createClass(ForgotPasswordComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.resetPassForm = this.formBuilder.group({
            newPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8)]],
            confirmPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8)]]
          });
        } // convenience getter for easy access to form fields

      }, {
        key: "f",
        get: function get() {
          return this.resetPassForm.controls;
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this2 = this;

          this.submitted = true; // stop here if form is invalid

          if (this.resetPassForm.invalid) {
            return;
          } // var admin = JSON.parse(localStorage.getItem('currentUser'));


          if (this.resetPassForm.value.newPassword != this.resetPassForm.value.confirmPassword) {
            return this.toastr.error("Password does not match");
          }

          var data = {
            newPassword: this.resetPassForm.value.newPassword
          };
          console.log(data);
          this.api.resetPassword(data).subscribe(function (data) {
            console.log('success', data);
            console.log(data["response"]);
            console.log(":::::::::::::::::");

            _this2.toastr.success(data["message"]);

            _this2.router.navigate(['/login']);
          }, function (error) {
            console.log('oops', error.error.message);

            _this2.toastr.error(error.error.message);
          });
        }
      }]);

      return ForgotPasswordComponent;
    }();

    ForgotPasswordComponent.ctorParameters = function () {
      return [{
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]
      }, {
        type: _service_utils_service__WEBPACK_IMPORTED_MODULE_4__["UtilsService"]
      }, {
        type: _service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
      }];
    };

    ForgotPasswordComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-forgot-password',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./forgot-password.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/forgot-password/forgot-password.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./forgot-password.component.css */
      "./src/app/shared/forgot-password/forgot-password.component.css"))["default"]]
    })], ForgotPasswordComponent);
    /***/
  },

  /***/
  "./src/app/shared/login/login.component.css": function srcAppSharedLoginLoginComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "body {\n    display: table-cell !important;\n    vertical-align: middle !important;\n}\n\n.form-group>label {\n    padding: 1px 3px;\n    margin: 0px;\n    font-size: 14px;\n    color: #8F8F8F;\n    line-height: 1.2;\n    position: absolute;\n    left: 15px;\n    top: 0px;\n    z-index: 11;\n    transform: translateY(-50%);\n    background-color: #fff;\n}\n\n/* .home-bg {\n    height: 400px;\n} */\n\n.form-control {\n    width: 100%;\n    display: block;\n    width: 100%;\n    height: 45px;\n    padding: 6px 12px;\n    font-size: 16px;\n    line-height: 1.538462;\n    color: #202020;\n    background: #FFFFFF1A;\n    border: 1px solid #D2D2D2;\n    border-radius: 25px;\n}\n\n.home-bg .left-section {\n    width: 60%;\n    background-repeat: no-repeat;\n    background-size: cover;\n    -o-object-fit: cover;\n       object-fit: cover;\n    background-position: bottom;\n    position: relative;\n    border-top-left-radius: 20px;\n    border-bottom-left-radius: 20px;\n}\n\n.login-bottom-text {\n    position: absolute;\n    bottom: 20px;\n    left: 30px;\n}\n\n.login-bottom-text h4 {\n    font-size: 34px;\n    color: #fff;\n}\n\n.form-title {\n    font-size: 22px;\n    color: #202020;\n    margin-bottom: 5px;\n}\n\n.form-sub-title {\n    font-size: 14px;\n    color: #666667;\n}\n\n.login-bottom-text p {\n    font-size: 18px;\n    color: #fff;\n}\n\n.home-bg .form-section-section {\n    width: 40%;\n}\n\n.login-btn {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n    padding: 10px 15px;\n}\n\n.login-btn:focus {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n}\n\n.remember_me .checkbox {\n    display: none;\n    padding: 20px;\n    margin: .5em 0 1.5em;\n}\n\n.remember_me .checkbox:checked+label:after {\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n    filter: alpha(opacity=100);\n    opacity: 1;\n}\n\n.remember_me label[for] {\n    position: relative;\n    padding-left: 40px;\n    cursor: pointer;\n}\n\n.remember_me label[for]:before {\n    content: '';\n    position: absolute;\n    border: 1px solid hsl(229deg 47% 52%);\n    width: 20px;\n    height: 20px;\n    top: 2px;\n    left: 10px;\n    border-radius: 100px;\n    background: hsl(229deg 47% 52%);\n}\n\n.remember_me label[for]:after {\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    filter: alpha(opacity=0);\n    opacity: 0;\n    content: '';\n    position: absolute;\n    width: 9px;\n    height: 5px;\n    background-color: transparent;\n    top: 9px;\n    left: 16px;\n    border: 3px solid #fff;\n    border-top: none;\n    border-right: none;\n    transform: rotate(-45deg);\n}\n\n.remember-home {\n    display: flex;\n    align-items: center;\n}\n\n.remember-home .remember_me {\n    width: 100%;\n}\n\n.remember-home a {\n    font-size: 13px;\n    color: hsl(229deg 46% 43%);\n    font-weight: 500;\n    width: 170px;\n}\n\n@media only screen and (max-width: 600px) {\n    .home-bg.d-flex {\n        display: block !important;\n    }\n    .home-bg {\n        padding: 50px 0;\n    }\n    .login-list li {\n        font-size: 14px;\n    }\n    .home-bg .left-section {\n        height: 100vh;\n        width: 100%;\n        display: none;\n    }\n    .home-bg .form-section-section {\n        width: 100%;\n    }\n}\n\n@media only screen and (max-width: 375px) {\n    .login-list li {\n        font-size: 11px;\n    }\n    .remember-home a {\n        font-size: 11px;\n    }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSw4QkFBOEI7SUFDOUIsaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxlQUFlO0lBQ2YsY0FBYztJQUNkLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLFFBQVE7SUFDUixXQUFXO0lBQ1gsMkJBQTJCO0lBQzNCLHNCQUFzQjtBQUMxQjs7QUFHQTs7R0FFRzs7QUFFSDtJQUNJLFdBQVc7SUFDWCxjQUFjO0lBQ2QsV0FBVztJQUNYLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQixjQUFjO0lBQ2QscUJBQXFCO0lBQ3JCLHlCQUF5QjtJQUN6QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsNEJBQTRCO0lBQzVCLHNCQUFzQjtJQUN0QixvQkFBaUI7T0FBakIsaUJBQWlCO0lBQ2pCLDJCQUEyQjtJQUMzQixrQkFBa0I7SUFDbEIsNEJBQTRCO0lBQzVCLCtCQUErQjtBQUNuQzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osVUFBVTtBQUNkOztBQUVBO0lBQ0ksZUFBZTtJQUNmLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGVBQWU7SUFDZixjQUFjO0lBQ2Qsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztBQUNmOztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksa0dBQWtHO0lBQ2xHLDhFQUE4RTtJQUM5RSxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrR0FBa0c7SUFDbEcsOEVBQThFO0lBQzlFLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYixvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSxrRUFBa0U7SUFDbEUsMEJBQTBCO0lBQzFCLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIscUNBQXFDO0lBQ3JDLFdBQVc7SUFDWCxZQUFZO0lBQ1osUUFBUTtJQUNSLFVBQVU7SUFDVixvQkFBb0I7SUFDcEIsK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksZ0VBQWdFO0lBQ2hFLHdCQUF3QjtJQUN4QixVQUFVO0lBQ1YsV0FBVztJQUNYLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsV0FBVztJQUNYLDZCQUE2QjtJQUM3QixRQUFRO0lBQ1IsVUFBVTtJQUNWLHNCQUFzQjtJQUN0QixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBS2xCLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsMEJBQTBCO0lBQzFCLGdCQUFnQjtJQUNoQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0k7UUFDSSx5QkFBeUI7SUFDN0I7SUFDQTtRQUNJLGVBQWU7SUFDbkI7SUFDQTtRQUNJLGVBQWU7SUFDbkI7SUFDQTtRQUNJLGFBQWE7UUFDYixXQUFXO1FBQ1gsYUFBYTtJQUNqQjtJQUNBO1FBQ0ksV0FBVztJQUNmO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGVBQWU7SUFDbkI7SUFDQTtRQUNJLGVBQWU7SUFDbkI7QUFDSiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keSB7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbCAhaW1wb3J0YW50O1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGUgIWltcG9ydGFudDtcbn1cblxuLmZvcm0tZ3JvdXA+bGFiZWwge1xuICAgIHBhZGRpbmc6IDFweCAzcHg7XG4gICAgbWFyZ2luOiAwcHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAjOEY4RjhGO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDE1cHg7XG4gICAgdG9wOiAwcHg7XG4gICAgei1pbmRleDogMTE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59XG5cblxuLyogLmhvbWUtYmcge1xuICAgIGhlaWdodDogNDAwcHg7XG59ICovXG5cbi5mb3JtLWNvbnRyb2wge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogNDVweDtcbiAgICBwYWRkaW5nOiA2cHggMTJweDtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDEuNTM4NDYyO1xuICAgIGNvbG9yOiAjMjAyMDIwO1xuICAgIGJhY2tncm91bmQ6ICNGRkZGRkYxQTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRDJEMkQyO1xuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XG59XG5cbi5ob21lLWJnIC5sZWZ0LXNlY3Rpb24ge1xuICAgIHdpZHRoOiA2MCU7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGJvdHRvbTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMjBweDtcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAyMHB4O1xufVxuXG4ubG9naW4tYm90dG9tLXRleHQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDIwcHg7XG4gICAgbGVmdDogMzBweDtcbn1cblxuLmxvZ2luLWJvdHRvbS10ZXh0IGg0IHtcbiAgICBmb250LXNpemU6IDM0cHg7XG4gICAgY29sb3I6ICNmZmY7XG59XG5cbi5mb3JtLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDIycHg7XG4gICAgY29sb3I6ICMyMDIwMjA7XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xufVxuXG4uZm9ybS1zdWItdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogIzY2NjY2Nztcbn1cblxuLmxvZ2luLWJvdHRvbS10ZXh0IHAge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBjb2xvcjogI2ZmZjtcbn1cblxuLmhvbWUtYmcgLmZvcm0tc2VjdGlvbi1zZWN0aW9uIHtcbiAgICB3aWR0aDogNDAlO1xufVxuXG4ubG9naW4tYnRuIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsIHZhcigtLXVubmFtZWQtY29sb3ItM2I0ZGEwKSAxMDAlKSAwJSAwJTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsICMzQjREQTAgMTAwJSkgMCUgMCU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogNDhweDtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcbn1cblxuLmxvZ2luLWJ0bjpmb2N1cyB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCB2YXIoLS11bm5hbWVkLWNvbG9yLTNiNGRhMCkgMTAwJSkgMCUgMCU7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCAjM0I0REEwIDEwMCUpIDAlIDAlO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDQ4cHg7XG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLnJlbWVtYmVyX21lIC5jaGVja2JveCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIG1hcmdpbjogLjVlbSAwIDEuNWVtO1xufVxuXG4ucmVtZW1iZXJfbWUgLmNoZWNrYm94OmNoZWNrZWQrbGFiZWw6YWZ0ZXIge1xuICAgIC1tcy1maWx0ZXI6IFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkFscGhhKE9wYWNpdHk9MTAwKVwiO1xuICAgIGZpbHRlcjogYWxwaGEob3BhY2l0eT0xMDApO1xuICAgIG9wYWNpdHk6IDE7XG59XG5cbi5yZW1lbWJlcl9tZSBsYWJlbFtmb3JdIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgcGFkZGluZy1sZWZ0OiA0MHB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnJlbWVtYmVyX21lIGxhYmVsW2Zvcl06YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgaHNsKDIyOWRlZyA0NyUgNTIlKTtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgdG9wOiAycHg7XG4gICAgbGVmdDogMTBweDtcbiAgICBib3JkZXItcmFkaXVzOiAxMDBweDtcbiAgICBiYWNrZ3JvdW5kOiBoc2woMjI5ZGVnIDQ3JSA1MiUpO1xufVxuXG4ucmVtZW1iZXJfbWUgbGFiZWxbZm9yXTphZnRlciB7XG4gICAgLW1zLWZpbHRlcjogXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQWxwaGEoT3BhY2l0eT0wKVwiO1xuICAgIGZpbHRlcjogYWxwaGEob3BhY2l0eT0wKTtcbiAgICBvcGFjaXR5OiAwO1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogOXB4O1xuICAgIGhlaWdodDogNXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIHRvcDogOXB4O1xuICAgIGxlZnQ6IDE2cHg7XG4gICAgYm9yZGVyOiAzcHggc29saWQgI2ZmZjtcbiAgICBib3JkZXItdG9wOiBub25lO1xuICAgIGJvcmRlci1yaWdodDogbm9uZTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG4gICAgLW1vei10cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICAgIC1vLXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG4gICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbn1cblxuLnJlbWVtYmVyLWhvbWUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnJlbWVtYmVyLWhvbWUgLnJlbWVtYmVyX21lIHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuLnJlbWVtYmVyLWhvbWUgYSB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIGNvbG9yOiBoc2woMjI5ZGVnIDQ2JSA0MyUpO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgd2lkdGg6IDE3MHB4O1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgLmhvbWUtYmcuZC1mbGV4IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcbiAgICB9XG4gICAgLmhvbWUtYmcge1xuICAgICAgICBwYWRkaW5nOiA1MHB4IDA7XG4gICAgfVxuICAgIC5sb2dpbi1saXN0IGxpIHtcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgIH1cbiAgICAuaG9tZS1iZyAubGVmdC1zZWN0aW9uIHtcbiAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIC5ob21lLWJnIC5mb3JtLXNlY3Rpb24tc2VjdGlvbiB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNzVweCkge1xuICAgIC5sb2dpbi1saXN0IGxpIHtcbiAgICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgIH1cbiAgICAucmVtZW1iZXItaG9tZSBhIHtcbiAgICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgIH1cbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/shared/login/login.component.ts": function srcAppSharedLoginLoginComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginComponent", function () {
      return LoginComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
    /* harmony import */


    var _service_utils_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../service/utils.service */
    "./src/app/service/utils.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../service/authentication.service */
    "./src/app/service/authentication.service.ts");

    var LoginComponent = /*#__PURE__*/function () {
      // currentUser: string;
      function LoginComponent(formBuilder, toastr, utils, api, router) {
        _classCallCheck(this, LoginComponent);

        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.utils = utils;
        this.api = api;
        this.router = router;
        this.submitted = false;
        this.hide = true;
      }

      _createClass(LoginComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          // debugger
          // this.currentUser=localStorage.getItem('currentUser');
          // this.isLoging = JSON.parse(this.currentUser);
          // console.log(this.isLoging);
          // if(this.isLoging != null){
          //   this.router.navigate(['/home/dashboard']);
          // }
          // email: ['', [Validators.required, Validators.email]],
          this.loginForm = this.formBuilder.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(5)]]
          });
        }
      }, {
        key: "f",
        get: function get() {
          return this.loginForm.controls;
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this3 = this;

          this.submitted = true;

          if (this.loginForm.invalid) {
            console.log('invalid');
            return;
          }

          var remember_me = $('#remember_me').is(":checked");

          if (remember_me) {
            this.utils.set('marketplace_admin', this.loginForm.value);
          } else {
            this.utils.removeData('marketplace_admin');
          } // this.loginForm.value.device_type = 3
          // this.loginForm.value.device_token = "admin_web"
          // console.log(this.loginForm.value)


          this.api.login(this.loginForm.value).subscribe(function (data) {
            console.log(data, "::::::::::::::::::::i am here");

            _this3.utils.set('marketplace_seller', data['response']);

            _this3.utils.alert('', 'seller logged in successfully');

            if (data['response'].is_seller_verified == false && data['response'].is_bank_created == false) {
              _this3.router.navigate(['/otp-verification']);
            } else if (data['response'].is_seller_verified == true && data['response'].is_bank_created == false) {
              _this3.router.navigate(['/register']);
            } else if (data['response'].is_bank_created == true && data['response'].is_bank_created == true) {
              _this3.router.navigate(['/home/dashboard']);
            } else {
              _this3.router.navigate(['/otp-verification']);
            }

            localStorage.setItem("currentUser", JSON.stringify(data["response"]));
          }, function (err) {
            console.log(err);

            _this3.toastr.error(err.error.message); // this.utils.alert('error', error['error']['message']);

          });
        }
      }, {
        key: "keyPress",
        value: function keyPress(event) {}
      }]);

      return LoginComponent;
    }();

    LoginComponent.ctorParameters = function () {
      return [{
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]
      }, {
        type: _service_utils_service__WEBPACK_IMPORTED_MODULE_4__["UtilsService"]
      }, {
        type: _service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
      }];
    };

    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-login',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./login.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/login/login.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./login.component.css */
      "./src/app/shared/login/login.component.css"))["default"]]
    })], LoginComponent);
    /***/
  },

  /***/
  "./src/app/shared/otp-password-verification/otp-password-verification.component.css": function srcAppSharedOtpPasswordVerificationOtpPasswordVerificationComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "body {\n    display: table-cell !important;\n    vertical-align: middle !important;\n}\n\n.form-group>label {\n    padding: 1px 3px;\n    margin: 0px;\n    font-size: 14px;\n    color: #8F8F8F;\n    line-height: 1.2;\n    position: absolute;\n    left: 15px;\n    top: 0px;\n    z-index: 11;\n    transform: translateY(-50%);\n    background-color: #fff;\n}\n\n/* .home-bg {\n    height: 400px;\n} */\n\n.form-control {\n    width: 100%;\n    display: block;\n    width: 100%;\n    height: 45px;\n    padding: 6px 12px;\n    font-size: 16px;\n    line-height: 1.538462;\n    color: #202020;\n    background: #FFFFFF1A;\n    border: 1px solid #D2D2D2;\n    border-radius: 25px;\n}\n\n.home-bg .left-section {\n    width: 60%;\n    background-repeat: no-repeat;\n    background-size: cover;\n    -o-object-fit: cover;\n       object-fit: cover;\n    background-position: bottom;\n    position: relative;\n    border-top-left-radius: 20px;\n    border-bottom-left-radius: 20px;\n}\n\n.login-bottom-text {\n    position: absolute;\n    bottom: 20px;\n    left: 30px;\n}\n\n.login-bottom-text h4 {\n    font-size: 34px;\n    color: #fff;\n}\n\n.otp-verify-header .form-title {\n    font-size: 22px;\n    font-weight: 600;\n    color: #3B4DA0;\n    margin-bottom: 5px;\n}\n\n.otp-verify-header .form-sub-title {\n    font-size: 14px;\n    color: #202020;\n}\n\n.otp-verify-header .top-bottom-text {\n    font-size: 18px;\n    font-weight: 600;\n    color: #3B4DA0;\n    margin: 40px 0;\n    text-align: center;\n}\n\n.otp-verify input {\n    width: 40px;\n    height: 44px;\n    color: #3B4DA0;\n    background: #3A3A3A00;\n    border: 1px solid #D2D2D2;\n    border-radius: 5px;\n}\n\n.otp-verify input:focus {\n    border-color: #3B4DA0;\n}\n\n.login-bottom-text p {\n    font-size: 18px;\n    color: #fff;\n}\n\n.home-bg .form-section-section {\n    width: 40%;\n}\n\n.login-btn {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n    padding: 10px 15px;\n}\n\n.login-btn:focus {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n}\n\n@media only screen and (max-width: 600px) {\n    .home-bg.d-flex {\n        display: block !important;\n    }\n    .home-bg {\n        padding: 50px 0;\n    }\n    .home-bg .left-section {\n        height: 100vh;\n        width: 100%;\n        display: none;\n    }\n    .home-bg .form-section-section {\n        width: 100%;\n    }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL290cC1wYXNzd29yZC12ZXJpZmljYXRpb24vb3RwLXBhc3N3b3JkLXZlcmlmaWNhdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksOEJBQThCO0lBQzlCLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsZUFBZTtJQUNmLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixRQUFRO0lBQ1IsV0FBVztJQUNYLDJCQUEyQjtJQUMzQixzQkFBc0I7QUFDMUI7O0FBR0E7O0dBRUc7O0FBRUg7SUFDSSxXQUFXO0lBQ1gsY0FBYztJQUNkLFdBQVc7SUFDWCxZQUFZO0lBQ1osaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixxQkFBcUI7SUFDckIsY0FBYztJQUNkLHFCQUFxQjtJQUNyQix5QkFBeUI7SUFDekIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksVUFBVTtJQUNWLDRCQUE0QjtJQUM1QixzQkFBc0I7SUFDdEIsb0JBQWlCO09BQWpCLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0Isa0JBQWtCO0lBQ2xCLDRCQUE0QjtJQUM1QiwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGVBQWU7SUFDZixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsY0FBYztBQUNsQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLGNBQWM7SUFDZCxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGNBQWM7SUFDZCxxQkFBcUI7SUFDckIseUJBQXlCO0lBQ3pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxrR0FBa0c7SUFDbEcsOEVBQThFO0lBQzlFLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtHQUFrRztJQUNsRyw4RUFBOEU7SUFDOUUsV0FBVztJQUNYLG1CQUFtQjtJQUNuQix5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSTtRQUNJLHlCQUF5QjtJQUM3QjtJQUNBO1FBQ0ksZUFBZTtJQUNuQjtJQUNBO1FBQ0ksYUFBYTtRQUNiLFdBQVc7UUFDWCxhQUFhO0lBQ2pCO0lBQ0E7UUFDSSxXQUFXO0lBQ2Y7QUFDSiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9vdHAtcGFzc3dvcmQtdmVyaWZpY2F0aW9uL290cC1wYXNzd29yZC12ZXJpZmljYXRpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHkge1xuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGwgIWltcG9ydGFudDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlICFpbXBvcnRhbnQ7XG59XG5cbi5mb3JtLWdyb3VwPmxhYmVsIHtcbiAgICBwYWRkaW5nOiAxcHggM3B4O1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogIzhGOEY4RjtcbiAgICBsaW5lLWhlaWdodDogMS4yO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAxNXB4O1xuICAgIHRvcDogMHB4O1xuICAgIHotaW5kZXg6IDExO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuXG5cbi8qIC5ob21lLWJnIHtcbiAgICBoZWlnaHQ6IDQwMHB4O1xufSAqL1xuXG4uZm9ybS1jb250cm9sIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDQ1cHg7XG4gICAgcGFkZGluZzogNnB4IDEycHg7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjUzODQ2MjtcbiAgICBjb2xvcjogIzIwMjAyMDtcbiAgICBiYWNrZ3JvdW5kOiAjRkZGRkZGMUE7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI0QyRDJEMjtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xufVxuXG4uaG9tZS1iZyAubGVmdC1zZWN0aW9uIHtcbiAgICB3aWR0aDogNjAlO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBib3R0b207XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIwcHg7XG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMjBweDtcbn1cblxuLmxvZ2luLWJvdHRvbS10ZXh0IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAyMHB4O1xuICAgIGxlZnQ6IDMwcHg7XG59XG5cbi5sb2dpbi1ib3R0b20tdGV4dCBoNCB7XG4gICAgZm9udC1zaXplOiAzNHB4O1xuICAgIGNvbG9yOiAjZmZmO1xufVxuXG4ub3RwLXZlcmlmeS1oZWFkZXIgLmZvcm0tdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiAjM0I0REEwO1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbn1cblxuLm90cC12ZXJpZnktaGVhZGVyIC5mb3JtLXN1Yi10aXRsZSB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAjMjAyMDIwO1xufVxuXG4ub3RwLXZlcmlmeS1oZWFkZXIgLnRvcC1ib3R0b20tdGV4dCB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6ICMzQjREQTA7XG4gICAgbWFyZ2luOiA0MHB4IDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ub3RwLXZlcmlmeSBpbnB1dCB7XG4gICAgd2lkdGg6IDQwcHg7XG4gICAgaGVpZ2h0OiA0NHB4O1xuICAgIGNvbG9yOiAjM0I0REEwO1xuICAgIGJhY2tncm91bmQ6ICMzQTNBM0EwMDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRDJEMkQyO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLm90cC12ZXJpZnkgaW5wdXQ6Zm9jdXMge1xuICAgIGJvcmRlci1jb2xvcjogIzNCNERBMDtcbn1cblxuLmxvZ2luLWJvdHRvbS10ZXh0IHAge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBjb2xvcjogI2ZmZjtcbn1cblxuLmhvbWUtYmcgLmZvcm0tc2VjdGlvbi1zZWN0aW9uIHtcbiAgICB3aWR0aDogNDAlO1xufVxuXG4ubG9naW4tYnRuIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsIHZhcigtLXVubmFtZWQtY29sb3ItM2I0ZGEwKSAxMDAlKSAwJSAwJTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsICMzQjREQTAgMTAwJSkgMCUgMCU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogNDhweDtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcbn1cblxuLmxvZ2luLWJ0bjpmb2N1cyB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCB2YXIoLS11bm5hbWVkLWNvbG9yLTNiNGRhMCkgMTAwJSkgMCUgMCU7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCAjM0I0REEwIDEwMCUpIDAlIDAlO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDQ4cHg7XG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgIC5ob21lLWJnLmQtZmxleCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIC5ob21lLWJnIHtcbiAgICAgICAgcGFkZGluZzogNTBweCAwO1xuICAgIH1cbiAgICAuaG9tZS1iZyAubGVmdC1zZWN0aW9uIHtcbiAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIC5ob21lLWJnIC5mb3JtLXNlY3Rpb24tc2VjdGlvbiB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/shared/otp-password-verification/otp-password-verification.component.ts": function srcAppSharedOtpPasswordVerificationOtpPasswordVerificationComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OtpPasswordVerificationComponent", function () {
      return OtpPasswordVerificationComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../service/authentication.service */
    "./src/app/service/authentication.service.ts");

    var OtpPasswordVerificationComponent = /*#__PURE__*/function () {
      function OtpPasswordVerificationComponent(formBuilder, auth, toastr, router) {
        _classCallCheck(this, OtpPasswordVerificationComponent);

        this.formBuilder = formBuilder;
        this.auth = auth;
        this.toastr = toastr;
        this.router = router;
        this.submitted = false;
      }

      _createClass(OtpPasswordVerificationComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.otpform = this.formBuilder.group({
            otp1: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            otp2: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            otp3: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            otp4: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]]
          });
        } // convenience getter for easy access to form fields

      }, {
        key: "f",
        get: function get() {
          return this.otpform.controls;
        }
      }, {
        key: "verifyOtp",
        value: function verifyOtp() {
          var _this4 = this;

          this.submitted = true; // stop here if form is invalid

          if (this.otpform.invalid) {
            return;
          }

          var otp = this.otpform.value.otp1 + this.otpform.value.otp2 + this.otpform.value.otp3 + this.otpform.value.otp4;
          console.log(otp);
          var data = {
            otp_value: otp
          };
          this.auth.verifyPasswordOtp(data).subscribe(function (res) {
            _this4.toastr.success(res["message"]);

            localStorage.setItem('access_token', res['access_token']); // this.successMessage = res['message']

            _this4.router.navigateByUrl("/forgot-password"); // this.router.navigateByUrl("/forgot-password")
            // this.router.navigateByUrl("/home/dashboard")
            // this.router.navigateByUrl("/store-form-details")

          }, function (error) {
            console.log(error); // this.invalidLogin = true
            // this.errorMessage = error.error.message

            _this4.toastr.error(error.error.message);
          });
        }
      }, {
        key: "resendOtp",
        value: function resendOtp() {
          var _this5 = this;

          this.auth.resendOtp().subscribe(function (res) {
            console.log(res["message"]);

            _this5.toastr.success(res["message"]);

            localStorage.setItem('access_token', res['access_token']); // this.successMessage = res['message']
          }, function (error) {
            console.log(error); // this.invalidLogin = true
            // this.errorMessage = error.error.message

            _this5.toastr.error(error.error.message);
          });
        }
      }, {
        key: "keyPress",
        value: function keyPress(e) {
          console.log(e);
          console.log(e.target.value);

          if (e.code == 'Backspace') {
            var target = e.srcElement || e.target;
            target.nextElementSibling.focus();
          }

          var target = e.srcElement || e.target;
          var maxLength = parseInt(target.attributes["maxlength"].value, 10);
          var myLength = target.value.length;

          if (maxLength == 1) {
            var next = target;

            while (next = next.nextElementSibling) {
              if (next == null) break;

              if (next.tagName.toLowerCase() === "input") {
                next.focus();
                break;
              }
            }
          } // Move to previous field if empty (user pressed backspace)
          else if (myLength === 0) {
            var previous = target;

            while (previous = previous.previousElementSibling) {
              if (previous == null) break;

              if (previous.tagName.toLowerCase() === "input") {
                previous.focus();
                break;
              }
            }
          }
        }
      }, {
        key: "movetoNext",
        value: function movetoNext(current, id) {
          var phoneno = /^\d{1}$/;

          if (current.key == 'Backspace' && current.target.value == '' && id != 1) {
            id -= 1;
            this.changeColor('#337B94', 4);
            document.getElementById(id).focus();
          }

          if (phoneno.test(current.target.value)) {
            if (id <= 3 && current.key != 'Backspace' && current.key != 'ArrowLeft' && current.key != 'Tab') {
              id += 1;
              document.getElementById(id).focus();
            }
          }
        }
      }, {
        key: "changeColor",
        value: function changeColor(color, id) {
          for (var i = 1; i <= id; i++) {
            document.getElementById(i.toString()).style.color = color;
            document.getElementById(i.toString()).style.borderBottomColor = color;
          }
        }
      }, {
        key: "sendEmailVerification",
        value: function sendEmailVerification() {
          var _this6 = this;

          this.auth.sendEmailVerification().subscribe(function (res) {
            console.log(res["message"]);

            _this6.toastr.success(res["message"]);
          }, function (error) {
            console.log(error);

            _this6.toastr.error(error.error.message);
          });
        }
      }]);

      return OtpPasswordVerificationComponent;
    }();

    OtpPasswordVerificationComponent.ctorParameters = function () {
      return [{
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: _service_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"]
      }, {
        type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
      }];
    };

    OtpPasswordVerificationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-otp-password-verification',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./otp-password-verification.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/otp-password-verification/otp-password-verification.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./otp-password-verification.component.css */
      "./src/app/shared/otp-password-verification/otp-password-verification.component.css"))["default"]]
    })], OtpPasswordVerificationComponent);
    /***/
  },

  /***/
  "./src/app/shared/otp-verification/otp-verification.component.css": function srcAppSharedOtpVerificationOtpVerificationComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "body {\n    display: table-cell !important;\n    vertical-align: middle !important;\n}\n\n.form-group>label {\n    padding: 1px 3px;\n    margin: 0px;\n    font-size: 14px;\n    color: #8F8F8F;\n    line-height: 1.2;\n    position: absolute;\n    left: 15px;\n    top: 0px;\n    z-index: 11;\n    transform: translateY(-50%);\n    background-color: #fff;\n}\n\n/* .home-bg {\n    height: 400px;\n} */\n\n.form-control {\n    width: 100%;\n    display: block;\n    width: 100%;\n    height: 45px;\n    padding: 6px 12px;\n    font-size: 16px;\n    line-height: 1.538462;\n    color: #202020;\n    background: #FFFFFF1A;\n    border: 1px solid #D2D2D2;\n    border-radius: 25px;\n}\n\n.home-bg .left-section {\n    width: 60%;\n    background-repeat: no-repeat;\n    background-size: cover;\n    -o-object-fit: cover;\n       object-fit: cover;\n    background-position: bottom;\n    position: relative;\n    border-top-left-radius: 20px;\n    border-bottom-left-radius: 20px;\n}\n\n.login-bottom-text {\n    position: absolute;\n    bottom: 20px;\n    left: 30px;\n}\n\n.login-bottom-text h4 {\n    font-size: 34px;\n    color: #fff;\n}\n\n.otp-verify-header .form-title {\n    font-size: 22px;\n    font-weight: 600;\n    color: #3B4DA0;\n    margin-bottom: 5px;\n}\n\n.otp-verify-header .form-sub-title {\n    font-size: 14px;\n    color: #202020;\n}\n\n.otp-verify-header .top-bottom-text {\n    font-size: 18px;\n    font-weight: 600;\n    color: #3B4DA0;\n    margin: 40px 0;\n    text-align: center;\n}\n\n.otp-verify input {\n    width: 40px;\n    height: 44px;\n    color: #3B4DA0;\n    background: #3A3A3A00;\n    border: 1px solid #D2D2D2;\n    border-radius: 5px;\n}\n\n.otp-verify input:focus {\n    border-color: #3B4DA0;\n}\n\n.login-bottom-text p {\n    font-size: 18px;\n    color: #fff;\n}\n\n.home-bg .form-section-section {\n    width: 40%;\n}\n\n.login-btn {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n    padding: 10px 15px;\n}\n\n.login-btn:focus {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n}\n\n@media only screen and (max-width: 600px) {\n    .home-bg.d-flex {\n        display: block !important;\n    }\n    .home-bg {\n        padding: 50px 0;\n    }\n    .home-bg .left-section {\n        height: 100vh;\n        width: 100%;\n        display: none;\n    }\n    .home-bg .form-section-section {\n        width: 100%;\n    }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL290cC12ZXJpZmljYXRpb24vb3RwLXZlcmlmaWNhdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksOEJBQThCO0lBQzlCLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsZUFBZTtJQUNmLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixRQUFRO0lBQ1IsV0FBVztJQUNYLDJCQUEyQjtJQUMzQixzQkFBc0I7QUFDMUI7O0FBR0E7O0dBRUc7O0FBRUg7SUFDSSxXQUFXO0lBQ1gsY0FBYztJQUNkLFdBQVc7SUFDWCxZQUFZO0lBQ1osaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixxQkFBcUI7SUFDckIsY0FBYztJQUNkLHFCQUFxQjtJQUNyQix5QkFBeUI7SUFDekIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksVUFBVTtJQUNWLDRCQUE0QjtJQUM1QixzQkFBc0I7SUFDdEIsb0JBQWlCO09BQWpCLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0Isa0JBQWtCO0lBQ2xCLDRCQUE0QjtJQUM1QiwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGVBQWU7SUFDZixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsY0FBYztBQUNsQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLGNBQWM7SUFDZCxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGNBQWM7SUFDZCxxQkFBcUI7SUFDckIseUJBQXlCO0lBQ3pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxrR0FBa0c7SUFDbEcsOEVBQThFO0lBQzlFLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtHQUFrRztJQUNsRyw4RUFBOEU7SUFDOUUsV0FBVztJQUNYLG1CQUFtQjtJQUNuQix5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSTtRQUNJLHlCQUF5QjtJQUM3QjtJQUNBO1FBQ0ksZUFBZTtJQUNuQjtJQUNBO1FBQ0ksYUFBYTtRQUNiLFdBQVc7UUFDWCxhQUFhO0lBQ2pCO0lBQ0E7UUFDSSxXQUFXO0lBQ2Y7QUFDSiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9vdHAtdmVyaWZpY2F0aW9uL290cC12ZXJpZmljYXRpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHkge1xuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGwgIWltcG9ydGFudDtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlICFpbXBvcnRhbnQ7XG59XG5cbi5mb3JtLWdyb3VwPmxhYmVsIHtcbiAgICBwYWRkaW5nOiAxcHggM3B4O1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogIzhGOEY4RjtcbiAgICBsaW5lLWhlaWdodDogMS4yO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAxNXB4O1xuICAgIHRvcDogMHB4O1xuICAgIHotaW5kZXg6IDExO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuXG5cbi8qIC5ob21lLWJnIHtcbiAgICBoZWlnaHQ6IDQwMHB4O1xufSAqL1xuXG4uZm9ybS1jb250cm9sIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDQ1cHg7XG4gICAgcGFkZGluZzogNnB4IDEycHg7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjUzODQ2MjtcbiAgICBjb2xvcjogIzIwMjAyMDtcbiAgICBiYWNrZ3JvdW5kOiAjRkZGRkZGMUE7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI0QyRDJEMjtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xufVxuXG4uaG9tZS1iZyAubGVmdC1zZWN0aW9uIHtcbiAgICB3aWR0aDogNjAlO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBib3R0b207XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIwcHg7XG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMjBweDtcbn1cblxuLmxvZ2luLWJvdHRvbS10ZXh0IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAyMHB4O1xuICAgIGxlZnQ6IDMwcHg7XG59XG5cbi5sb2dpbi1ib3R0b20tdGV4dCBoNCB7XG4gICAgZm9udC1zaXplOiAzNHB4O1xuICAgIGNvbG9yOiAjZmZmO1xufVxuXG4ub3RwLXZlcmlmeS1oZWFkZXIgLmZvcm0tdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiAjM0I0REEwO1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbn1cblxuLm90cC12ZXJpZnktaGVhZGVyIC5mb3JtLXN1Yi10aXRsZSB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAjMjAyMDIwO1xufVxuXG4ub3RwLXZlcmlmeS1oZWFkZXIgLnRvcC1ib3R0b20tdGV4dCB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6ICMzQjREQTA7XG4gICAgbWFyZ2luOiA0MHB4IDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ub3RwLXZlcmlmeSBpbnB1dCB7XG4gICAgd2lkdGg6IDQwcHg7XG4gICAgaGVpZ2h0OiA0NHB4O1xuICAgIGNvbG9yOiAjM0I0REEwO1xuICAgIGJhY2tncm91bmQ6ICMzQTNBM0EwMDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRDJEMkQyO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLm90cC12ZXJpZnkgaW5wdXQ6Zm9jdXMge1xuICAgIGJvcmRlci1jb2xvcjogIzNCNERBMDtcbn1cblxuLmxvZ2luLWJvdHRvbS10ZXh0IHAge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBjb2xvcjogI2ZmZjtcbn1cblxuLmhvbWUtYmcgLmZvcm0tc2VjdGlvbi1zZWN0aW9uIHtcbiAgICB3aWR0aDogNDAlO1xufVxuXG4ubG9naW4tYnRuIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsIHZhcigtLXVubmFtZWQtY29sb3ItM2I0ZGEwKSAxMDAlKSAwJSAwJTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsICMzQjREQTAgMTAwJSkgMCUgMCU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogNDhweDtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcbn1cblxuLmxvZ2luLWJ0bjpmb2N1cyB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCB2YXIoLS11bm5hbWVkLWNvbG9yLTNiNGRhMCkgMTAwJSkgMCUgMCU7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCAjM0I0REEwIDEwMCUpIDAlIDAlO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDQ4cHg7XG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgIC5ob21lLWJnLmQtZmxleCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIC5ob21lLWJnIHtcbiAgICAgICAgcGFkZGluZzogNTBweCAwO1xuICAgIH1cbiAgICAuaG9tZS1iZyAubGVmdC1zZWN0aW9uIHtcbiAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIC5ob21lLWJnIC5mb3JtLXNlY3Rpb24tc2VjdGlvbiB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/shared/otp-verification/otp-verification.component.ts": function srcAppSharedOtpVerificationOtpVerificationComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OtpVerificationComponent", function () {
      return OtpVerificationComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../service/authentication.service */
    "./src/app/service/authentication.service.ts");

    var OtpVerificationComponent = /*#__PURE__*/function () {
      function OtpVerificationComponent(formBuilder, auth, toastr, router) {
        _classCallCheck(this, OtpVerificationComponent);

        this.formBuilder = formBuilder;
        this.auth = auth;
        this.toastr = toastr;
        this.router = router;
        this.submitted = false; // timaer 

        this.timeLeft = 60;
      }

      _createClass(OtpVerificationComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.otpform = this.formBuilder.group({
            otp1: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            otp2: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            otp3: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            otp4: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]]
          });
          this.startTimer();
        } // convenience getter for easy access to form fields

      }, {
        key: "f",
        get: function get() {
          return this.otpform.controls;
        }
      }, {
        key: "verifyOtp",
        value: function verifyOtp() {
          var _this7 = this;

          this.submitted = true; // stop here if form is invalid

          if (this.otpform.invalid) {
            return;
          }

          var otp = this.otpform.value.otp1 + this.otpform.value.otp2 + this.otpform.value.otp3 + this.otpform.value.otp4;
          console.log(otp);
          var data = {
            otp_value: otp
          };
          this.auth.verifyOtp(data).subscribe(function (res) {
            _this7.toastr.success(res["message"]);

            localStorage.setItem('access_token', res['access_token']); // this.successMessage = res['message']

            _this7.router.navigateByUrl("/register"); // this.router.navigateByUrl("/forgot-password")
            // this.router.navigateByUrl("/home/dashboard")
            // this.router.navigateByUrl("/store-form-details")

          }, function (error) {
            console.log(error); // this.invalidLogin = true
            // this.errorMessage = error.error.message

            _this7.toastr.error(error.error.message);
          });
        }
      }, {
        key: "resendOtp",
        value: function resendOtp() {
          var _this8 = this;

          this.auth.resendOtp().subscribe(function (res) {
            console.log(res["message"]);

            _this8.toastr.success(res["message"]);

            localStorage.setItem('access_token', res['access_token']); // this.successMessage = res['message']
          }, function (error) {
            console.log(error); // this.invalidLogin = true
            // this.errorMessage = error.error.message

            _this8.toastr.error(error.error.message);
          });
        }
      }, {
        key: "keyPress",
        value: function keyPress(e) {
          console.log(e);
          console.log(e.target.value);

          if (e.code == 'Backspace') {
            var target = e.srcElement || e.target;
            target.nextElementSibling.focus();
          }

          var target = e.srcElement || e.target;
          var maxLength = parseInt(target.attributes["maxlength"].value, 10);
          var myLength = target.value.length;

          if (maxLength == 1) {
            var next = target;

            while (next = next.nextElementSibling) {
              if (next == null) break;

              if (next.tagName.toLowerCase() === "input") {
                next.focus();
                break;
              }
            }
          } // Move to previous field if empty (user pressed backspace)
          else if (myLength === 0) {
            var previous = target;

            while (previous = previous.previousElementSibling) {
              if (previous == null) break;

              if (previous.tagName.toLowerCase() === "input") {
                previous.focus();
                break;
              }
            }
          }
        }
      }, {
        key: "movetoNext",
        value: function movetoNext(current, id) {
          var phoneno = /^\d{1}$/;

          if (current.key == 'Backspace' && current.target.value == '' && id != 1) {
            id -= 1;
            this.changeColor('#337B94', 4);
            document.getElementById(id).focus();
          }

          if (phoneno.test(current.target.value)) {
            if (id <= 3 && current.key != 'Backspace' && current.key != 'ArrowLeft' && current.key != 'Tab') {
              id += 1;
              document.getElementById(id).focus();
            }
          }
        }
      }, {
        key: "changeColor",
        value: function changeColor(color, id) {
          for (var i = 1; i <= id; i++) {
            document.getElementById(i.toString()).style.color = color;
            document.getElementById(i.toString()).style.borderBottomColor = color;
          }
        }
      }, {
        key: "sendEmailVerification",
        value: function sendEmailVerification() {
          var _this9 = this;

          this.auth.sendEmailVerification().subscribe(function (res) {
            console.log(res["message"]);

            _this9.toastr.success(res["message"]);
          }, function (error) {
            console.log(error);

            _this9.toastr.error(error.error.message);
          });
        }
      }, {
        key: "startTimer",
        value: function startTimer() {
          var _this10 = this;

          this.interval = setInterval(function () {
            if (_this10.timeLeft > 0) {
              _this10.timeLeft--;
            } else {
              clearInterval(_this10.interval);
            }
          }, 1000);
        }
      }]);

      return OtpVerificationComponent;
    }();

    OtpVerificationComponent.ctorParameters = function () {
      return [{
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: _service_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"]
      }, {
        type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
      }];
    };

    OtpVerificationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-otp-verification',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./otp-verification.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/otp-verification/otp-verification.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./otp-verification.component.css */
      "./src/app/shared/otp-verification/otp-verification.component.css"))["default"]]
    })], OtpVerificationComponent);
    /***/
  },

  /***/
  "./src/app/shared/payment-details/payment-details.component.css": function srcAppSharedPaymentDetailsPaymentDetailsComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "body {\n    display: table-cell !important;\n    vertical-align: middle !important;\n}\n\n.payment-form {\n    background: #F3F2F7;\n    border-radius: 5px;\n    padding: 20px;\n}\n\n.form-group>label {\n    padding: 1px 3px;\n    margin: 0px;\n    font-size: 14px;\n    color: #202020;\n    line-height: 1.2;\n    /* position: absolute;\n    left: 15px;\n    top: 0px; */\n    z-index: 11;\n    /* transform: translateY(-50%); */\n    margin-bottom: 6px;\n}\n\n/* .home-bg {\n    height: 400px;\n} */\n\n.form-control {\n    width: 100%;\n    display: block;\n    width: 100%;\n    height: 40px;\n    padding: 6px 12px;\n    font-size: 16px;\n    line-height: 1.538462;\n    color: #202020;\n    background: #FFFFFF;\n    border: 1px solid #D6D6D6;\n    border-radius: 5px;\n}\n\n.home-bg .left-section {\n    width: 60%;\n    background-repeat: no-repeat;\n    background-size: cover;\n    -o-object-fit: cover;\n       object-fit: cover;\n    background-position: bottom;\n    position: relative;\n    border-top-left-radius: 20px;\n    border-bottom-left-radius: 20px;\n}\n\n.login-bottom-text {\n    position: absolute;\n    bottom: 20px;\n    left: 30px;\n}\n\n.login-bottom-text h4 {\n    font-size: 34px;\n    color: #fff;\n}\n\n.otp-verify-header .form-title {\n    font-size: 22px;\n    color: #3B4DA0;\n    margin-bottom: 5px;\n    font-weight: 600;\n}\n\n.otp-verify-header .form-sub-title {\n    font-size: 14px;\n    color: #202020;\n}\n\n.otp-verify-header .top-bottom-text {\n    font-size: 18px;\n    font-weight: 600;\n    color: #3B4DA0;\n    margin: 40px 0;\n    text-align: center;\n}\n\n.otp-verify input {\n    width: 40px;\n    height: 44px;\n    color: #3B4DA0;\n    background: #3A3A3A00;\n    border: 1px solid #D2D2D2;\n    border-radius: 5px;\n}\n\n.otp-verify input:focus {\n    border-color: #3B4DA0;\n}\n\n.login-bottom-text p {\n    font-size: 18px;\n    color: #fff;\n}\n\n.home-bg .form-section-section {\n    width: 40%;\n}\n\n.login-btn {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n    padding: 10px 15px;\n}\n\n.login-btn:focus {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n}\n\n.modal-title {\n    font-size: 17px;\n    font-weight: 600;\n    color: #202020;\n    margin-bottom: 5px;\n}\n\n.modal-txt {\n    font-size: 13px;\n    color: #202020;\n}\n\n.modal-dialog-centered {\n    display: flex;\n    align-items: center;\n    min-height: calc(100% - (.5rem * 2));\n}\n\n.login-form .form-group {\n    margin-bottom: 15px !important;\n}\n\n.payment-list {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    display: flex;\n    align-items: center;\n}\n\n.payment-list li a {\n    text-decoration: none;\n    text-decoration: none;\n    padding: 10px 20px;\n    background: hsl(0deg 0% 100%);\n    color: #3b4da0;\n    margin: 20px 0;\n    display: block;\n    border-radius: 5px;\n}\n\n.payment-list li a.active {\n    background-color: #3b4da0;\n    color: #fff;\n}\n\n@media only screen and (max-width: 600px) {\n    .home-bg.d-flex {\n        display: block !important;\n    }\n    .home-bg {\n        padding: 50px 0;\n    }\n    .home-bg .left-section {\n        height: 100vh;\n        width: 100%;\n        display: none;\n    }\n    .home-bg .form-section-section {\n        width: 100%;\n    }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3BheW1lbnQtZGV0YWlscy9wYXltZW50LWRldGFpbHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLDhCQUE4QjtJQUM5QixpQ0FBaUM7QUFDckM7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLGVBQWU7SUFDZixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCOztlQUVXO0lBQ1gsV0FBVztJQUNYLGlDQUFpQztJQUNqQyxrQkFBa0I7QUFDdEI7O0FBR0E7O0dBRUc7O0FBRUg7SUFDSSxXQUFXO0lBQ1gsY0FBYztJQUNkLFdBQVc7SUFDWCxZQUFZO0lBQ1osaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixxQkFBcUI7SUFDckIsY0FBYztJQUNkLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksVUFBVTtJQUNWLDRCQUE0QjtJQUM1QixzQkFBc0I7SUFDdEIsb0JBQWlCO09BQWpCLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0Isa0JBQWtCO0lBQ2xCLDRCQUE0QjtJQUM1QiwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGVBQWU7SUFDZixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsY0FBYztJQUNkLGtCQUFrQjtJQUNsQixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsY0FBYztBQUNsQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLGNBQWM7SUFDZCxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGNBQWM7SUFDZCxxQkFBcUI7SUFDckIseUJBQXlCO0lBQ3pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxrR0FBa0c7SUFDbEcsOEVBQThFO0lBQzlFLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtHQUFrRztJQUNsRyw4RUFBOEU7SUFDOUUsV0FBVztJQUNYLG1CQUFtQjtJQUNuQix5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsY0FBYztBQUNsQjs7QUFFQTtJQUVJLGFBQWE7SUFFYixtQkFBbUI7SUFDbkIsb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLFVBQVU7SUFDVixTQUFTO0lBQ1QsYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLDZCQUE2QjtJQUM3QixjQUFjO0lBQ2QsY0FBYztJQUNkLGNBQWM7SUFDZCxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsV0FBVztBQUNmOztBQUVBO0lBQ0k7UUFDSSx5QkFBeUI7SUFDN0I7SUFDQTtRQUNJLGVBQWU7SUFDbkI7SUFDQTtRQUNJLGFBQWE7UUFDYixXQUFXO1FBQ1gsYUFBYTtJQUNqQjtJQUNBO1FBQ0ksV0FBVztJQUNmO0FBQ0oiLCJmaWxlIjoic3JjL2FwcC9zaGFyZWQvcGF5bWVudC1kZXRhaWxzL3BheW1lbnQtZGV0YWlscy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keSB7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbCAhaW1wb3J0YW50O1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGUgIWltcG9ydGFudDtcbn1cblxuLnBheW1lbnQtZm9ybSB7XG4gICAgYmFja2dyb3VuZDogI0YzRjJGNztcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgcGFkZGluZzogMjBweDtcbn1cblxuLmZvcm0tZ3JvdXA+bGFiZWwge1xuICAgIHBhZGRpbmc6IDFweCAzcHg7XG4gICAgbWFyZ2luOiAwcHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAjMjAyMDIwO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjI7XG4gICAgLyogcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDE1cHg7XG4gICAgdG9wOiAwcHg7ICovXG4gICAgei1pbmRleDogMTE7XG4gICAgLyogdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpOyAqL1xuICAgIG1hcmdpbi1ib3R0b206IDZweDtcbn1cblxuXG4vKiAuaG9tZS1iZyB7XG4gICAgaGVpZ2h0OiA0MDBweDtcbn0gKi9cblxuLmZvcm0tY29udHJvbCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA0MHB4O1xuICAgIHBhZGRpbmc6IDZweCAxMnB4O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBsaW5lLWhlaWdodDogMS41Mzg0NjI7XG4gICAgY29sb3I6ICMyMDIwMjA7XG4gICAgYmFja2dyb3VuZDogI0ZGRkZGRjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRDZENkQ2O1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLmhvbWUtYmcgLmxlZnQtc2VjdGlvbiB7XG4gICAgd2lkdGg6IDYwJTtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogYm90dG9tO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAyMHB4O1xuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDIwcHg7XG59XG5cbi5sb2dpbi1ib3R0b20tdGV4dCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMjBweDtcbiAgICBsZWZ0OiAzMHB4O1xufVxuXG4ubG9naW4tYm90dG9tLXRleHQgaDQge1xuICAgIGZvbnQtc2l6ZTogMzRweDtcbiAgICBjb2xvcjogI2ZmZjtcbn1cblxuLm90cC12ZXJpZnktaGVhZGVyIC5mb3JtLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDIycHg7XG4gICAgY29sb3I6ICMzQjREQTA7XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5vdHAtdmVyaWZ5LWhlYWRlciAuZm9ybS1zdWItdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogIzIwMjAyMDtcbn1cblxuLm90cC12ZXJpZnktaGVhZGVyIC50b3AtYm90dG9tLXRleHQge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiAjM0I0REEwO1xuICAgIG1hcmdpbjogNDBweCAwO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLm90cC12ZXJpZnkgaW5wdXQge1xuICAgIHdpZHRoOiA0MHB4O1xuICAgIGhlaWdodDogNDRweDtcbiAgICBjb2xvcjogIzNCNERBMDtcbiAgICBiYWNrZ3JvdW5kOiAjM0EzQTNBMDA7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI0QyRDJEMjtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5vdHAtdmVyaWZ5IGlucHV0OmZvY3VzIHtcbiAgICBib3JkZXItY29sb3I6ICMzQjREQTA7XG59XG5cbi5sb2dpbi1ib3R0b20tdGV4dCBwIHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgY29sb3I6ICNmZmY7XG59XG5cbi5ob21lLWJnIC5mb3JtLXNlY3Rpb24tc2VjdGlvbiB7XG4gICAgd2lkdGg6IDQwJTtcbn1cblxuLmxvZ2luLWJ0biB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCB2YXIoLS11bm5hbWVkLWNvbG9yLTNiNGRhMCkgMTAwJSkgMCUgMCU7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCAjM0I0REEwIDEwMCUpIDAlIDAlO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDQ4cHg7XG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XG59XG5cbi5sb2dpbi1idG46Zm9jdXMge1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzRGNjRDNCAwJSwgdmFyKC0tdW5uYW1lZC1jb2xvci0zYjRkYTApIDEwMCUpIDAlIDAlO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzRGNjRDNCAwJSwgIzNCNERBMCAxMDAlKSAwJSAwJTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiA0OHB4O1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5tb2RhbC10aXRsZSB7XG4gICAgZm9udC1zaXplOiAxN3B4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6ICMyMDIwMjA7XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xufVxuXG4ubW9kYWwtdHh0IHtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgY29sb3I6ICMyMDIwMjA7XG59XG5cbi5tb2RhbC1kaWFsb2ctY2VudGVyZWQge1xuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwJSAtICguNXJlbSAqIDIpKTtcbn1cblxuLmxvZ2luLWZvcm0gLmZvcm0tZ3JvdXAge1xuICAgIG1hcmdpbi1ib3R0b206IDE1cHggIWltcG9ydGFudDtcbn1cblxuLnBheW1lbnQtbGlzdCB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBwYWRkaW5nOiAwO1xuICAgIG1hcmdpbjogMDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5wYXltZW50LWxpc3QgbGkgYSB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgYmFja2dyb3VuZDogaHNsKDBkZWcgMCUgMTAwJSk7XG4gICAgY29sb3I6ICMzYjRkYTA7XG4gICAgbWFyZ2luOiAyMHB4IDA7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4ucGF5bWVudC1saXN0IGxpIGEuYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2I0ZGEwO1xuICAgIGNvbG9yOiAjZmZmO1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgLmhvbWUtYmcuZC1mbGV4IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcbiAgICB9XG4gICAgLmhvbWUtYmcge1xuICAgICAgICBwYWRkaW5nOiA1MHB4IDA7XG4gICAgfVxuICAgIC5ob21lLWJnIC5sZWZ0LXNlY3Rpb24ge1xuICAgICAgICBoZWlnaHQ6IDEwMHZoO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gICAgLmhvbWUtYmcgLmZvcm0tc2VjdGlvbi1zZWN0aW9uIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/shared/payment-details/payment-details.component.ts": function srcAppSharedPaymentDetailsPaymentDetailsComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PaymentDetailsComponent", function () {
      return PaymentDetailsComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var PaymentDetailsComponent = /*#__PURE__*/function () {
      function PaymentDetailsComponent() {
        _classCallCheck(this, PaymentDetailsComponent);
      }

      _createClass(PaymentDetailsComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          $(".payment-form").addClass("hide");
          $(document).on('click', '.payCheque', function () {
            $(".payment-form").addClass("hide");
          });
          $(document).on('click', '.pay_debit_card', function () {
            $(".payment-form").removeClass("hide");
          });
          $("#start_date").datepicker({
            format: "mm-yyyy",
            startView: "months",
            minViewMode: "months",
            startDate: new Date(),
            orientation: 'bottom',
            autoclose: true
          });
        }
      }]);

      return PaymentDetailsComponent;
    }();

    PaymentDetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-payment-details',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./payment-details.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/payment-details/payment-details.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./payment-details.component.css */
      "./src/app/shared/payment-details/payment-details.component.css"))["default"]]
    })], PaymentDetailsComponent);
    /***/
  },

  /***/
  "./src/app/shared/register/register.component.css": function srcAppSharedRegisterRegisterComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "body {\n    display: table-cell !important;\n    vertical-align: middle !important;\n}\n\n.form-group>label {\n    padding: 1px 3px;\n    margin: 0px;\n    font-size: 14px;\n    color: #8F8F8F;\n    line-height: 1.2;\n    position: absolute;\n    left: 15px;\n    top: 0px;\n    z-index: 11;\n    transform: translateY(-50%);\n    background-color: #fff;\n}\n\n/* .home-bg {\n    height: 400px;\n} */\n\n.form-control {\n    width: 100%;\n    display: block;\n    width: 100%;\n    height: 45px;\n    padding: 6px 12px;\n    font-size: 16px;\n    line-height: 1.538462;\n    color: #202020;\n    background: #FFFFFF1A;\n    border: 1px solid #D2D2D2;\n    border-radius: 25px;\n}\n\n.login {\n    width: 100%;\n    max-width: 100%;\n}\n\n.home-bg .left-section {\n    /* width: 60%; */\n    background-repeat: no-repeat;\n    background-size: cover;\n    -o-object-fit: cover;\n       object-fit: cover;\n    background-position: bottom;\n    position: relative;\n    border-top-left-radius: 20px;\n    border-bottom-left-radius: 20px;\n}\n\n.login-bottom-text {\n    position: absolute;\n    bottom: 20px;\n    left: 30px;\n}\n\n.login-bottom-text h4 {\n    font-size: 34px;\n    color: #fff;\n}\n\n.otp-verify-header .form-title {\n    font-size: 22px;\n    color: #3B4DA0;\n    margin-bottom: 5px;\n    font-weight: 600;\n}\n\n.otp-verify-header .form-sub-title {\n    font-size: 14px;\n    color: #202020;\n}\n\n.otp-verify-header .top-bottom-text {\n    font-size: 18px;\n    font-weight: 600;\n    color: #3B4DA0;\n    margin: 40px 0;\n    text-align: center;\n}\n\n.otp-verify input {\n    width: 40px;\n    height: 44px;\n    color: #3B4DA0;\n    background: #3A3A3A00;\n    border: 1px solid #D2D2D2;\n    border-radius: 5px;\n}\n\n.otp-verify input:focus {\n    border-color: #3B4DA0;\n}\n\n.login-bottom-text p {\n    font-size: 18px;\n    color: #fff;\n}\n\n.home-bg .form-section-section {\n    width: 100%;\n}\n\n.login-btn {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n    padding: 10px 15px;\n}\n\n.login-btn:focus {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n}\n\n.input-right-section {\n    position: absolute;\n    top: 50%;\n    right: 15px;\n    transform: translateY(-50%);\n    font-size: 14px;\n    color: #3B4DA0;\n    display: flex;\n    align-items: center;\n    cursor: pointer;\n}\n\n.input-right-section img {\n    width: 15px;\n    margin-right: 5px;\n}\n\n.checkbox .label-btn {\n    padding: 5px 2px;\n    text-align: center;\n    display: block;\n    background-color: #fff;\n    color: #3B4DA0;\n    cursor: pointer;\n    width: 110px;\n    height: 80px;\n    background: #FFFFFF1A;\n    border: 1px solid #3B4DA0;\n    border-radius: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.checkbox input:checked+.label-btn {\n    color: #fff;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    box-shadow: 0px 0px 10px #00000030;\n    border-radius: 10px;\n}\n\n.checkbox,\n.radio {\n    margin-top: 0;\n    margin-right: 20px;\n}\n\n.plan-radio {\n    display: flex;\n    align-items: center;\n    margin-bottom: 20px;\n    flex-wrap: wrap;\n}\n\n.plan-radio .checkbox {\n    width: 110px;\n    height: 80px;\n    /* background: #FFFFFF1A;\n    border: 1px solid #797979;\n    border-radius: 10px; */\n}\n\n.checkbox input[type=checkbox],\n.checkbox-inline input[type=checkbox],\n.radio input[type=radio],\n.radio-inline input[type=radio] {\n    position: absolute;\n}\n\n.add-plan {\n    width: 110px;\n    height: 80px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: #FFFFFF1A;\n    border: 1px solid #D2D2D2;\n    border-radius: 10px;\n    margin-bottom: 10px;\n}\n\n.add-plan>div {\n    text-align: center;\n}\n\n.add-plan h4 {\n    width: 100%;\n    font-size: 16px;\n    color: #666667;\n    font-weight: medium;\n    margin: 0;\n}\n\n.add-plan span {\n    width: 100%;\n    display: block;\n    font-size: 14px;\n    color: #666667;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSw4QkFBOEI7SUFDOUIsaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxlQUFlO0lBQ2YsY0FBYztJQUNkLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLFFBQVE7SUFDUixXQUFXO0lBQ1gsMkJBQTJCO0lBQzNCLHNCQUFzQjtBQUMxQjs7QUFHQTs7R0FFRzs7QUFFSDtJQUNJLFdBQVc7SUFDWCxjQUFjO0lBQ2QsV0FBVztJQUNYLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQixjQUFjO0lBQ2QscUJBQXFCO0lBQ3JCLHlCQUF5QjtJQUN6QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQiw0QkFBNEI7SUFDNUIsc0JBQXNCO0lBQ3RCLG9CQUFpQjtPQUFqQixpQkFBaUI7SUFDakIsMkJBQTJCO0lBQzNCLGtCQUFrQjtJQUNsQiw0QkFBNEI7SUFDNUIsK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztBQUNmOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxjQUFjO0lBQ2Qsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixjQUFjO0lBQ2QscUJBQXFCO0lBQ3JCLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztBQUNmOztBQUVBO0lBQ0ksV0FBVztBQUNmOztBQUVBO0lBQ0ksa0dBQWtHO0lBQ2xHLDhFQUE4RTtJQUM5RSxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrR0FBa0c7SUFDbEcsOEVBQThFO0lBQzlFLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUixXQUFXO0lBS1gsMkJBQTJCO0lBQzNCLGVBQWU7SUFDZixjQUFjO0lBQ2QsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksV0FBVztJQUNYLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsY0FBYztJQUNkLHNCQUFzQjtJQUN0QixjQUFjO0lBQ2QsZUFBZTtJQUNmLFlBQVk7SUFDWixZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLHlCQUF5QjtJQUN6QixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsOEVBQThFO0lBQzlFLGtDQUFrQztJQUNsQyxtQkFBbUI7QUFDdkI7O0FBRUE7O0lBRUksYUFBYTtJQUNiLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osWUFBWTtJQUNaOzswQkFFc0I7QUFDMUI7O0FBRUE7Ozs7SUFJSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osWUFBWTtJQUNaLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLHFCQUFxQjtJQUNyQix5QkFBeUI7SUFDekIsbUJBQW1CO0lBQ25CLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxlQUFlO0lBQ2YsY0FBYztJQUNkLG1CQUFtQjtJQUNuQixTQUFTO0FBQ2I7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsY0FBYztJQUNkLGVBQWU7SUFDZixjQUFjO0FBQ2xCIiwiZmlsZSI6InNyYy9hcHAvc2hhcmVkL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJib2R5IHtcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsICFpbXBvcnRhbnQ7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZSAhaW1wb3J0YW50O1xufVxuXG4uZm9ybS1ncm91cD5sYWJlbCB7XG4gICAgcGFkZGluZzogMXB4IDNweDtcbiAgICBtYXJnaW46IDBweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6ICM4RjhGOEY7XG4gICAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMTVweDtcbiAgICB0b3A6IDBweDtcbiAgICB6LWluZGV4OiAxMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cblxuXG4vKiAuaG9tZS1iZyB7XG4gICAgaGVpZ2h0OiA0MDBweDtcbn0gKi9cblxuLmZvcm0tY29udHJvbCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA0NXB4O1xuICAgIHBhZGRpbmc6IDZweCAxMnB4O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBsaW5lLWhlaWdodDogMS41Mzg0NjI7XG4gICAgY29sb3I6ICMyMDIwMjA7XG4gICAgYmFja2dyb3VuZDogI0ZGRkZGRjFBO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEMkQyRDI7XG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcbn1cblxuLmxvZ2luIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG59XG5cbi5ob21lLWJnIC5sZWZ0LXNlY3Rpb24ge1xuICAgIC8qIHdpZHRoOiA2MCU7ICovXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGJvdHRvbTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMjBweDtcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAyMHB4O1xufVxuXG4ubG9naW4tYm90dG9tLXRleHQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDIwcHg7XG4gICAgbGVmdDogMzBweDtcbn1cblxuLmxvZ2luLWJvdHRvbS10ZXh0IGg0IHtcbiAgICBmb250LXNpemU6IDM0cHg7XG4gICAgY29sb3I6ICNmZmY7XG59XG5cbi5vdHAtdmVyaWZ5LWhlYWRlciAuZm9ybS10aXRsZSB7XG4gICAgZm9udC1zaXplOiAyMnB4O1xuICAgIGNvbG9yOiAjM0I0REEwO1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xufVxuXG4ub3RwLXZlcmlmeS1oZWFkZXIgLmZvcm0tc3ViLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6ICMyMDIwMjA7XG59XG5cbi5vdHAtdmVyaWZ5LWhlYWRlciAudG9wLWJvdHRvbS10ZXh0IHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogIzNCNERBMDtcbiAgICBtYXJnaW46IDQwcHggMDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5vdHAtdmVyaWZ5IGlucHV0IHtcbiAgICB3aWR0aDogNDBweDtcbiAgICBoZWlnaHQ6IDQ0cHg7XG4gICAgY29sb3I6ICMzQjREQTA7XG4gICAgYmFja2dyb3VuZDogIzNBM0EzQTAwO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEMkQyRDI7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4ub3RwLXZlcmlmeSBpbnB1dDpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiAjM0I0REEwO1xufVxuXG4ubG9naW4tYm90dG9tLXRleHQgcCB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGNvbG9yOiAjZmZmO1xufVxuXG4uaG9tZS1iZyAuZm9ybS1zZWN0aW9uLXNlY3Rpb24ge1xuICAgIHdpZHRoOiAxMDAlO1xufVxuXG4ubG9naW4tYnRuIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsIHZhcigtLXVubmFtZWQtY29sb3ItM2I0ZGEwKSAxMDAlKSAwJSAwJTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsICMzQjREQTAgMTAwJSkgMCUgMCU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogNDhweDtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcbn1cblxuLmxvZ2luLWJ0bjpmb2N1cyB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCB2YXIoLS11bm5hbWVkLWNvbG9yLTNiNGRhMCkgMTAwJSkgMCUgMCU7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCAjM0I0REEwIDEwMCUpIDAlIDAlO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDQ4cHg7XG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmlucHV0LXJpZ2h0LXNlY3Rpb24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICByaWdodDogMTVweDtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAjM0I0REEwO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5pbnB1dC1yaWdodC1zZWN0aW9uIGltZyB7XG4gICAgd2lkdGg6IDE1cHg7XG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG59XG5cbi5jaGVja2JveCAubGFiZWwtYnRuIHtcbiAgICBwYWRkaW5nOiA1cHggMnB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIGNvbG9yOiAjM0I0REEwO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB3aWR0aDogMTEwcHg7XG4gICAgaGVpZ2h0OiA4MHB4O1xuICAgIGJhY2tncm91bmQ6ICNGRkZGRkYxQTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjM0I0REEwO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uY2hlY2tib3ggaW5wdXQ6Y2hlY2tlZCsubGFiZWwtYnRuIHtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsICMzQjREQTAgMTAwJSkgMCUgMCU7XG4gICAgYm94LXNoYWRvdzogMHB4IDBweCAxMHB4ICMwMDAwMDAzMDtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuXG4uY2hlY2tib3gsXG4ucmFkaW8ge1xuICAgIG1hcmdpbi10b3A6IDA7XG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xufVxuXG4ucGxhbi1yYWRpbyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4ucGxhbi1yYWRpbyAuY2hlY2tib3gge1xuICAgIHdpZHRoOiAxMTBweDtcbiAgICBoZWlnaHQ6IDgwcHg7XG4gICAgLyogYmFja2dyb3VuZDogI0ZGRkZGRjFBO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICM3OTc5Nzk7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDsgKi9cbn1cblxuLmNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdLFxuLmNoZWNrYm94LWlubGluZSBpbnB1dFt0eXBlPWNoZWNrYm94XSxcbi5yYWRpbyBpbnB1dFt0eXBlPXJhZGlvXSxcbi5yYWRpby1pbmxpbmUgaW5wdXRbdHlwZT1yYWRpb10ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuLmFkZC1wbGFuIHtcbiAgICB3aWR0aDogMTEwcHg7XG4gICAgaGVpZ2h0OiA4MHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kOiAjRkZGRkZGMUE7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI0QyRDJEMjtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5hZGQtcGxhbj5kaXYge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmFkZC1wbGFuIGg0IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgY29sb3I6ICM2NjY2Njc7XG4gICAgZm9udC13ZWlnaHQ6IG1lZGl1bTtcbiAgICBtYXJnaW46IDA7XG59XG5cbi5hZGQtcGxhbiBzcGFuIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6ICM2NjY2Njc7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/shared/register/register.component.ts": function srcAppSharedRegisterRegisterComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RegisterComponent", function () {
      return RegisterComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
    /* harmony import */


    var _service_utils_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../service/utils.service */
    "./src/app/service/utils.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../service/authentication.service */
    "./src/app/service/authentication.service.ts");

    var RegisterComponent = /*#__PURE__*/function () {
      function RegisterComponent(formBuilder, toastr, utils, api, router) {
        _classCallCheck(this, RegisterComponent);

        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.utils = utils;
        this.api = api;
        this.router = router;
        this.hide = true;
        this.hide1 = true;
        this.submitted = false;
        this.storeTradingLicense = [];
        this.storeSignatoryId = [];
        this.storeVatCertificate = [];
        this.ibanCertificate = [];
        this.checkbox = false;
      }

      _createClass(RegisterComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.getCountryList();
          this.fetchSellerDetails();
          this.profileDetailsForm = this.formBuilder.group({
            first_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            last_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            // country_code: ['+971'],
            mobile_number: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(12)]],
            landline_no: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            authorized_signatory_email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            store_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            store_business_type: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            store_commercial_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            store_address: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            store_country: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            store_city: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            store_trading_license: [''],
            store_signatory_id: [''],
            // store_signatory_number: [''],
            account_number: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            account_holder_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            bank_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            swift_code: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            iban_certificate: [''],
            // password: ['', [Validators.required, Validators.minLength(8)]],
            // confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
            selected_plan: [''],
            checkbox: [false]
          });
        } // convenience getter for easy access to form fields

      }, {
        key: "f",
        get: function get() {
          return this.profileDetailsForm.controls;
        }
      }, {
        key: "onCountryChange",
        value: function onCountryChange(event) {
          this.country_code = "+" + event.dialCode;
          console.log(this.country_code);
        }
      }, {
        key: "fetchSellerDetails",
        value: function fetchSellerDetails() {
          var _this11 = this;

          var currentUser = JSON.parse(localStorage.getItem("currentUser"));
          var userId = currentUser._id;
          var data = {
            "_id": userId
          };

          if (userId) {
            this.api.fetchSellerDetails(data).subscribe(function (res) {
              // console.log(res['response'])
              _this11.sellerData = res['response'];
            }, function (err) {
              console.log(err);
            });
          }
        }
      }, {
        key: "onCheckboxChange",
        value: function onCheckboxChange() {
          var _this12 = this;

          if (this.checkbox) {
            setTimeout(function () {
              _this12.checkbox = false;
            });
          } else {
            setTimeout(function () {
              _this12.checkbox = true;
            });
          }
        }
      }, {
        key: "upload_store_trading_license",
        value: function upload_store_trading_license(event) {
          var _this13 = this;

          var uploadData = new FormData();
          this.uploadStoreTradingimage = event.target.files[0];
          this.name = this.uploadStoreTradingimage.name;
          uploadData.append('upload_seller_file', event.target.files[0]);
          this.api.uploadFile(uploadData).subscribe(function (res) {
            console.log(res.response.imageUrl);

            _this13.storeTradingLicense.push(res.response.imageUrl);
          });
        }
      }, {
        key: "upload_store_signatory_id",
        value: function upload_store_signatory_id(event) {
          var _this14 = this;

          var uploadData = new FormData();
          this.uploadStoreSignatoryId = event.target.files[0];
          this.signatoryId = this.uploadStoreSignatoryId.name;
          uploadData.append('upload_seller_file', event.target.files[0]);
          this.api.uploadFile(uploadData).subscribe(function (res) {
            console.log(res.response.imageUrl);

            _this14.storeSignatoryId.push(res.response.imageUrl);
          });
        }
      }, {
        key: "upload_store_vat_certificate",
        value: function upload_store_vat_certificate(event) {
          var _this15 = this;

          var uploadData = new FormData();
          this.uploadStoreVatCertificate = event.target.files[0];
          this.vatCertificate = this.uploadStoreVatCertificate.name;
          uploadData.append('upload_seller_file', event.target.files[0]);
          this.api.uploadFile(uploadData).subscribe(function (res) {
            console.log(res.response.imageUrl);

            _this15.storeVatCertificate.push(res.response.imageUrl);
          });
        }
      }, {
        key: "upload_iban_certificate",
        value: function upload_iban_certificate(event) {
          var _this16 = this;

          var uploadData = new FormData();
          this.uploadIbanCertificate = event.target.files[0];
          this.ibanCert = this.uploadIbanCertificate.name;
          uploadData.append('upload_seller_file', event.target.files[0]);
          this.api.uploadFile(uploadData).subscribe(function (res) {
            console.log(res.response.imageUrl);

            _this16.ibanCertificate.push(res.response.imageUrl);
          });
        }
      }, {
        key: "onPlanChange",
        value: function onPlanChange(value) {
          console.log(" Value is : ", value);
          this.selectedPlan = value;
        }
      }, {
        key: "nameEvent",
        value: function nameEvent(e) {
          // console.log(e); 
          // console.log(e.target.value);
          // console.log(e.key);
          if (e.code == 'Space' && e.target.value == '') {
            e.preventDefault();
          }
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this17 = this;

          // debugger
          this.submitted = true;

          if (this.country_code == undefined || this.country_code == "") {
            return this.toastr.error("Please select country code");
          } // if(this.profileDetailsForm.value.password != this.profileDetailsForm.value.confirmPassword){
          //   return this.toastr.error("Password does not match")
          // }
          // if(this.profileDetailsForm.value.password != this.profileDetailsForm.value.confirmPassword){
          //   return this.toastr.error("Password does not match")
          // }


          if (this.storeTradingLicense.length == 0) {
            return this.toastr.error("Store trading license is required");
          }

          if (this.storeSignatoryId.length == 0) {
            return this.toastr.error("Authorised signatory emirated id is required");
          } // if(this.storeVatCertificate.length == 0){
          //   return this.toastr.error("Signatory emirated id is required")
          // }
          // if(this.ibanCertificate.length === 0){
          //   return this.toastr.error("IBAN certificate is required")
          // }


          if (this.selectedPlan == undefined || this.selectedPlan == "") {
            return this.toastr.error("Please select plan");
          }

          if (this.checkbox == false) {
            return this.toastr.error("Please accept terms & conditions");
          } // stop here if form is invalid


          if (this.profileDetailsForm.invalid) {
            return;
          }

          var profileData = {
            first_name: this.profileDetailsForm.value.first_name,
            last_name: this.profileDetailsForm.value.last_name,
            country_code: this.country_code,
            mobile_number: this.profileDetailsForm.value.mobile_number,
            landline_no: this.profileDetailsForm.value.landline_no,
            email: this.profileDetailsForm.value.email,
            authorized_signatory_email: this.profileDetailsForm.value.authorized_signatory_email,
            store_name: this.profileDetailsForm.value.store_name,
            store_business_type: this.profileDetailsForm.value.store_business_type,
            store_commercial_name: this.profileDetailsForm.value.store_commercial_name,
            store_address: this.profileDetailsForm.value.store_address,
            store_city: this.profileDetailsForm.value.store_city,
            store_country: this.profileDetailsForm.value.store_country,
            store_trading_license: this.storeTradingLicense[0],
            store_signatory_id: this.storeSignatoryId[0],
            // store_signatory_number: this.storeVatCertificate[0],
            iban_certificate: this.ibanCertificate[0],
            account_number: this.profileDetailsForm.value.account_number,
            account_holder_name: this.profileDetailsForm.value.account_holder_name,
            bank_name: this.profileDetailsForm.value.bank_name,
            swift_code: this.profileDetailsForm.value.swift_code,
            selected_plan: this.profileDetailsForm.value.selected_plan,
            is_bank_created: true
          }; // password: this.profileDetailsForm.value.password,
          // debugger

          this.api.addBankDetails(profileData).subscribe(function (data) {
            console.log('success', data);
            console.log(data["response"]);
            console.log(":::::::::::::::::"); // $('#success-modal').modal('show')

            _this17.toastr.success("Thank you for Registration");

            _this17.router.navigateByUrl("/thank-you"); // $().append()
            // localStorage.setItem("currentUser",JSON.stringify(data["response"]))
            // this.router.navigate(['/home/dashboard']);

          }, function (error) {
            console.log('oops', error.error.message);

            _this17.toastr.error(error.error.message);
          });
        }
      }, {
        key: "getCountryList",
        value: function getCountryList() {
          var _this18 = this;

          this.api.get_all_country().subscribe(function (res) {
            _this18.country_list = res['response'];
          }, function (err) {
            console.log(err);
          });
        }
      }, {
        key: "countryChange",
        value: function countryChange(e) {
          var id = e.target.options[e.target.options.selectedIndex].id;
          this.selected_country = id;
          this.getCityByCountry(id);
        }
      }, {
        key: "getCityByCountry",
        value: function getCityByCountry(countryCode) {
          var _this19 = this;

          var data = {
            "countryCode": countryCode
          };
          this.api.get_city_of_country(data).subscribe(function (res) {
            _this19.city_list = res['response'];
          }, function (err) {
            console.log(err);
          });
        }
      }, {
        key: "telInputObject",
        value: function telInputObject(obj) {// console.log(obj);
          // obj.setCountry('in');
        }
      }, {
        key: "gotodashboard",
        value: function gotodashboard() {
          // $('#success-modal').modal('hide')
          this.router.navigate(['/home/dashboard']);
        }
      }]);

      return RegisterComponent;
    }();

    RegisterComponent.ctorParameters = function () {
      return [{
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]
      }, {
        type: _service_utils_service__WEBPACK_IMPORTED_MODULE_4__["UtilsService"]
      }, {
        type: _service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
      }];
    };

    RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-register',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./register.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/register/register.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./register.component.css */
      "./src/app/shared/register/register.component.css"))["default"]]
    })], RegisterComponent);
    /***/
  },

  /***/
  "./src/app/shared/shared-routing.module.ts": function srcAppSharedSharedRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SharedRoutingModule", function () {
      return SharedRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./login/login.component */
    "./src/app/shared/login/login.component.ts");
    /* harmony import */


    var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./forgot-password/forgot-password.component */
    "./src/app/shared/forgot-password/forgot-password.component.ts");
    /* harmony import */


    var _signup_signup_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./signup/signup.component */
    "./src/app/shared/signup/signup.component.ts");
    /* harmony import */


    var _otp_verification_otp_verification_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./otp-verification/otp-verification.component */
    "./src/app/shared/otp-verification/otp-verification.component.ts");
    /* harmony import */


    var _payment_details_payment_details_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./payment-details/payment-details.component */
    "./src/app/shared/payment-details/payment-details.component.ts");
    /* harmony import */


    var _register_register_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./register/register.component */
    "./src/app/shared/register/register.component.ts");
    /* harmony import */


    var _email_verification_email_verification_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./email-verification/email-verification.component */
    "./src/app/shared/email-verification/email-verification.component.ts");
    /* harmony import */


    var _otp_password_verification_otp_password_verification_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ./otp-password-verification/otp-password-verification.component */
    "./src/app/shared/otp-password-verification/otp-password-verification.component.ts");
    /* harmony import */


    var _thank_you_thank_you_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ./thank-you/thank-you.component */
    "./src/app/shared/thank-you/thank-you.component.ts");

    var routes = [{
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    }, {
      path: 'login',
      component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]
    }, {
      path: 'forgot-password',
      component: _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__["ForgotPasswordComponent"]
    }, {
      path: 'sign-up',
      component: _signup_signup_component__WEBPACK_IMPORTED_MODULE_5__["SignupComponent"]
    }, {
      path: 'otp-verification',
      component: _otp_verification_otp_verification_component__WEBPACK_IMPORTED_MODULE_6__["OtpVerificationComponent"]
    }, {
      path: 'payment-details',
      component: _payment_details_payment_details_component__WEBPACK_IMPORTED_MODULE_7__["PaymentDetailsComponent"]
    }, {
      path: 'register',
      component: _register_register_component__WEBPACK_IMPORTED_MODULE_8__["RegisterComponent"]
    }, {
      path: 'email-verification',
      component: _email_verification_email_verification_component__WEBPACK_IMPORTED_MODULE_9__["EmailVerificationComponent"]
    }, {
      path: 'otp-password-verification',
      component: _otp_password_verification_otp_password_verification_component__WEBPACK_IMPORTED_MODULE_10__["OtpPasswordVerificationComponent"]
    }, {
      path: 'thank-you',
      component: _thank_you_thank_you_component__WEBPACK_IMPORTED_MODULE_11__["ThankYouComponent"]
    }];

    var SharedRoutingModule = function SharedRoutingModule() {
      _classCallCheck(this, SharedRoutingModule);
    };

    SharedRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], SharedRoutingModule);
    /***/
  },

  /***/
  "./src/app/shared/shared.module.ts": function srcAppSharedSharedModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SharedModule", function () {
      return SharedModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/material/tabs */
    "./node_modules/@angular/material/esm2015/tabs.js");
    /* harmony import */


    var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/material/stepper */
    "./node_modules/@angular/material/esm2015/stepper.js");
    /* harmony import */


    var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/material/icon */
    "./node_modules/@angular/material/esm2015/icon.js");
    /* harmony import */


    var ng2_tel_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ng2-tel-input */
    "./node_modules/ng2-tel-input/esm2015/ng2-tel-input.js");
    /* harmony import */


    var _shared_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./shared-routing.module */
    "./src/app/shared/shared-routing.module.ts");
    /* harmony import */


    var _login_login_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./login/login.component */
    "./src/app/shared/login/login.component.ts");
    /* harmony import */


    var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ./forgot-password/forgot-password.component */
    "./src/app/shared/forgot-password/forgot-password.component.ts");
    /* harmony import */


    var _signup_signup_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ./signup/signup.component */
    "./src/app/shared/signup/signup.component.ts");
    /* harmony import */


    var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! @angular/material/form-field */
    "./node_modules/@angular/material/esm2015/form-field.js");
    /* harmony import */


    var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! @angular/material/input */
    "./node_modules/@angular/material/esm2015/input.js");
    /* harmony import */


    var _common_comman_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ../common/comman.module */
    "./src/app/common/comman.module.ts");
    /* harmony import */


    var _otp_verification_otp_verification_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! ./otp-verification/otp-verification.component */
    "./src/app/shared/otp-verification/otp-verification.component.ts");
    /* harmony import */


    var _payment_details_payment_details_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! ./payment-details/payment-details.component */
    "./src/app/shared/payment-details/payment-details.component.ts");
    /* harmony import */


    var _register_register_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! ./register/register.component */
    "./src/app/shared/register/register.component.ts");
    /* harmony import */


    var _email_verification_email_verification_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! ./email-verification/email-verification.component */
    "./src/app/shared/email-verification/email-verification.component.ts");
    /* harmony import */


    var _otp_password_verification_otp_password_verification_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
    /*! ./otp-password-verification/otp-password-verification.component */
    "./src/app/shared/otp-password-verification/otp-password-verification.component.ts");
    /* harmony import */


    var _thank_you_thank_you_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
    /*! ./thank-you/thank-you.component */
    "./src/app/shared/thank-you/thank-you.component.ts");

    var SharedModule = function SharedModule() {
      _classCallCheck(this, SharedModule);
    };

    SharedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_login_login_component__WEBPACK_IMPORTED_MODULE_9__["LoginComponent"], _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_10__["ForgotPasswordComponent"], _signup_signup_component__WEBPACK_IMPORTED_MODULE_11__["SignupComponent"], _otp_verification_otp_verification_component__WEBPACK_IMPORTED_MODULE_15__["OtpVerificationComponent"], _payment_details_payment_details_component__WEBPACK_IMPORTED_MODULE_16__["PaymentDetailsComponent"], _register_register_component__WEBPACK_IMPORTED_MODULE_17__["RegisterComponent"], _email_verification_email_verification_component__WEBPACK_IMPORTED_MODULE_18__["EmailVerificationComponent"], _otp_password_verification_otp_password_verification_component__WEBPACK_IMPORTED_MODULE_19__["OtpPasswordVerificationComponent"], _thank_you_thank_you_component__WEBPACK_IMPORTED_MODULE_20__["ThankYouComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _shared_routing_module__WEBPACK_IMPORTED_MODULE_8__["SharedRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_5__["MatStepperModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__["MatFormFieldModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInputModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"], ng2_tel_input__WEBPACK_IMPORTED_MODULE_7__["Ng2TelInputModule"], _common_comman_module__WEBPACK_IMPORTED_MODULE_14__["CommanModule"]]
    })], SharedModule);
    /***/
  },

  /***/
  "./src/app/shared/signup/signup.component.css": function srcAppSharedSignupSignupComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "body {\n    display: table-cell !important;\n    vertical-align: middle !important;\n}\n\n.form-group>label {\n    padding: 1px 3px;\n    margin: 0px;\n    font-size: 14px;\n    color: #8F8F8F;\n    line-height: 1.2;\n    position: absolute;\n    left: 15px;\n    top: 0px;\n    z-index: 11;\n    transform: translateY(-50%);\n    background-color: #fff;\n}\n\n.form-group.mat-form-control label {\n    top: 10px !important;\n    left: 25px;\n}\n\n.mat-form-field {\n    border: 0 !important;\n}\n\n/* .home-bg {\n    height: 400px;\n} */\n\n.form-control {\n    width: 100%;\n    display: block;\n    width: 100%;\n    height: 45px;\n    padding: 6px 12px;\n    font-size: 16px;\n    line-height: 1.538462;\n    color: #202020;\n    background: #FFFFFF1A;\n    border: 1px solid #D2D2D2;\n    border-radius: 25px;\n}\n\n.home-bg .left-section {\n    width: 60%;\n    background-repeat: no-repeat;\n    background-size: cover;\n    -o-object-fit: cover;\n       object-fit: cover;\n    background-position: bottom;\n    position: relative;\n    border-top-left-radius: 20px;\n    border-bottom-left-radius: 20px;\n}\n\n.login-bottom-text {\n    position: absolute;\n    bottom: 20px;\n    left: 30px;\n}\n\n.login-bottom-text h4 {\n    font-size: 34px;\n    color: #fff;\n}\n\n.form-title {\n    font-size: 22px;\n    color: #202020;\n    margin-bottom: 5px;\n}\n\n.form-sub-title {\n    font-size: 14px;\n    color: #666667;\n}\n\n.login-bottom-text p {\n    font-size: 18px;\n    color: #fff;\n}\n\n.home-bg .form-section-section {\n    width: 40%;\n}\n\n.login-btn {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n    padding: 10px 15px;\n}\n\n.login-btn:focus {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n}\n\n@media only screen and (max-width: 600px) {\n    .home-bg.d-flex {\n        display: block !important;\n    }\n    .home-bg {\n        padding: 50px 0;\n    }\n    .login-list li {\n        font-size: 14px;\n    }\n    .home-bg .left-section {\n        height: 100vh;\n        width: 100%;\n        display: none;\n    }\n    .home-bg .form-section-section {\n        width: 100%;\n    }\n}\n\n@media only screen and (max-width: 320px) {\n    .login-list li {\n        font-size: 11px;\n    }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3NpZ251cC9zaWdudXAuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLDhCQUE4QjtJQUM5QixpQ0FBaUM7QUFDckM7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLGVBQWU7SUFDZixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsUUFBUTtJQUNSLFdBQVc7SUFDWCwyQkFBMkI7SUFDM0Isc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksb0JBQW9CO0lBQ3BCLFVBQVU7QUFDZDs7QUFFQTtJQUNJLG9CQUFvQjtBQUN4Qjs7QUFHQTs7R0FFRzs7QUFFSDtJQUNJLFdBQVc7SUFDWCxjQUFjO0lBQ2QsV0FBVztJQUNYLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQixjQUFjO0lBQ2QscUJBQXFCO0lBQ3JCLHlCQUF5QjtJQUN6QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsNEJBQTRCO0lBQzVCLHNCQUFzQjtJQUN0QixvQkFBaUI7T0FBakIsaUJBQWlCO0lBQ2pCLDJCQUEyQjtJQUMzQixrQkFBa0I7SUFDbEIsNEJBQTRCO0lBQzVCLCtCQUErQjtBQUNuQzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osVUFBVTtBQUNkOztBQUVBO0lBQ0ksZUFBZTtJQUNmLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGVBQWU7SUFDZixjQUFjO0lBQ2Qsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztBQUNmOztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksa0dBQWtHO0lBQ2xHLDhFQUE4RTtJQUM5RSxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrR0FBa0c7SUFDbEcsOEVBQThFO0lBQzlFLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0k7UUFDSSx5QkFBeUI7SUFDN0I7SUFDQTtRQUNJLGVBQWU7SUFDbkI7SUFDQTtRQUNJLGVBQWU7SUFDbkI7SUFDQTtRQUNJLGFBQWE7UUFDYixXQUFXO1FBQ1gsYUFBYTtJQUNqQjtJQUNBO1FBQ0ksV0FBVztJQUNmO0FBQ0o7O0FBRUE7SUFDSTtRQUNJLGVBQWU7SUFDbkI7QUFDSiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9zaWdudXAvc2lnbnVwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJib2R5IHtcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsICFpbXBvcnRhbnQ7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZSAhaW1wb3J0YW50O1xufVxuXG4uZm9ybS1ncm91cD5sYWJlbCB7XG4gICAgcGFkZGluZzogMXB4IDNweDtcbiAgICBtYXJnaW46IDBweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6ICM4RjhGOEY7XG4gICAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMTVweDtcbiAgICB0b3A6IDBweDtcbiAgICB6LWluZGV4OiAxMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cblxuLmZvcm0tZ3JvdXAubWF0LWZvcm0tY29udHJvbCBsYWJlbCB7XG4gICAgdG9wOiAxMHB4ICFpbXBvcnRhbnQ7XG4gICAgbGVmdDogMjVweDtcbn1cblxuLm1hdC1mb3JtLWZpZWxkIHtcbiAgICBib3JkZXI6IDAgIWltcG9ydGFudDtcbn1cblxuXG4vKiAuaG9tZS1iZyB7XG4gICAgaGVpZ2h0OiA0MDBweDtcbn0gKi9cblxuLmZvcm0tY29udHJvbCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA0NXB4O1xuICAgIHBhZGRpbmc6IDZweCAxMnB4O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBsaW5lLWhlaWdodDogMS41Mzg0NjI7XG4gICAgY29sb3I6ICMyMDIwMjA7XG4gICAgYmFja2dyb3VuZDogI0ZGRkZGRjFBO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEMkQyRDI7XG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcbn1cblxuLmhvbWUtYmcgLmxlZnQtc2VjdGlvbiB7XG4gICAgd2lkdGg6IDYwJTtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogYm90dG9tO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAyMHB4O1xuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDIwcHg7XG59XG5cbi5sb2dpbi1ib3R0b20tdGV4dCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMjBweDtcbiAgICBsZWZ0OiAzMHB4O1xufVxuXG4ubG9naW4tYm90dG9tLXRleHQgaDQge1xuICAgIGZvbnQtc2l6ZTogMzRweDtcbiAgICBjb2xvcjogI2ZmZjtcbn1cblxuLmZvcm0tdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICBjb2xvcjogIzIwMjAyMDtcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG59XG5cbi5mb3JtLXN1Yi10aXRsZSB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAjNjY2NjY3O1xufVxuXG4ubG9naW4tYm90dG9tLXRleHQgcCB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGNvbG9yOiAjZmZmO1xufVxuXG4uaG9tZS1iZyAuZm9ybS1zZWN0aW9uLXNlY3Rpb24ge1xuICAgIHdpZHRoOiA0MCU7XG59XG5cbi5sb2dpbi1idG4ge1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzRGNjRDNCAwJSwgdmFyKC0tdW5uYW1lZC1jb2xvci0zYjRkYTApIDEwMCUpIDAlIDAlO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzRGNjRDNCAwJSwgIzNCNERBMCAxMDAlKSAwJSAwJTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiA0OHB4O1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgcGFkZGluZzogMTBweCAxNXB4O1xufVxuXG4ubG9naW4tYnRuOmZvY3VzIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsIHZhcigtLXVubmFtZWQtY29sb3ItM2I0ZGEwKSAxMDAlKSAwJSAwJTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsICMzQjREQTAgMTAwJSkgMCUgMCU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogNDhweDtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgLmhvbWUtYmcuZC1mbGV4IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcbiAgICB9XG4gICAgLmhvbWUtYmcge1xuICAgICAgICBwYWRkaW5nOiA1MHB4IDA7XG4gICAgfVxuICAgIC5sb2dpbi1saXN0IGxpIHtcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgIH1cbiAgICAuaG9tZS1iZyAubGVmdC1zZWN0aW9uIHtcbiAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICAgIC5ob21lLWJnIC5mb3JtLXNlY3Rpb24tc2VjdGlvbiB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzMjBweCkge1xuICAgIC5sb2dpbi1saXN0IGxpIHtcbiAgICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgIH1cbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/shared/signup/signup.component.ts": function srcAppSharedSignupSignupComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SignupComponent", function () {
      return SignupComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
    /* harmony import */


    var _service_utils_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../service/utils.service */
    "./src/app/service/utils.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _service_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../service/authentication.service */
    "./src/app/service/authentication.service.ts");

    var SignupComponent = /*#__PURE__*/function () {
      function SignupComponent(formBuilder, toastr, utils, api, router) {
        _classCallCheck(this, SignupComponent);

        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.utils = utils;
        this.api = api;
        this.router = router;
        this.hide = true;
        this.hide1 = true;
        this.submitted = false;
      }

      _createClass(SignupComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.registerForm = this.formBuilder.group({
            full_name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            // country_code: [''],
            mobile_number: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(12)]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8)]],
            confirm_password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8)]]
          });
        } // convenience getter for easy access to form fields

      }, {
        key: "f",
        get: function get() {
          return this.registerForm.controls;
        }
      }, {
        key: "onCountryChange",
        value: function onCountryChange(event) {
          this.country_code = "+" + event.dialCode;
          console.log(this.country_code);
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this20 = this;

          this.submitted = true; // stop here if form is invalid

          if (this.registerForm.invalid) {
            return;
          } // var admin = JSON.parse(localStorage.getItem('currentUser'));
          // if(this.registerForm.value.country_code == undefined || this.registerForm.value.country_code == ""){
          //   return this.toastr.error("Please select country code")
          // }


          if (this.country_code == undefined || this.country_code == "") {
            return this.toastr.error("Please select country code");
          }

          if (this.registerForm.value.password != this.registerForm.value.confirm_password) {
            return this.toastr.error("Password do not match");
          }

          var data = {
            full_name: this.registerForm.value.full_name,
            // country_code:this.registerForm.value.country_code,
            country_code: this.country_code,
            mobile_number: this.registerForm.value.mobile_number,
            email: this.registerForm.value.email,
            password: this.registerForm.value.password
          };
          console.log(data);
          this.api.signup(data).subscribe(function (data) {
            console.log('success', data);
            console.log(data["response"]);
            console.log(":::::::::::::::::");

            _this20.toastr.success('LoggIn Successful');

            localStorage.setItem("currentUser", JSON.stringify(data["response"]));

            _this20.router.navigate(['/otp-verification']);
          }, function (error) {
            console.log('oops', error.error.message);

            _this20.toastr.error(error.error.message);
          });
        }
      }, {
        key: "telInputObject",
        value: function telInputObject(obj) {
          console.log(obj);
          obj.setCountry('ae');
        }
      }]);

      return SignupComponent;
    }();

    SignupComponent.ctorParameters = function () {
      return [{
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]
      }, {
        type: _service_utils_service__WEBPACK_IMPORTED_MODULE_4__["UtilsService"]
      }, {
        type: _service_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
      }];
    };

    SignupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-signup',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./signup.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/signup/signup.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./signup.component.css */
      "./src/app/shared/signup/signup.component.css"))["default"]]
    })], SignupComponent);
    /***/
  },

  /***/
  "./src/app/shared/thank-you/thank-you.component.css": function srcAppSharedThankYouThankYouComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "body {\n    display: table-cell !important;\n    vertical-align: middle !important;\n}\n.containerDiv{\n    margin-top: 150px ;\n}\n.form-group>label {\n    padding: 1px 3px;\n    margin: 0px;\n    font-size: 14px;\n    color: #8F8F8F;\n    line-height: 1.2;\n    position: absolute;\n    left: 15px;\n    top: 0px;\n    z-index: 11;\n    transform: translateY(-50%);\n    background-color: #fff;\n}\n/* .home-bg {\n    height: 400px;\n} */\n.form-control {\n    width: 100%;\n    display: block;\n    width: 100%;\n    height: 45px;\n    padding: 6px 12px;\n    font-size: 16px;\n    line-height: 1.538462;\n    color: #202020;\n    background: #FFFFFF1A;\n    border: 1px solid #D2D2D2;\n    border-radius: 25px;\n}\n.login {\n    width: 100%;\n    max-width: 100%;\n}\n.home-bg .left-section {\n    /* width: 60%; */\n    background-repeat: no-repeat;\n    background-size: cover;\n    -o-object-fit: cover;\n       object-fit: cover;\n    background-position: bottom;\n    position: relative;\n    border-top-left-radius: 20px;\n    border-bottom-left-radius: 20px;\n}\n.login-bottom-text {\n    position: absolute;\n    bottom: 20px;\n    left: 30px;\n}\n.login-bottom-text h4 {\n    font-size: 34px;\n    color: #fff;\n}\n.otp-verify-header .form-title {\n    font-size: 22px;\n    color: #3B4DA0;\n    margin-bottom: 5px;\n    font-weight: 600;\n}\n.otp-verify-header .form-sub-title {\n    font-size: 14px;\n    color: #202020;\n}\n.otp-verify-header .top-bottom-text {\n    font-size: 18px;\n    font-weight: 600;\n    color: #3B4DA0;\n    margin: 40px 0;\n    text-align: center;\n}\n.otp-verify input {\n    width: 40px;\n    height: 44px;\n    color: #3B4DA0;\n    background: #3A3A3A00;\n    border: 1px solid #D2D2D2;\n    border-radius: 5px;\n}\n.otp-verify input:focus {\n    border-color: #3B4DA0;\n}\n.login-bottom-text p {\n    font-size: 18px;\n    color: #fff;\n}\n.home-bg .form-section-section {\n    width: 100%;\n}\n.login-btn {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n    padding: 10px 15px;\n}\n.login-btn:focus {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n}\n.input-right-section {\n    position: absolute;\n    top: 50%;\n    right: 15px;\n    transform: translateY(-50%);\n    font-size: 14px;\n    color: #3B4DA0;\n    display: flex;\n    align-items: center;\n    cursor: pointer;\n}\n.input-right-section img {\n    width: 15px;\n    margin-right: 5px;\n}\n.checkbox .label-btn {\n    padding: 5px 2px;\n    text-align: center;\n    display: block;\n    background-color: #fff;\n    color: #3B4DA0;\n    cursor: pointer;\n    width: 110px;\n    height: 80px;\n    background: #FFFFFF1A;\n    border: 1px solid #3B4DA0;\n    border-radius: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.checkbox input:checked+.label-btn {\n    color: #fff;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    box-shadow: 0px 0px 10px #00000030;\n    border-radius: 10px;\n}\n.checkbox,\n.radio {\n    margin-top: 0;\n    margin-right: 20px;\n}\n.plan-radio {\n    display: flex;\n    align-items: center;\n    margin-bottom: 20px;\n    flex-wrap: wrap;\n}\n.plan-radio .checkbox {\n    width: 110px;\n    height: 80px;\n    /* background: #FFFFFF1A;\n    border: 1px solid #797979;\n    border-radius: 10px; */\n}\n.checkbox input[type=checkbox],\n.checkbox-inline input[type=checkbox],\n.radio input[type=radio],\n.radio-inline input[type=radio] {\n    position: absolute;\n}\n.add-plan {\n    width: 110px;\n    height: 80px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: #FFFFFF1A;\n    border: 1px solid #D2D2D2;\n    border-radius: 10px;\n    margin-bottom: 10px;\n}\n.add-plan>div {\n    text-align: center;\n}\n.add-plan h4 {\n    width: 100%;\n    font-size: 16px;\n    color: #666667;\n    font-weight: medium;\n    margin: 0;\n}\n.add-plan span {\n    width: 100%;\n    display: block;\n    font-size: 14px;\n    color: #666667;\n}\nbody {\n    display: table-cell !important;\n    vertical-align: middle !important;\n}\n.form-group>label {\n    padding: 1px 3px;\n    margin: 0px;\n    font-size: 14px;\n    color: #8F8F8F;\n    line-height: 1.2;\n    position: absolute;\n    left: 15px;\n    top: 0px;\n    z-index: 11;\n    transform: translateY(-50%);\n    background-color: #fff;\n}\n/* .home-bg {\n    height: 400px;\n} */\n.form-control {\n    width: 100%;\n    display: block;\n    width: 100%;\n    height: 45px;\n    padding: 6px 12px;\n    font-size: 16px;\n    line-height: 1.538462;\n    color: #202020;\n    background: #FFFFFF1A;\n    border: 1px solid #D2D2D2;\n    border-radius: 25px;\n}\n.home-bg .left-section {\n    width: 60%;\n    background-repeat: no-repeat;\n    background-size: cover;\n    -o-object-fit: cover;\n       object-fit: cover;\n    background-position: bottom;\n    position: relative;\n    border-top-left-radius: 20px;\n    border-bottom-left-radius: 20px;\n}\n.login-bottom-text {\n    position: absolute;\n    bottom: 20px;\n    left: 30px;\n}\n.login-bottom-text h4 {\n    font-size: 34px;\n    color: #fff;\n}\n.otp-verify-header .form-title {\n    font-size: 22px;\n    font-weight: 600;\n    color: #3B4DA0;\n    margin-bottom: 5px;\n}\n.otp-verify-header .form-sub-title {\n    font-size: 14px;\n    color: #202020;\n}\n.otp-verify-header .top-bottom-text {\n    font-size: 18px;\n    font-weight: 600;\n    color: #3B4DA0;\n    margin: 40px 0;\n    text-align: center;\n}\n.otp-verify input {\n    width: 40px;\n    height: 44px;\n    color: #3B4DA0;\n    background: #3A3A3A00;\n    border: 1px solid #D2D2D2;\n    border-radius: 5px;\n}\n.otp-verify input:focus {\n    border-color: #3B4DA0;\n}\n.login-bottom-text p {\n    font-size: 18px;\n    color: #fff;\n}\n.home-bg .form-section-section {\n    width: 40%;\n}\n.login-btn {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n    padding: 10px 15px;\n}\n.login-btn:focus {\n    background: transparent linear-gradient(90deg, #4F64C4 0%, var(--unnamed-color-3b4da0) 100%) 0% 0%;\n    background: transparent linear-gradient(90deg, #4F64C4 0%, #3B4DA0 100%) 0% 0%;\n    color: #fff;\n    border-radius: 48px;\n    border-color: transparent;\n}\n@media only screen and (max-width: 600px) {\n    .home-bg.d-flex {\n        display: block !important;\n    }\n    .home-bg {\n        padding: 50px 0;\n    }\n    .home-bg .left-section {\n        height: 100vh;\n        width: 100%;\n        display: none;\n    }\n    .home-bg .form-section-section {\n        width: 100%;\n    }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3RoYW5rLXlvdS90aGFuay15b3UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLDhCQUE4QjtJQUM5QixpQ0FBaUM7QUFDckM7QUFDQTtJQUNJLGtCQUFrQjtBQUN0QjtBQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxlQUFlO0lBQ2YsY0FBYztJQUNkLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLFFBQVE7SUFDUixXQUFXO0lBQ1gsMkJBQTJCO0lBQzNCLHNCQUFzQjtBQUMxQjtBQUdBOztHQUVHO0FBRUg7SUFDSSxXQUFXO0lBQ1gsY0FBYztJQUNkLFdBQVc7SUFDWCxZQUFZO0lBQ1osaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixxQkFBcUI7SUFDckIsY0FBYztJQUNkLHFCQUFxQjtJQUNyQix5QkFBeUI7SUFDekIsbUJBQW1CO0FBQ3ZCO0FBRUE7SUFDSSxXQUFXO0lBQ1gsZUFBZTtBQUNuQjtBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLDRCQUE0QjtJQUM1QixzQkFBc0I7SUFDdEIsb0JBQWlCO09BQWpCLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0Isa0JBQWtCO0lBQ2xCLDRCQUE0QjtJQUM1QiwrQkFBK0I7QUFDbkM7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osVUFBVTtBQUNkO0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztBQUNmO0FBRUE7SUFDSSxlQUFlO0lBQ2YsY0FBYztJQUNkLGtCQUFrQjtJQUNsQixnQkFBZ0I7QUFDcEI7QUFFQTtJQUNJLGVBQWU7SUFDZixjQUFjO0FBQ2xCO0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxjQUFjO0lBQ2Qsa0JBQWtCO0FBQ3RCO0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGNBQWM7SUFDZCxxQkFBcUI7SUFDckIseUJBQXlCO0lBQ3pCLGtCQUFrQjtBQUN0QjtBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCO0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztBQUNmO0FBRUE7SUFDSSxXQUFXO0FBQ2Y7QUFFQTtJQUNJLGtHQUFrRztJQUNsRyw4RUFBOEU7SUFDOUUsV0FBVztJQUNYLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsa0JBQWtCO0FBQ3RCO0FBRUE7SUFDSSxrR0FBa0c7SUFDbEcsOEVBQThFO0lBQzlFLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIseUJBQXlCO0FBQzdCO0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFdBQVc7SUFLWCwyQkFBMkI7SUFDM0IsZUFBZTtJQUNmLGNBQWM7SUFDZCxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLGVBQWU7QUFDbkI7QUFFQTtJQUNJLFdBQVc7SUFDWCxpQkFBaUI7QUFDckI7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsY0FBYztJQUNkLHNCQUFzQjtJQUN0QixjQUFjO0lBQ2QsZUFBZTtJQUNmLFlBQVk7SUFDWixZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLHlCQUF5QjtJQUN6QixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQix1QkFBdUI7QUFDM0I7QUFFQTtJQUNJLFdBQVc7SUFDWCw4RUFBOEU7SUFDOUUsa0NBQWtDO0lBQ2xDLG1CQUFtQjtBQUN2QjtBQUVBOztJQUVJLGFBQWE7SUFDYixrQkFBa0I7QUFDdEI7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLGVBQWU7QUFDbkI7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1o7OzBCQUVzQjtBQUMxQjtBQUVBOzs7O0lBSUksa0JBQWtCO0FBQ3RCO0FBRUE7SUFDSSxZQUFZO0lBQ1osWUFBWTtJQUNaLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLHFCQUFxQjtJQUNyQix5QkFBeUI7SUFDekIsbUJBQW1CO0lBQ25CLG1CQUFtQjtBQUN2QjtBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCO0FBRUE7SUFDSSxXQUFXO0lBQ1gsZUFBZTtJQUNmLGNBQWM7SUFDZCxtQkFBbUI7SUFDbkIsU0FBUztBQUNiO0FBRUE7SUFDSSxXQUFXO0lBQ1gsY0FBYztJQUNkLGVBQWU7SUFDZixjQUFjO0FBQ2xCO0FBQ0E7SUFDSSw4QkFBOEI7SUFDOUIsaUNBQWlDO0FBQ3JDO0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLGVBQWU7SUFDZixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsUUFBUTtJQUNSLFdBQVc7SUFDWCwyQkFBMkI7SUFDM0Isc0JBQXNCO0FBQzFCO0FBR0E7O0dBRUc7QUFFSDtJQUNJLFdBQVc7SUFDWCxjQUFjO0lBQ2QsV0FBVztJQUNYLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQixjQUFjO0lBQ2QscUJBQXFCO0lBQ3JCLHlCQUF5QjtJQUN6QixtQkFBbUI7QUFDdkI7QUFFQTtJQUNJLFVBQVU7SUFDViw0QkFBNEI7SUFDNUIsc0JBQXNCO0lBQ3RCLG9CQUFpQjtPQUFqQixpQkFBaUI7SUFDakIsMkJBQTJCO0lBQzNCLGtCQUFrQjtJQUNsQiw0QkFBNEI7SUFDNUIsK0JBQStCO0FBQ25DO0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFVBQVU7QUFDZDtBQUVBO0lBQ0ksZUFBZTtJQUNmLFdBQVc7QUFDZjtBQUVBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2Qsa0JBQWtCO0FBQ3RCO0FBRUE7SUFDSSxlQUFlO0lBQ2YsY0FBYztBQUNsQjtBQUVBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsY0FBYztJQUNkLGtCQUFrQjtBQUN0QjtBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixjQUFjO0lBQ2QscUJBQXFCO0lBQ3JCLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7QUFFQTtJQUNJLHFCQUFxQjtBQUN6QjtBQUVBO0lBQ0ksZUFBZTtJQUNmLFdBQVc7QUFDZjtBQUVBO0lBQ0ksVUFBVTtBQUNkO0FBRUE7SUFDSSxrR0FBa0c7SUFDbEcsOEVBQThFO0lBQzlFLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLGtCQUFrQjtBQUN0QjtBQUVBO0lBQ0ksa0dBQWtHO0lBQ2xHLDhFQUE4RTtJQUM5RSxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLHlCQUF5QjtBQUM3QjtBQUVBO0lBQ0k7UUFDSSx5QkFBeUI7SUFDN0I7SUFDQTtRQUNJLGVBQWU7SUFDbkI7SUFDQTtRQUNJLGFBQWE7UUFDYixXQUFXO1FBQ1gsYUFBYTtJQUNqQjtJQUNBO1FBQ0ksV0FBVztJQUNmO0FBQ0oiLCJmaWxlIjoic3JjL2FwcC9zaGFyZWQvdGhhbmsteW91L3RoYW5rLXlvdS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keSB7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbCAhaW1wb3J0YW50O1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGUgIWltcG9ydGFudDtcbn1cbi5jb250YWluZXJEaXZ7XG4gICAgbWFyZ2luLXRvcDogMTUwcHggO1xufVxuLmZvcm0tZ3JvdXA+bGFiZWwge1xuICAgIHBhZGRpbmc6IDFweCAzcHg7XG4gICAgbWFyZ2luOiAwcHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAjOEY4RjhGO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDE1cHg7XG4gICAgdG9wOiAwcHg7XG4gICAgei1pbmRleDogMTE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59XG5cblxuLyogLmhvbWUtYmcge1xuICAgIGhlaWdodDogNDAwcHg7XG59ICovXG5cbi5mb3JtLWNvbnRyb2wge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogNDVweDtcbiAgICBwYWRkaW5nOiA2cHggMTJweDtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDEuNTM4NDYyO1xuICAgIGNvbG9yOiAjMjAyMDIwO1xuICAgIGJhY2tncm91bmQ6ICNGRkZGRkYxQTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRDJEMkQyO1xuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XG59XG5cbi5sb2dpbiB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xufVxuXG4uaG9tZS1iZyAubGVmdC1zZWN0aW9uIHtcbiAgICAvKiB3aWR0aDogNjAlOyAqL1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBib3R0b207XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIwcHg7XG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMjBweDtcbn1cblxuLmxvZ2luLWJvdHRvbS10ZXh0IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm90dG9tOiAyMHB4O1xuICAgIGxlZnQ6IDMwcHg7XG59XG5cbi5sb2dpbi1ib3R0b20tdGV4dCBoNCB7XG4gICAgZm9udC1zaXplOiAzNHB4O1xuICAgIGNvbG9yOiAjZmZmO1xufVxuXG4ub3RwLXZlcmlmeS1oZWFkZXIgLmZvcm0tdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICBjb2xvcjogIzNCNERBMDtcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLm90cC12ZXJpZnktaGVhZGVyIC5mb3JtLXN1Yi10aXRsZSB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAjMjAyMDIwO1xufVxuXG4ub3RwLXZlcmlmeS1oZWFkZXIgLnRvcC1ib3R0b20tdGV4dCB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6ICMzQjREQTA7XG4gICAgbWFyZ2luOiA0MHB4IDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ub3RwLXZlcmlmeSBpbnB1dCB7XG4gICAgd2lkdGg6IDQwcHg7XG4gICAgaGVpZ2h0OiA0NHB4O1xuICAgIGNvbG9yOiAjM0I0REEwO1xuICAgIGJhY2tncm91bmQ6ICMzQTNBM0EwMDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRDJEMkQyO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbn1cblxuLm90cC12ZXJpZnkgaW5wdXQ6Zm9jdXMge1xuICAgIGJvcmRlci1jb2xvcjogIzNCNERBMDtcbn1cblxuLmxvZ2luLWJvdHRvbS10ZXh0IHAge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBjb2xvcjogI2ZmZjtcbn1cblxuLmhvbWUtYmcgLmZvcm0tc2VjdGlvbi1zZWN0aW9uIHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuLmxvZ2luLWJ0biB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCB2YXIoLS11bm5hbWVkLWNvbG9yLTNiNGRhMCkgMTAwJSkgMCUgMCU7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCAjM0I0REEwIDEwMCUpIDAlIDAlO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGJvcmRlci1yYWRpdXM6IDQ4cHg7XG4gICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XG59XG5cbi5sb2dpbi1idG46Zm9jdXMge1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzRGNjRDNCAwJSwgdmFyKC0tdW5uYW1lZC1jb2xvci0zYjRkYTApIDEwMCUpIDAlIDAlO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzRGNjRDNCAwJSwgIzNCNERBMCAxMDAlKSAwJSAwJTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiA0OHB4O1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5pbnB1dC1yaWdodC1zZWN0aW9uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgcmlnaHQ6IDE1cHg7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogIzNCNERBMDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uaW5wdXQtcmlnaHQtc2VjdGlvbiBpbWcge1xuICAgIHdpZHRoOiAxNXB4O1xuICAgIG1hcmdpbi1yaWdodDogNXB4O1xufVxuXG4uY2hlY2tib3ggLmxhYmVsLWJ0biB7XG4gICAgcGFkZGluZzogNXB4IDJweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICBjb2xvcjogIzNCNERBMDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgd2lkdGg6IDExMHB4O1xuICAgIGhlaWdodDogODBweDtcbiAgICBiYWNrZ3JvdW5kOiAjRkZGRkZGMUE7XG4gICAgYm9yZGVyOiAxcHggc29saWQgIzNCNERBMDtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLmNoZWNrYm94IGlucHV0OmNoZWNrZWQrLmxhYmVsLWJ0biB7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNEY2NEM0IDAlLCAjM0I0REEwIDEwMCUpIDAlIDAlO1xuICAgIGJveC1zaGFkb3c6IDBweCAwcHggMTBweCAjMDAwMDAwMzA7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuLmNoZWNrYm94LFxuLnJhZGlvIHtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICAgIG1hcmdpbi1yaWdodDogMjBweDtcbn1cblxuLnBsYW4tcmFkaW8ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLnBsYW4tcmFkaW8gLmNoZWNrYm94IHtcbiAgICB3aWR0aDogMTEwcHg7XG4gICAgaGVpZ2h0OiA4MHB4O1xuICAgIC8qIGJhY2tncm91bmQ6ICNGRkZGRkYxQTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNzk3OTc5O1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7ICovXG59XG5cbi5jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XSxcbi5jaGVja2JveC1pbmxpbmUgaW5wdXRbdHlwZT1jaGVja2JveF0sXG4ucmFkaW8gaW5wdXRbdHlwZT1yYWRpb10sXG4ucmFkaW8taW5saW5lIGlucHV0W3R5cGU9cmFkaW9dIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5hZGQtcGxhbiB7XG4gICAgd2lkdGg6IDExMHB4O1xuICAgIGhlaWdodDogODBweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZDogI0ZGRkZGRjFBO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEMkQyRDI7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uYWRkLXBsYW4+ZGl2IHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5hZGQtcGxhbiBoNCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIGNvbG9yOiAjNjY2NjY3O1xuICAgIGZvbnQtd2VpZ2h0OiBtZWRpdW07XG4gICAgbWFyZ2luOiAwO1xufVxuXG4uYWRkLXBsYW4gc3BhbiB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAjNjY2NjY3O1xufVxuYm9keSB7XG4gICAgZGlzcGxheTogdGFibGUtY2VsbCAhaW1wb3J0YW50O1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGUgIWltcG9ydGFudDtcbn1cblxuLmZvcm0tZ3JvdXA+bGFiZWwge1xuICAgIHBhZGRpbmc6IDFweCAzcHg7XG4gICAgbWFyZ2luOiAwcHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiAjOEY4RjhGO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDE1cHg7XG4gICAgdG9wOiAwcHg7XG4gICAgei1pbmRleDogMTE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59XG5cblxuLyogLmhvbWUtYmcge1xuICAgIGhlaWdodDogNDAwcHg7XG59ICovXG5cbi5mb3JtLWNvbnRyb2wge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogNDVweDtcbiAgICBwYWRkaW5nOiA2cHggMTJweDtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDEuNTM4NDYyO1xuICAgIGNvbG9yOiAjMjAyMDIwO1xuICAgIGJhY2tncm91bmQ6ICNGRkZGRkYxQTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRDJEMkQyO1xuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XG59XG5cbi5ob21lLWJnIC5sZWZ0LXNlY3Rpb24ge1xuICAgIHdpZHRoOiA2MCU7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGJvdHRvbTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMjBweDtcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAyMHB4O1xufVxuXG4ubG9naW4tYm90dG9tLXRleHQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDIwcHg7XG4gICAgbGVmdDogMzBweDtcbn1cblxuLmxvZ2luLWJvdHRvbS10ZXh0IGg0IHtcbiAgICBmb250LXNpemU6IDM0cHg7XG4gICAgY29sb3I6ICNmZmY7XG59XG5cbi5vdHAtdmVyaWZ5LWhlYWRlciAuZm9ybS10aXRsZSB7XG4gICAgZm9udC1zaXplOiAyMnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6ICMzQjREQTA7XG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xufVxuXG4ub3RwLXZlcmlmeS1oZWFkZXIgLmZvcm0tc3ViLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6ICMyMDIwMjA7XG59XG5cbi5vdHAtdmVyaWZ5LWhlYWRlciAudG9wLWJvdHRvbS10ZXh0IHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogIzNCNERBMDtcbiAgICBtYXJnaW46IDQwcHggMDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5vdHAtdmVyaWZ5IGlucHV0IHtcbiAgICB3aWR0aDogNDBweDtcbiAgICBoZWlnaHQ6IDQ0cHg7XG4gICAgY29sb3I6ICMzQjREQTA7XG4gICAgYmFja2dyb3VuZDogIzNBM0EzQTAwO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNEMkQyRDI7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xufVxuXG4ub3RwLXZlcmlmeSBpbnB1dDpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiAjM0I0REEwO1xufVxuXG4ubG9naW4tYm90dG9tLXRleHQgcCB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGNvbG9yOiAjZmZmO1xufVxuXG4uaG9tZS1iZyAuZm9ybS1zZWN0aW9uLXNlY3Rpb24ge1xuICAgIHdpZHRoOiA0MCU7XG59XG5cbi5sb2dpbi1idG4ge1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzRGNjRDNCAwJSwgdmFyKC0tdW5uYW1lZC1jb2xvci0zYjRkYTApIDEwMCUpIDAlIDAlO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzRGNjRDNCAwJSwgIzNCNERBMCAxMDAlKSAwJSAwJTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiA0OHB4O1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgcGFkZGluZzogMTBweCAxNXB4O1xufVxuXG4ubG9naW4tYnRuOmZvY3VzIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsIHZhcigtLXVubmFtZWQtY29sb3ItM2I0ZGEwKSAxMDAlKSAwJSAwJTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM0RjY0QzQgMCUsICMzQjREQTAgMTAwJSkgMCUgMCU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogNDhweDtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgLmhvbWUtYmcuZC1mbGV4IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcbiAgICB9XG4gICAgLmhvbWUtYmcge1xuICAgICAgICBwYWRkaW5nOiA1MHB4IDA7XG4gICAgfVxuICAgIC5ob21lLWJnIC5sZWZ0LXNlY3Rpb24ge1xuICAgICAgICBoZWlnaHQ6IDEwMHZoO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gICAgLmhvbWUtYmcgLmZvcm0tc2VjdGlvbi1zZWN0aW9uIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/shared/thank-you/thank-you.component.ts": function srcAppSharedThankYouThankYouComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ThankYouComponent", function () {
      return ThankYouComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");

    var ThankYouComponent = /*#__PURE__*/function () {
      function ThankYouComponent(router) {
        _classCallCheck(this, ThankYouComponent);

        this.router = router;
      }

      _createClass(ThankYouComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "gotodashboard",
        value: function gotodashboard() {
          // $('#success-modal').modal('hide')
          this.router.navigate(['/home/dashboard']);
        }
      }]);

      return ThankYouComponent;
    }();

    ThankYouComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }];
    };

    ThankYouComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-thank-you',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./thank-you.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/thank-you/thank-you.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./thank-you.component.css */
      "./src/app/shared/thank-you/thank-you.component.css"))["default"]]
    })], ThankYouComponent);
    /***/
  }
}]);
//# sourceMappingURL=shared-shared-module-es5.js.map