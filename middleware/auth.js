const _ = require('lodash');

exports.mainAuth = async function(req, res, next) {
    try {
        req.userData = {
            userId:"507f191e810c19729de860ea",
            role : "merchantAdmin" 
        }
        return next()
    } catch (err) {
        return res.status(401).send("You need to login to access this page");
    }
}