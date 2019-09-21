var express = require('express');
var router = express.Router();

router.get('/dashboard', isLoggedIn,function (req, res) {
    var data_header = 
    { 
        title: 'Dashboard', 
        keywords: 'Arstudio , Arstudio thiết kế nội thất, Arstudio noi that dep, Arstudio đồ decor, Arstudio trang trí nội thất',
        description:'Arstudio sẽ là một trong những sự lựa chọn hoàn hảo cho việc trang trí và thiết kế nội thất. Giúp không gian nhà bạn tiết kiệm diện tích, sang trọng quý phái.',
        url :  req.protocol + '://' + req.get('host') + req.originalUrl,
        image : req.protocol + '://' + req.get('host') + "/asset/images/gaa790205662a4457a90c595eada13.jpg",
        hostname: req.protocol + '://' + req.get('host')
    };     
    res.render('admin/home/index',{
        header :data_header
    }); // load the index.ejs file
});

function isLoggedIn(req, res, next) {
    // Nếu một user đã xác thực, cho đi tiếp
    if (req.isAuthenticated())
        return next();
    // Nếu chưa, đưa về trang chủ
    res.redirect('/admin/member/login');
}

module.exports = router;