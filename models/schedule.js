const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    day : [{
        type : String,
        required : true
    }],
    workingHours : {
        startTime : Number,
        endTime : Number,
        breakHours : {
            startTime : Number,
            endTime : Number
        }
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);