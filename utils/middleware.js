
//捕获错误
exports.apiErrorHandle = function (err, req, res, next) {
    if( typeof res.apiError === 'function') {
        return res.apiError(err);
    }
    next();
}

//扩展响应api
exports.extendAPIOutput = function (req, res, next) {
    //响应成功结果
    res.apiSuccess = function (data) {
        res.json({
            status : 'OK',
            result : data
        });
    };

    //响应失败的结果
    res.apiError = function (err) {
        res.json({
            status: 'Error',
            error_code: err.error_code || 'UNKNOW',
            error_message: errr.error_message || err.toString()
        });
    }

    next();

}
