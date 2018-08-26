const md5 = require('md5');

exports.EncryptMD5 = (data) => {
    return md5(data + global.SALT_KEY)
}