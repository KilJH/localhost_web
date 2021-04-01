var AWS = require('aws-sdk');
var fs = require('fs');
const password = require("../db/password");
AWS.config.region = 'ap-northeast-2';

var s3 = new AWS.S3(password.s3);

const name = `profile_userid.png`;

var param = {
    'Bucket':'localhostphoto3',
    'Key':name,
    'ACL':'public-read',
    'Body':fs.createReadStream('94.png'),
    'ContentType':'image/png'
}

module.exports.upload = s3.upload(param, function(err, data){
    console.log(err);
    console.log('uplaod',data);
})