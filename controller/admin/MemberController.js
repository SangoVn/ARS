var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../../config/admin-passport')(passport);

router.get('/', function (req, res) {
    res.render('admin/member/index.ejs'); // load the index.ejs file
});
// =====================================
// LOGIN ===============================
// =====================================
// Hiển thị form login
router.get('/login',function (req, res) {
    // Hiển thị trang và truyển lại những tin nhắn từ phía server nếu có
    res.render('admin/member/login.ejs', {message: req.flash('loginMessage')});
});
// Xử lý thông tin khi có người thực hiện đăng nhập
// app.post('/login', chúng ta sẽ xử lý với passport ở đây);

router.post('/login', passport.authenticate('admin-local-login', {
    successRedirect : '/admin/member/profile', // redirect to the secure profile section
    failureRedirect : '/admin/member/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// =====================================
// SIGNUP ==============================
// =====================================
// Hiển thị trang đăng ký
router.get('/signup', function (req, res) {
    res.render('admin/member/signup.ejs', {message: req.flash('signupMessage')});
});
// Xử lý thông tin khi có người đăng ký
// app.post('/signup', chúng ta sẽ xử lý với passport ở đây);
// =====================================
// PROFILE SECTION =====================
// =====================================
// Đây là trang sẽ được bảo vệ, chỉ những người đã đăng nhập mới có thể xem được
// Chúng ta sẽ sử dụng route middleware để kiểm tra xem người đó đã đăng nhập chưa
// hàm isLoggedIn sẽ làm việc đó.
router.get('/profile', isLoggedIn, function (req, res) {
    res.render('admin/member/profile.ejs', {
        user: req.user // Lấy thông tin user trong session và truyền nó qua template
    });
});

router.post('/signup', passport.authenticate('admin-local-signup', {
    successRedirect: '/admin/member/profile', // chuyển hướng tới trang được bảo vệ
    failureRedirect: '/admin/member/signup', // trở lại trang đăng ký nếu có lỗi
    failureFlash: true // allow flash messages
}));

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/admin/member/login');
});
// route middleware để kiểm tra một user đã đăng nhập hay chưa?
function isLoggedIn(req, res, next) {
    // Nếu một user đã xác thực, cho đi tiếp
    if (req.isAuthenticated())
        return next();
    // Nếu chưa, đưa về trang chủ
    res.redirect('/admin/member/login');
}

module.exports = router;