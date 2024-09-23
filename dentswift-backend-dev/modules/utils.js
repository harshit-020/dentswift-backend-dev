const bcrypt = require("bcrypt");
const saltRounds = 10;
// var base64ToImage = require('base64-to-image');
var path = require("path");
var express = require('express');
var twilio = require('twilio');
var FCM = require('fcm-node');
var sns = require('aws-node-sns');

const { accountSid,authToken,twilio_no } = require('../config/config');

exports.encryptText = async (plaintext) => {
    let encryptedPass = await bcrypt.hash(plaintext, saltRounds);
    return encryptedPass;
}

exports.compare = async (plaintext, encryptText) => {
    let matched = await bcrypt.compare(plaintext, encryptText);
    return matched;
}

exports.randomStringGenerator = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

exports.randomreferralCode = () => {
    return Math.random().toString(36).substring(7);
};

// exports.sendotp = async (varification_code, mobile_number) => {
//     var accountSid = "AC92a73497711d5fdf6ccf746362fee409"; // Your Account SID from www.twilio.com/console
//     var authToken = "6a5b4d6c6ecfd990dcd646e04a874377";   // Your Auth Token from www.twilio.com/console
//     var twilio_no = "+19125138686";
//     //console.log("AccountSid :",twilio_no );
//     var client = new twilio(accountSid, authToken);
//     await client.messages.create({
//         body: "your one time password(OTP) is  " + varification_code + "  valid for 2 days do not disclose it",
//         to: mobile_number, // Text this number
//         from: twilio_no // From a valid Twilio number
//     }).then(async (message) => {
//         return message.sid;
//     }).catch(async(error)=>{
//         // Handle any error from any of the steps...
//         console.error('Buying the number failed. Reason: ',error);
//         if(error.code == 21614 || error.code == 21211)
//             {throw new Error(`${mobile_number} not a valid mobile Number`)};
//         throw new Error(error.message);
//     });
// }

exports.sendotp = async ( text , mobile ) => {
    sns.createClient({       
        accessKeyId: "AKIAW4ZTJFPM7CG7EJ44",
        secretAccessKey: "pTqEOVrKS+4rRXGgqyjZ+X/i9kUft4oTSf1WLLrt",
        region: "me-south-1"  
    });
    let message = "your one time password (OTP) for dentswift account is  " + text + "  valid for 2 days do not disclose it";

    sns.sendSMS(message , mobile , "Dentswift" , 'Transactional' ,  function(error, data){
        if (error){
            console.log('eroorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr' , error)
        }else{
            console.log('MessageID' , data)
        }
    });
}

exports.sendmail = function (email_id, subject, message) {
    var mail_config = {
        "SMTP_HOST": "smtp.mandrillapp.com",
        "SMTP_PORT": 587,
        "SMTP_USER": "elanapp", //default
        "SMTP_PASS": "XiP8fWlOdE_I4tA7wRcceg"
        //"SMTP_PASS" : mail_config.SMTP_PASS
    }
    var mailer = nodemailer.createTransport({
        // service: 'SendGrid',
        host: mail_config.SMTP_HOST,
        port: mail_config.SMTP_PORT,
        auth: {
            user: mail_config.SMTP_USER,
            pass: mail_config.SMTP_PASS
        }
    });
    mailer.sendMail({
        from: "api@elanapp.com",
        to: email_id,
        cc: "susheel.kumar@fluper.in",
        // cc: "anchal.goyal@fluper.in",
        subject: subject,
        template: "text",
        html: message
    }, (error, response) => {

        if (error) {
            console.log(error);
            //  res.send({ message: "Email not send " });
        } else {
            console.log(response);
            // resolve({ message: "Email send successfully" });
        }
        mailer.close();
        //res.send("Response send successfully");
    });
}

exports.sendPushNotification = function (token, device_type, payload, notify) {
    // let notify = {
    //   // "content-available": 1,
    //     title: title,
    //     body: body,
    //     // click_action: "FCM_PLUGIN_ACTIVITY",
    //     "color": "#f95b2c",
    //     "sound": true,
    //     // "badge": "0",
    //     // "alert" : "",
    // }

    let serverKey = "AAAAVcC3jGc:APA91bGyhQsCvdaFx3IdKdFjNELC-PPWvE8tN13IdlhZBTd1gsYVlQTeKd805I6PXVEiSOGGtfzW4UwZeUCCTfGG7d67V3b-STjz7bDzOGwnjyaj_0-6GvEpaKe5MugSylNPi_brKImx";

    console.log("send notification Android calling");
    var fcm = new FCM(serverKey);
    var message = {
        to: token,
        collapse_key: 'your_collapse_key',
        notification: notify,
        data: payload,
    };
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("=======================Android error comming===================")
            console.log(null, err);
        } else {
            console.log("=======================Android===================")
            console.log(null, response);            
        }
    });
}

//push notification for Ios
exports.sendPushNotificationForIos = function (token, device_type, payload) {
    console.log(token, "314234")
    device_token = token
    var options = {
        token: {
            key: path.join(__dirname, 'Modules', '../IOSKEY.p8'),
            keyId: "H97WA3FWVQ",  //Key Id heree
            teamId: "3P74WQ98DA" //TeamId Id heree
        },
        development: true
    };
    var apnProvider = new apn.Provider(options);
    var note = new apn.Notification();
    note.payload = payload
    note.alert = "DriverRequest"
    note.topic = 'com.fluper.DentSwift'  //Topic here
    note.contentAvailable = 1
    note.sound = 'default'
    apnProvider.send(note, device_token).then((result) => {
        if (result) {
            console.log(result, 'IOS Notification SEND');
        } else {
            console.log('Driver IOS -- something went wrong!!!!!');
        }
    });
}

exports.getOrderStatus = function (status) {
    switch (status) {
        case 1:
          status = "Order Placed"
          break;
        case 2:
          status = "In-transit"
          break;
        case 3:
          status = "Ready For Dispatch"
          break;
        case 4:
          status = "Shipping"
          break;  
        case 5:
          status = "Arriving"
          break;
        case 6:
          status = "Out For Delivery"
          break; 
        case 7:
          status = "Delivered"
          break;  
        case 8:
          status = "Cancelled"
          break; 
        default: 
          status = "Order Placed" 
    }
    return status;
}