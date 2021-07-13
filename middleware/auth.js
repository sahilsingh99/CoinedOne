const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    let token = null;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
            token = req.headers.authorization.split(' ')[1];
        else if (req.query && req.query.token)
            token = req.query.token;
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                message : "user is not logged in",
                error : err
            })
        }
        console.log(decoded);
        req.auth = decoded._id;
        next();
    })
}

exports.isAuthenticated = (req, res, next) => {
    const validator = req.profile && req.auth == req.profile._id;
    if(!validator) {
        return res.status(403).json({
            msg : "ACCESS DENIED :("
        });
    }
    next();
}