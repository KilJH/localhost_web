var AWS = require('aws-sdk');
var fs = require('fs');
const password = require("../db/password");
AWS.config.region = 'ap-northeast-2';

var s3 = new AWS.S3(password.s3);

module.exports.upload = (req, res) => {
    var param = {
        'Bucket': 'localhostphoto3',
        'Key': "notyet.png",
        'ACL': 'public-read',
        'Body': fs.createReadStream('94.png'),
        'ContentType': 'image/png'
    }
    
    s3.upload(param, function (err, data) {
        if(err) console.log(err);
        console.log('uplaod', data);
    })
}

module.exports.load = (req, res) => {
    s3.listObjects({Bucket: 'localhostphoto3'}).on('success', function handlePage(response) {
        for(var name in response.data.Contents){
            console.log(response.data.Contents[name].Key);
        }
        if (response.hasNextPage()) {
            response.nextPage().on('success', handlePage).send();
        }
    }).send();
}

