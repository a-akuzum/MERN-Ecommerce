const User = require('../models/user')


exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }

        req.profile = user;
        next();
    });
}

exports.read = (req, res) => {
    req.profile.hashed_password = undefined // make sure dont send password infos
    req.profile.salt = undefined
    return res.json(req.profile)
}

exports.update = (req, res) => {
//whatever coming from req body will set using set
//new is whne it is updated it will send new json response
    User.findOneAndUpdate(
        {_id: req.profile._id}, 
        {$set: req.body}, 
        {new: true},
        (err, user) => {
            if(err){
                return res.status(400).json({
                   error: "You are not authorized for this change" 
                })
            }
            user.hashed_password = undefined // make sure dont send password infos
            user.salt = undefined
            res.json(user)
        }
        )
}