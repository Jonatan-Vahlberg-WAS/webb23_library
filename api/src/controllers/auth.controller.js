const User = require("../models/user.model");


async function registerUser(req, res){
    const _user = req.body
    try {
        await User.create(_user)
        res.json({
            message: "User has registered"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    registerUser
}