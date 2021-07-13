const user = require('../models/user');
const User = require('../models/user');

exports.getAllRestrictedApps = (req, res, next) => {
    User.findById({_id : req.profile._id})
        .then( data => {
            res.status(200).json({
                messgae : "fetched data successfully",
                data : data.app.restrictedApps
            })
        })
        .catch( err => {
            res.status(400).json({
                message : "error in finding restricted apps",
                error : err
            });
        })
}

exports.getAllLimitedApps = (req, res, next) => {
    User.findById({_id : req.profile._id})
        .exec()
        .then( data => {
            res.status(200).json({
                messgae : "fetched data successfully",
                data : data.app.limitedApps
            })
        })
        .catch( err => {
            res.status(400).json({
                message : "error in finding schedule",
                error : err
            });
        })
}

exports.getLimitedApp = (req, res, next) => {

    User.findById({_id : req.profile._id})
        .exec()
        .then( data => {
            let weekEndLimit, weekDayLimit;
            for(let i = 0; i < data.app.limitedApps.length; i++) {
                if(data.app.limitedApps[i].name === req.body.name) {
                    weekDayLimit = data.app.limitedApps[i].weekDayLimit;
                    weekEndLimit = data.app.limitedApps[i].weekEndLimit;
                    break;
                }
            }
            let appData = {
                name : data.app.limitedApps.name,
                weekDayLimit : {
                    weekDayLimit
                }, 
                weekEndLimit: {
                    weekEndLimit
                }
            };
            res.status(200).json({
                message : "fetched data successfully",
                data : appData,
            });
        })
        .catch( err => {
            res.status(400).json({
                message : "error in finding schedule",
                error : err
            });
        })   
}

exports.addRestrictedApp = (req, res, next) => {
    User.findById({_id : req.profile._id}).exec()
        .then(user => {
            if(user.app.restrictedApps.includes(req.body.name) === false) {
                user.app.restrictedApps.push(req.body.name);
            }
            user.save()
                .then( data => {
                    res.status(200).json({
                        messgae : "fetched data successfully",
                        data : data.app.restrictedApps
                    })
                })
                .catch( err => {
                    res.status(400).json({
                        message : "error in finding schedule",
                        error : err
                    });
                })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                message : "error in finding app data",
                error : err
            });
        })
}

exports.addLimitedApp = (req, res, next) => {
    User.findById({_id : req.profile._id})
        .then(user => {
            for(var i = 0; i < user.app.limitedApps.length; i++) {
                if(user.app.limitedApps[i].name === req.body.name) {
                    user.app.limitedApps.splice(i, 1);
                    break;
                }
            }
            user.app.limitedApps.push(req.body);
            console.log(user.app.limitedApps);
            user.save()
                .then(data => {
                    res.status(200).json({
                        message : "fetched data successfully",
                        data : data.app.limitedApps
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        message : "error in adding restricted app",
                        error : err
                    });
                })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                message : "error in finding user data",
                error : err
            });
        })
}

exports.deleteLimitedApp = (req, res, next) => {
    User.findById({_id : req.profile._id})
        .then( user => {
            for(var i = 0; i < user.app.limitedApps.length; i++) {
                if(user.app.limitedApps[i].name == req.body.name) {
                    user.app.limitedApps.splice(i, 1);
                    break;
                }
            }
            user.save()
                .then(data => {
                    res.status(200).json({
                        message : "limited app deleted successfully",
                        data : data.app.limitedApps
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        message : "error in deleting restricted app",
                        error : err
                    });
                })
        })
}