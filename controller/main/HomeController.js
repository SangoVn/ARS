var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('main/home/index.ejs'); // load the index.ejs file
});

module.exports = router;