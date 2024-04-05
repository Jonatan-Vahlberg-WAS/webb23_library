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

async function loginUser(req, res) {
    const {
        email,
        password
    } = req.body

    try {
        const user = await User.findOne({
            email,
            password
        })
        if(!user) {
            throw new Error("Credentials missing")
        }
        
        res.json(user.toJSON({
            getters: true
        }))

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}