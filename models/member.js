var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// định nghĩ cấu trúc user model
var memberSchema = mongoose.Schema({
    username: String,
    password: String,
    fullname : String,
    active: Boolean,
    avantar : String,
    IsMember : Number
});
// methods ======================
// phương thực sinh chuỗi hash
memberSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// kiểm tra password có hợp lệ không
memberSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('Member', memberSchema);