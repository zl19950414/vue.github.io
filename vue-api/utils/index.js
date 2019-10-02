

var crypto = require("crypto"); // node 模块 
const keys = "wuhan1906";
//导出
exports.aesEncrypt = aesEncrypt;   // 加密
exports.aesDecrypt = aesDecrypt;   // 解密
exports.keys = keys;     // 密码钥匙 
//
exports.checkToken = function (req, res, next) {
    console.log(req.path);
    if (req.path !== "/vue/login" && req.path !== "/vue/register") {
        const client_token = req.headers['token'];   // 前端的 token
        const server_token = req.session.token;   // 后端的 token
        if (client_token) {
            if (server_token) {
                if (client_token == server_token) {
                    next();
                } else {
                    res.json({
                        code: 500,
                        msg: "token不匹配",
                        type: 0,
                    })
                }
            } else {
                res.json({
                    code: 500,
                    msg: "token过期或者失效",
                    type: 0,
                })
            }
        } else {
            res.json({
                code: 500,
                msg: "token不存在,请马上登录",
                type: 0,
            })
        }
    } else {
        next();
    }

}

// 加密函数  data 需要加密的字段 
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
// 解密函数
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}