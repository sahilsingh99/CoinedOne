const User = require('../models/user');
const Schedule = require('../models/schedule');

exports.isAuthorized = (req, res, next) => {
    const validator = req.schedule.user._id.equals(req.profile._id);
    if(!validator) {
        return res.status(403).json({
            message : "Authorization failed :("
        });
    }
    next();
}

exports.getScheduleById = (req, res, next, id) => {
    console.log("schedule id", id);
    Schedule.findById({_id : id}).populate("user", "_id, username")
        .exec()
        .then( data => {
            if(data == undefined) {
                return res.status(400).json({
                    messgae : "no user with this Id exist",
                })
            }
            req.schedule = data;
            next();
        })
        .catch(err => {
            res.status(400).json({
                message : "error in finding schedule by Id",
                error : err
            })
        })
}

exports.getAllSchedules = (req, res, next) => {
    Schedule.find({user : req.profile._id}).populate("user", "_id, username")
        .exec()
        .then( data => {
            res.status(200).json({
                messgae : "fetched data successfully",
                data : data
            })
        })
        .catch( err => {
            res.status(400).json({
                message : "error in finding schedule",
                error : err
            });
        })
}

exports.getSchedule = (req, res, next) => {
    res.status(200).json({
        message : "fetched data successfully",
        data : req.schedule
    });
}

exports.addSchedule = (req, res, next) => {
    const {days, workingHours} = req.body;
    const schedule = new Schedule({
        day : days,
        workingHours : workingHours
    });
    schedule.user = req.profile._id;
    schedule.save()
        .then( data => {
            res.status(200).json({
                messgae : "schedule added successfully",
                data : data,
            })
        })
        .catch(err => {
            res.status(400).json({
                message : "error in adding schedule",
                error : err
            });
        })
}

exports.updateSchedule = (req, res, next) => {
    Schedule.findByIdAndUpdate(
        {_id : req.schedule._id},
        {
            day : req.body.days,
            workingHours : req.body.workingHours
        },
        {new : true, useFindAndModify : false})
        .then(schedule => {
            res.status(200).json({
                message : "schedule successfully updated",
                data : schedule
            })
        })
        .catch(err => {
            res.status(400).json({
                message : "error in updating schedule",
                error : err
            });
        })
}

exports.deleteSchedule = (req, res, next) => {
    Schedule.findByIdAndDelete({_id : req.schedule._id})
        .then( schedule => {
            res.status(200).json({
                message : "schedule deleted successfully",
                data : schedule
            });
        })
        .catch(err => {
            res.status(400).json({
                message : "error in deleting schedule",
                error : err
            });
        })
}