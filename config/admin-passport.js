// config/passport.js

// load những thứ chúng ta cần
var LocalStrategy = require('passport-local').Strategy;

// load  user model
var Member = require('../models/member');

module.exports = function (passportadmin) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passportadmin.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passportadmin.deserializeUser(function (id, done) {
        Member.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passportadmin.use('admin-local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, username, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    Member.findOne({ 'username' :  username }, function(err, member) {
        // if there are any errors, return the error before anything else
        if (err)
            return done(err);

        // if no user is found, return the message
        if (!member)
            return done(null, false, req.flash('admin-loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!member.validPassword(password))
            return done(null, false, req.flash('admin-loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        console.log(member);
        return done(null, member);
    });

}));



passportadmin.use('admin-local-signup', new LocalStrategy({
    // mặc định local strategy sử dụng username và password,
    // chúng ta cần cấu hình lại
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // cho phép chúng ta gửi reqest lại hàm callback
},
function (req, username, password, done) {
    // asynchronous
    // Hàm callback của nextTick chỉ được thực hiện khi hàm trên nó trong stack (LIFO) được thực hiện
    // User.findOne sẽ không được gọi cho tới khi dữ liệu được gửi lại
    process.nextTick(function () {

        // Tìm một user theo email
        // chúng ta kiểm tra xem user đã tồn tại hay không
        Member.findOne({'username': username}, function (err, member) {
            if (err)
                return done(err);

            if (member) {
                return done(null, false, req.flash('admin-signupMessage', 'That email is already taken.'));
            } else {

                // Nếu chưa user nào sử dụng email này
                // tạo mới user
                var newmember = new Member();

                // lưu thông tin cho tài khoản local
                newmember.username = username;
                newmember.password = newmember.generateHash(password);
                newmember.fullname = "Anonymous";
                newmember.active = true;
                newmember.avantar ="";
                // lưu user
                newmember.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, newmember);
                });
            }

        });

    });

}));


};



