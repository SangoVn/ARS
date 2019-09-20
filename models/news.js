var mongoose = require('mongoose');
var newsSchema = mongoose.Schema({
    Title :String,
    Bec : String,
    H1Content : String,
    PostName :String,
    Google: {
        Title :String,
        ShortContent : String,
        Keyword : String,
    },
    ShortContent : String,
    FullContent : String,
    ImageURL : String,
    Active : Boolean,
    Orderby : Number,
    IsHot : Boolean,    
    Tags : {
        Tag :String
    },    
    CreatedDate : Date,
    UserPost : String,
    ModifeDate : Date,
    IPRequest : String,
});
module.exports = mongoose.model('News', newsSchema);