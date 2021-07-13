const User = require('../models/user');

exports.getUserById = (req, res, next, id) => {
    console.log("userid", id);
    User.findById({_id : id}).exec()
        .then( data => {
            if(data == undefined) {
                return res.status(400).json({
                    messgae : "no user with this Id exist",
                })
            }
            req.profile = data;
            req.profile.password = undefined;
            next();
        })
        .catch( err => {
            console.log(err);
            res.status(400).json({
                messgae : "error in finding user by id",
                error : err
            })
        })
}