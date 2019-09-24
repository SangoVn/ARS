var express = require('express');
var router = express.Router();
var Ticket = require('../../models/ticket');

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
    Ticket.find({})
    .then(listNews => {
        res.statusCode(301).render('admin/ticket/index', { Ticket: listNews,  header :data_header })
    })
    .catch(err => {
        console.log('Error: ', err);
        throw err;
    })
});


router.get('/add-ticket', (req, res) => {
    var data_header = 
    { 
        title: 'Dashboard', 
        keywords: 'Arstudio , Arstudio thiết kế nội thất, Arstudio noi that dep, Arstudio đồ decor, Arstudio trang trí nội thất',
        description:'Arstudio sẽ là một trong những sự lựa chọn hoàn hảo cho việc trang trí và thiết kế nội thất. Giúp không gian nhà bạn tiết kiệm diện tích, sang trọng quý phái.',
        url :  req.protocol + '://' + req.get('host') + req.originalUrl,
        image : req.protocol + '://' + req.get('host') + "/asset/images/gaa790205662a4457a90c595eada13.jpg",
        hostname: req.protocol + '://' + req.get('host')
    };     
    res.render('admin/ticket/add-ticket.ejs',{
        header :data_header
    });
});

/**
 * Add new Product
 */
router.post('/add-ticket', (req, res) => {
    let newTicket = new Ticket();   
    
    newTicket.IPRequest =  requestIp.getClientIp(req);
    newTicket.Title = req.body.Title;
    newTicket.FullName = req.body.FullName;
    newTicket.Phone = req.body.Phone;
    newTicket.MemberRequest = req.body.MemberRequest;
    newTicket.DatetimeProcess = req.body.DatetimeProcess;
    newTicket.StatusPriority = req.body.StatusPriority;
    newTicket.StatusProcess = req.body.StatusProcess;
    newTicket.ModifeDate = new Date();
    newTicket.ModifeMember = req.username;
    newTicket.TicketContent.Message = req.body.Message;
    newTicket.TicketContent.MemberCreated = req.username;
    newTicket.TicketContent.CreateDate =new Date();
    newTicket.TicketContent.IP =  requestIp.getClientIp(req);     

    newTicket.save()
        .then(doc => {
            res.statusCode(301).redirect('/admin/ticket/')
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});



/**
 * Go to Update Product page
 */
router.get('/update-ticket/:ticketID', (req, res) => {
    Ticket.findById(req.params.ticketID, (err, ticket) => {
        if (err) {
            console.log(err);
            throw err
        }
        res.render('admin/ticket/update-ticket', { ticket: ticket });
    })
});

/**
 * Delete product
 */
router.delete('/:TicketId', (req, res) => {
    let ticketId = req.params.TicketId;
    Ticket.findByIdAndDelete(ticketId, (err, doc) => {
        if (err) throw err;
        res.send(doc)
    })
});

/**
 * Update product
 */
router.post('/:TicketId', (req, res) => {
    let TicketId = req.params.TicketId;
    News.findByIdAndUpdate(
        { _id: TicketId },
        { $set: { 
            Title :req.body.Title,
            FullName :req.body.FullName,
            Phone :req.body.Phone,
            MemberRequest :req.body.MemberRequest,
            DatetimeProcess :req.body.DatetimeProcess,
            StatusPriority :req.body.StatusPriority,
            StatusProcess :req.body.StatusProcess,
            ModifeDate :new Date(),
            ModifeMember :req.username,
            TicketContent :{
                Message :req.body.Message,
                MemberCreated :req.username,
                CreateDate : new Date(),
                IP :requestIp.getClientIp(req),
            } 
        
        } },
        { useFindAndModify: false })
        .then(doc => {
            res.redirect('/admin/ticket/')
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