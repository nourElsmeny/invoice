exports.handelRes = function (code, message, data) {
    var outputRes = { statusCode: code, message: message ? message : "success", data: data ? data : {} };

    return outputRes;
}