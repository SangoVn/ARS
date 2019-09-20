var express = require('express');
var router = express.Router();
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.post('/', multipartMiddleware, function(req, res) {


    fs.readFile(req.files.upload.path, function (err, data) {
        var newPath = __dirname + '/../public/uploads/' + req.files.upload.name;
        fs.writeFile(newPath, data, function (err) {
            if (err) console.log({err: err});
            else {                              
                res.send({fileName :  req.files.upload.name, uploaded: 1,url:"/uploads/" + req.files.upload.name});
            }
        });
    });
});

module.exports = router;