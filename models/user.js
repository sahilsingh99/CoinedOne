const mongoose = require('mongoose');

const  userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        minlength : 4
    },
    email : {
        type : String,
        required : true,
        unique : true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 6 
    },
    app : {
        restrictedApps : [String],
        limitedApps : [{
            name : {
                type : String,
            },
            weekDayLimit : {
                type : Number,
            },
            weekEndLimit : {
                type : Number,
            }
        }] 
    }
}, {timestamps : true});

module.exports = mongoose.model('User', userSchema);