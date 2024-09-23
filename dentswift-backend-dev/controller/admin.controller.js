const adminService = require("../services/admin.services");
var _ = require('lodash');

exports.adminLogin = async (req, res) => {
    try {
        let userData = await adminService.loginAdmin(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            let userData = await adminService.createAdmin(req.body);
            if (userData.status == -1) {
                throw new Error(userData.message);
            }
            res.status(200).json({ response: userData.data, message: "Login Successfully" });
        }
        res.status(200).json({ response: userData.data, message: "Login Successfully" });
    } catch (err) {
        res.status(401.1).json({ message: err.message });
    }
};

exports.forgetPassword = async (req, res) => {
    try {
        let userData = await adminService.forgetPassword(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        let dataToSend = {
            token: userData.data
        }
        res.status(200).json({ message: userData.message, response: dataToSend  });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        let userData = await adminService.resetPassword(req.body, req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(401).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        let userData = await adminService.changePassword(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        res.status(200).json({ response: userData.data, message: "Password changed Successfully" });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.logout = async (req, res) => {
    try {
        let userData = await adminService.logout(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        res.status(200).json({ response: userData.data, message: "Logout suggessfully" });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        let userData = await adminService.getAllUsers(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        res.status(200).json({ response: userData.data, message: userData.message });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getAllSellers = async (req, res) => {
    try {
        let userData = await adminService.getAllSellers(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        res.status(200).json({ response: userData.data, message: userData.message });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.blockUser = async (req, res) => {
    try {
        let userData = await adminService.blockUser(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        res.status(200).json({ message: userData.message });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        let userData = await adminService.deleteUser(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        res.status(200).json({ message: userData.message });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

exports.blockSeller = async (req, res) => {
    try {
        let userData = await adminService.blockSeller(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        res.status(200).json({ message: userData.message });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.deleteSeller = async (req, res) => {
    try {
        let userData = await adminService.deleteSeller(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        res.status(200).json({ message: userData.message });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

exports.viewSeller = async (req, res) => {
    try {
        let userData = await adminService.viewSeller(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        
        res.status(200).json({ message: userData.message, response: userData.data });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

exports.updateSellerStatus = async (req, res) => {
    try {
        let userData = await adminService.updateSellerStatus(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        
        res.status(200).json({ message: userData.message, response: userData.data });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

exports.uploadAdminFile = async (req, res) => {
    try {
        if (req.files.upload_admin_file != undefined || req.files.upload_admin_file != null) {
            req.body.upload_admin_file = req.files.upload_admin_file[0].location ? req.files.upload_admin_file[0].location : '';
        }

        let user = await adminService.uploadFile(req.body, req.adminData);
        if (user.status == -1) {
            throw new Error(user.message);
        }
        if (user.status == 0) {
            return res.status(403).json({ message: user.message });
        }
        let dataToSend = {
            imageUrl: user.data
        }
        res.status(200).json({ message: user.message, response: dataToSend });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.addCategory = async (req, res) => {
    try {
        let userData = await adminService.addCategory(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message, response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getCategory = async (req, res) => {
    try {
        let userData = await adminService.getCategory(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message, response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.editCategory = async (req, res) => {
    try {
        let userData = await adminService.editCategory(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message, response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        let userData = await adminService.deleteCategory(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        let userData = await adminService.getCategoryById(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.addSubCategory = async (req, res) => {
    try {
        let userData = await adminService.addSubCategory(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message, response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getSubCategory = async (req, res) => {
    try {
        let userData = await adminService.getSubCategory(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message, response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.editSubCategory = async (req, res) => {
    try {
        let userData = await adminService.editSubCategory(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message, response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.deleteSubCategory = async (req, res) => {
    try {
        let userData = await adminService.deleteSubCategory(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getSubCategoryById = async (req, res) => {
    try {
        let userData = await adminService.getSubCategoryById(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.addSubSubCategory = async (req, res) => {
    try {
        let userData = await adminService.addSubSubCategory(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message, response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getSubSubCategory = async (req, res) => {
    try {
        let userData = await adminService.getSubSubCategory(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message, response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.editSubSubCategory = async (req, res) => {
    try {
        let userData = await adminService.editSubSubCategory(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message, response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.deleteSubSubCategory = async (req, res) => {
    try {
        let userData = await adminService.deleteSubSubCategory(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getSubSubCategoryById = async (req, res) => {
    try {
        let userData = await adminService.getSubSubCategoryById(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.addCoupon = async (req, res) => {
    try {
        let userData = await adminService.addCoupon(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.editCoupon = async (req, res) => {
    try {
        let userData = await adminService.editCoupon(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getCoupons = async (req, res) => {
    try {
        let userData = await adminService.getCoupons(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.deleteCoupon = async (req, res) => {
    try {
        let userData = await adminService.deleteCoupon(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.viewCoupon = async (req, res) => {
    try {
        let userData = await adminService.viewCoupon(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        let userData = await adminService.getAllProducts(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.viewProduct = async (req, res) => {
    try {
        let userData = await adminService.viewProduct(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message , response: userData.data });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        let userData = await adminService.deleteProduct(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.editProduct = async (req, res) => {
    try {
        let userData = await adminService.editProduct(req.adminData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message, response: userData.data  });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.blockProduct = async (req, res) => {
    try {
        let userData = await adminService.blockProduct(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message  });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.addAdvertisement = async (req, res) => {
    try {
        let userData = await adminService.addAdvertisement(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.editAdvertisement = async (req, res) => {
    try {
        let userData = await adminService.editAdvertisement(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getAllAdvertisements = async (req, res) => {
    try {
        let userData = await adminService.getAllAdvertisements(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.deleteAdvertisement = async (req, res) => {
    try {
        let userData = await adminService.deleteAdvertisement(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.ongoingOrderList = async (req, res) => {
    try {
        let userData = await adminService.ongoingOrderList(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.completedOrderList = async (req, res) => {
    try {
        let userData = await adminService.completedOrderList(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.cancelledOrderList = async (req, res) => {
    try {
        let userData = await adminService.cancelledOrderList(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.ongoingOrderDetails = async (req, res) => {
    try {
        let userData = await adminService.ongoingOrderDetails(req.adminData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.completedOrderDetails = async (req, res) => {
    try {
        let userData = await adminService.completedOrderDetails(req.adminData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.cancelledOrderDetails = async (req, res) => {
    try {
        let userData = await adminService.cancelledOrderDetails(req.adminData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.orderBookingList = async (req, res) => {
    try {
        let userData = await adminService.orderBookingList(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.orderBookingDetails = async (req, res) => {
    try {
        let userData = await adminService.orderBookingDetails(req.adminData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.orderCommissionList = async (req, res) => {
    try {
        let userData = await adminService.orderCommissionList(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getOngoingOrdersReport = async (req, res) => {
    try {
        let userData = await adminService.getOngoingOrdersReport(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getCompletedOrdersReport = async (req, res) => {
    try {
        let userData = await adminService.getCompletedOrdersReport(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getCancelledOrdersReport = async (req, res) => {
    try {
        let userData = await adminService.getCancelledOrdersReport(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getSellerCommissionReport = async (req, res) => {
    try {
        let userData = await adminService.getSellerCommissionReport(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getUserReport = async (req, res) => {
    try {
        let userData = await adminService.getUserReport(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getTodayCompletedOrdersReport = async (req, res) => {
    try {
        let userData = await adminService.getTodayCompletedOrdersReport(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getMonthCompletedOrdersReport = async (req, res) => {
    try {
        let userData = await adminService.getMonthCompletedOrdersReport(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getQuarterCompletedOrdersReport = async (req, res) => {
    try {
        let userData = await adminService.getQuarterCompletedOrdersReport(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getYearCompletedOrdersReport = async (req, res) => {
    try {
        let userData = await adminService.getYearCompletedOrdersReport(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getFinanceReport = async (req, res) => {
    try {
        let userData = await adminService.getFinanceReport(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getSellerOrderReport = async (req, res) => {
    try {
        let userData = await adminService.getSellerOrderReport(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getUserOrderReport = async (req, res) => {
    try {
        let userData = await adminService.getUserOrderReport(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.sendNotification = async (req, res) => {
    try {
        let userData = await adminService.sendNotification(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getSettingData = async (req, res) => {
    try {
        let userData = await adminService.getSettingData();
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.updateSettingData = async (req, res) => {
    try {
        let userData = await adminService.updateSettingData(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.addNewFaq = async (req, res) => {
    try {
        let userData = await adminService.addNewFaq(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getFaqList = async (req, res) => {
    try {
        let userData = await adminService.getFaqList();
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.updateFaq = async (req, res) => {
    try {
        let userData = await adminService.updateFaq(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.deleteFaq = async (req, res) => {
    try {
        let userData = await adminService.deleteFaq(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.addSubscription = async (req, res) => {
    try {
        let userData = await adminService.addSubscription(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.editSubscription = async (req, res) => {
    try {
        let userData = await adminService.editSubscription(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.subscriptionPlanList = async (req, res) => {
    try {
        let userData = await adminService.subscriptionPlanList(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.deleteSubscription = async (req, res) => {
    try {
        let userData = await adminService.deleteSubscription(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.blockSubscription = async (req, res) => {
    try {
        let userData = await adminService.blockSubscription(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        let userData = await adminService.addProduct(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.editProduct = async (req, res) => {
    try {
        let userData = await adminService.editProduct(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.addTax = async (req, res) => {
    try {
        let userData = await adminService.addTax(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.editTax = async (req, res) => {
    try {
        let userData = await adminService.editTax(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getTax = async (req, res) => {
    try {
        let userData = await adminService.getTax(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getComplaintList = async (req, res) => {
    try {
        let userData = await adminService.getComplaintList(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.viewComplaint = async (req, res) => {
    try {
        let userData = await adminService.viewComplaint(req.adminData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.updateComplaintStatus = async (req, res) => {
    try {
        let userData = await adminService.updateComplaintStatus(req.adminData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getNotificationList = async (req, res) => {
    try {
        let userData = await adminService.getNotificationList(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.addBrand = async (req, res) => {
    try {
        let userData = await adminService.addBrand(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.editBrand = async (req, res) => {
    try {
        let userData = await adminService.editBrand(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getAllBrands = async (req, res) => {
    try {
        let userData = await adminService.getAllBrands(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.deleteBrand = async (req, res) => {
    try {
        let userData = await adminService.deleteBrand(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getDashboardData = async (req, res) => {
    try {
        let userData = await adminService.getDashboardData(req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.dashboardOrderData = async (req, res) => {
    try {
        let userData = await adminService.dashboardOrderData(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        let userData = await adminService.updateProfile(req.adminData, req.body);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

exports.getProfileData = async (req, res) => {
    try {
        let userData = await adminService.getProfileData(req.adminData);
        if (userData.status == -1) {
            throw new Error(userData.message);
        }
        if (userData.status == 0) {
            return res.status(403).json({ message: userData.message });
        }
        res.status(200).json({ message: userData.message,response: userData.data });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

