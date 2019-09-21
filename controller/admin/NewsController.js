var express = require('express');
var router = express.Router();
var News = require('../../models/news');

const requestIp = require('request-ip');
 
// inside middleware handler
const ipMiddleware = function(req, res, next) {
    const clientIp = requestIp.getClientIp(req); 
    next();
};

router.get('/', isLoggedIn,function (req, res) {
    var data_header = 
    { 
        title: 'Dashboard', 
        keywords: 'Arstudio , Arstudio thiết kế nội thất, Arstudio noi that dep, Arstudio đồ decor, Arstudio trang trí nội thất',
        description:'Arstudio sẽ là một trong những sự lựa chọn hoàn hảo cho việc trang trí và thiết kế nội thất. Giúp không gian nhà bạn tiết kiệm diện tích, sang trọng quý phái.',
        url :  req.protocol + '://' + req.get('host') + req.originalUrl,
        image : req.protocol + '://' + req.get('host') + "/asset/images/gaa790205662a4457a90c595eada13.jpg",
        hostname: req.protocol + '://' + req.get('host')
    };     
    News.find({})
    .then(listNews => {
        res.statusCode(301).render('admin/news/index', { News: listNews,  header :data_header })
    })
    .catch(err => {
        console.log('Error: ', err);
        throw err;
    })
});


router.get('/add-news', (req, res) => {
    var data_header = 
    { 
        title: 'Dashboard', 
        keywords: 'Arstudio , Arstudio thiết kế nội thất, Arstudio noi that dep, Arstudio đồ decor, Arstudio trang trí nội thất',
        description:'Arstudio sẽ là một trong những sự lựa chọn hoàn hảo cho việc trang trí và thiết kế nội thất. Giúp không gian nhà bạn tiết kiệm diện tích, sang trọng quý phái.',
        url :  req.protocol + '://' + req.get('host') + req.originalUrl,
        image : req.protocol + '://' + req.get('host') + "/asset/images/gaa790205662a4457a90c595eada13.jpg",
        hostname: req.protocol + '://' + req.get('host')
    };     
    res.render('admin/news/add-news.ejs',{
        header :data_header
    });
});

/**
 * Add new Product
 */
router.post('/add-news', (req, res) => {
    let newNews = new News();   
    newNews.Title= req.body.newsTitle;
    newNews.Bec = req.body.newsBec;
    newNews.H1Content = req.body.newsH1Content;
    newNews.PostName = req.body.newsPostName;
    newNews.Google.Title = req.body.GoogleTitle;
    newNews.Google.ShortContent = req.body.GoogleShortContent;
    newNews.Google.Keyword = req.body.GoogleKeyword;
    newNews.ShortContent = req.body.newsShortContent;
    newNews.FullContent = req.body.newsFullContent;
    newNews.ImageURL = req.body.newsImageURL;
    newNews.Active = req.body.newsActive;
    newNews.Orderby = req.body.newsOrderby;
    newNews.IsHot = req.body.newsIsHot;
    newNews.Tags.Tag = req.body.newsTag;
    newNews.CreatedDate = new Date();
    newUserPost.UserPost = req.username;
    newNews.ModifeDate = new Date();
    newNews.IPRequest =  requestIp.getClientIp(req);

    newProduct.save()
        .then(doc => {
            res.statusCode(301).redirect('/admin/news/')
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});



/**
 * Go to Update Product page
 */
router.get('/update-news/:newsId', (req, res) => {
    News.findById(req.params.newsId, (err, news) => {
        if (err) {
            console.log(err);
            throw err
        }
        res.render('admin/news/update-news', { news: news });
    })
});

/**
 * Delete product
 */
router.delete('/:newsId', (req, res) => {
    let newsId = req.params.newsId;
    News.findByIdAndDelete(newsId, (err, doc) => {
        if (err) throw err;
        res.send(doc)
    })
});

/**
 * Update product
 */
router.post('/:newsId', (req, res) => {
    let newsId = req.params.newsId;
    News.findByIdAndUpdate(
        { _id: newsId },
        { $set: { 
            Title :req.body.newsTitle,
            Bec : req.body.newsBec,
            H1Content  : req.body.newsH1Content,
            PostName  : req.body.newsPostName,
            Google :{
                Title  : req.body.GoogleTitle,
                ShortContent  : req.body.GoogleShortContent,
                Keyword  : req.body.GoogleKeyword,
            },            
            ShortContent  : req.body.newsShortContent,
            FullContent  : req.body.newsFullContent,
            ImageURL  : req.body.newsImageURL,
            Active  : req.body.newsActive,
            Orderby  : req.body.newsOrderby,
            IsHot  : req.body.newsIsHot,
            Tags :{
                Tag  : req.body.newsTag,
            },                   
            UserPost  : req.username,
            ModifeDate  : new Date(),
            IPRequest  :  requestIp.getClientIp(req),
        
        } },
        { useFindAndModify: false })
        .then(doc => {
            res.redirect('/admin/news/')
        })
});



function isLoggedIn(req, res, next) {
    // Nếu một user đã xác thực, cho đi tiếp
    if (req.isAuthenticated())
        return next();
    // Nếu chưa, đưa về trang chủ
    res.redirect('/admin/member/login');
}

module.exports = router;