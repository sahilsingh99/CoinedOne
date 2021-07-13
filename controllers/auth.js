// modules for hashing
const bcrypt = require('bcrypt'),
      jwt   = require('jsonwebtoken');

// User model
const User = require('../models/user');


// signup 
exports.signup = (req, res, next) =>{
    const {username, email, password} = req.body;
    console.log(req.body);

    User.findOne({email})
        .then( user => {
            if(user) {
                res.status(409).json({
                    message : "Mail Exists"
                })
            } else {
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(password, salt, function (err2, hash) {
                        console.log("error => ", err2);
                        if(err2){
                            return res.status(500).json({
                                message : "error in hashing",
                            })
                        } 
                        const user = new User( {
                            username : username,
                            email : email,
                            password : hash
                        });
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message : "User created Successfully :)",
                                    data : {
                                        user : {
                                            username : result.name,
                                            userId : result._id,
                                            email : result.email,
                                            password : result.password
                                        }
                                    }
                                })
                            })
                            .catch( err => {
                                return res.status(500).json({
                                    message : "error in saving"
                                })
                            })
                    })
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                message : "error in finding"
            })
        })
}

// login 
exports.login = (req, res, next) => {

    const {email , password} = req.body;

    User.findOne({email})
        .exec()
        .then(user => {
            if(!user || user.length < 1) {
                res.status(401).json({
                    message : "Auth failed :("
                })
            } else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err){
                        return res.status(500).json({
                            message : "error in comparing"
                        })
                    } else {
                        if(!result) {
                            res.status(401).json({
                                message : "Auth failed :("
                            })
                        } else{
                            // generate token
                            const token = jwt.sign({
                                expiresIn : '365d',
                                _id : user._id
                            }, process.env.SECRET);
                            // put token in cookie
                            res.cookie("token", token, { maxAge : 360000 });

                            res.status(202).json({
                                message : "Logined successfully :)",
                                data : {
                                    userId : user._id,
                                    token : token
                                }
                            });
                        }
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message : "error in finding"
            })
        })
}

// logout
exports.logout = (req, res, next) => {

    // remove token 
    res.clearCookie("token");

    res.status(200).json({
        message : "Logged out successfully :)"
    })
}
