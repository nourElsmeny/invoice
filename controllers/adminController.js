const adminService = require('../services/adminService');

exports.createUser = async (req, res) => {
    adminService.createUser(req, function (err, data) {
        if (err)
            return res.send(err)
        return res.send(data);
    })
}
exports.userList = async (req, res) => {
    adminService.userList(req, function (err, data) {
        if (err)
            return res.send(err)
        return res.send(data);
    })
}
exports.createInvoice = async (req, res) => {
    adminService.createInvoice(req, function (err, data) {
        if (err)
            return res.send(err)
        return res.send(data);
    })
}
exports.invoiceList = async (req, res) => {
    adminService.invoiceList(req, function (err, data) {
        if (err)
            return res.send(err)
        return res.send(data);
    })
}