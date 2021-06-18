
const connection = require('../config/db');
const handelRes = require('../config/handelRes').handelRes;
const helperService = require('./helperService');
const { v4: uuidv4 } = require('uuid');

exports.userList = async function (req, callback) {
    const pagNum = req.body.pagNum ? req.body.pagNum : 0;
    const sql = "SELECT * FROM users  ORDER BY createdAt ASC" +
        " limit 10 offset " + 10 * pagNum;
    const [users] = await connection.promise().query(sql);

    if (!users) {
        var output = handelRes(404, "cannot find users");
        return callback(null, output);
    }
    const countQuery = "SELECT COUNT(*) AS count FROM users;";
    const [count] = await connection.promise().query(countQuery);
    
    const data = {
        totalCount: count[0].count,
        pagNum: pagNum,
        users: users
    };
    var output = handelRes(200, "sucess", data);
    return callback(null, output);

}


exports.createUser = async function (req, callback) {
    const Findsql = "SELECT * FROM users where" +
        " email = '" + req.body.email + "'" +
        " OR mobile = '" + req.body.mobile + "'";

    const [foundUsers] = await connection.promise().query(Findsql);
    if (foundUsers.length > 0) {
        var output = handelRes(404, "this user is already exist");
        return callback(null, output);
    }
    const uuidV4 = uuidv4();
    const dataNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let sql = "INSERT INTO users (id, fullName, mobile, email, updatedAt, createdAt)" +
        "VALUES ('" + uuidV4 + "', '" + req.body.fullName + "', '" + req.body.mobile + "', '" +
        req.body.email + "', '" + dataNow + "', '" + dataNow + "');";
    const [users] = await connection.promise().query(sql);

    if (!users) {
        var output = handelRes(404, "cannot find users");
        return callback(null, output);
    }
    var output = handelRes(200, "sucess");
    return callback(null, output);

}
exports.createInvoice = async function (req, callback) {
    var output;
    const Findsql = "SELECT * FROM users where" +
        " email = '" + req.body.email + "'" +
        " OR mobile = '" + req.body.mobile + "'";
    const [foundUsers] = await connection.promise().query(Findsql);


    if (foundUsers.length == 0) {
        output = await helperService.addUser(req);
    }

    output = foundUsers;


    const uuidV4 = uuidv4();
    const dataNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const duDate = new Date(req.body.duDate).toISOString().slice(0, 19).replace('T', ' ');
    
    let sql = "INSERT INTO invoice (id, userId, amount, createdAt, updatedAt, duDate)" +
        "VALUES ('" + uuidV4 + "', '" + output[0].id + "', '" + req.body.amount + "', '" +
        dataNow + "', '" + dataNow + "', '" + duDate + "');";

    const [invoice] = await connection.promise().query(sql);
    if (!invoice) {
        var output = handelRes(404, "cannot create invoice");
        return callback(null, output);
    }
req.body.id = output[0].id;
    await helperService.sendEmail(req.body);
    var output = handelRes(200, "sucess");
    return callback(null, output);

}
exports.invoiceList = async function (req, callback) {
    const pagNum = req.body.pagNum ? req.body.pagNum : 0;
    const sql = "SELECT * FROM invoice LEFT JOIN users" +
    " ON invoice.userId = users.id ORDER BY invoice.createdAt ASC" +
    " limit 10 offset " + 10 * pagNum;
    
    const [users] = await connection.promise().query(sql);

    if (!users) {
        var output = handelRes(404, "cannot find users");
        return callback(null, output);
    }

    const countQuery = "SELECT COUNT(*) AS count FROM invoice LEFT JOIN users" +
    " ON invoice.userId = users.id";

    const [count] = await connection.promise().query(countQuery);
    
    console.log(count);

    const data = {
        totalCount: count[0].count,
        pagNum: pagNum,
        invoices: users
    };
    var output = handelRes(200, "sucess", data);
    return callback(null, output);

}
exports.invoiceDudates = async function (req, callback) {
    const duDate = new Date(req.body.duDate).toISOString().slice(0, 19).replace('T', ' ');
    const pagNum = req.body.pagNum ? req.body.pagNum : 0;
    const sql = "SELECT * FROM invoice LEFT JOIN users" +
    " ON invoice.userId = users.id ORDER BY invoice.createdAt ASC" +
    " AND invoice.duDate < '" + duDate + "'"+
    " limit 10 offset " + 10 * pagNum;
    const [users] = await connection.promise().query(sql);

    if (!users) {
        var output = handelRes(404, "cannot find users");
        return callback(null, output);
    }

    for (var i in users){
    await helperService.sendEmail(users[i]);
    }
    var output = handelRes(200, "sucess", users);
    return callback(null, output);

}