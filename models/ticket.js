var mongoose = require('mongoose');

// định nghĩ cấu trúc user model
var ticketSchema = mongoose.Schema({
    Title: String,
    FullName : String,
    Phone : String,
    MemberRequest: String,
    DatetimeProcess : String,
    StatusPriority : String,
    StatusProcess : String,
    CreateDate : Date,
    ModifeDate : Date,
    ModifeMember : String,
    TicketContent: {
        Message : String,
        MemberCreated : String,
        CreateDate : String,
        IP : String
    }
});
// methods ======================

module.exports = mongoose.model('Ticket', ticketSchema);