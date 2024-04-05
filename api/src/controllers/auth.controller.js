const bcrypt =  require("bcrypt");

const User = require("../models/user.model");
const { registerErrorHandler, userWithoutPassword } = require("../utils/apiHelpers");


async function registerUser(req, res){
    const _user = req.body
    try {
        const user = await User.create(_user)
        res.json(userWithoutPassword(user))
    } catch (error) {
        registerErrorHandler(error, res, _user?.email)
    }
}

async function loginUser(req, res) {
    const {
        email,
        password
    } = req.body
    try {
        const user = await User.findOne({
            email
        }).select(["+password"])
        
        if(!user) {
            throw new Error("Credentials missing")
        }
        const isPasswordTheSame = await bcrypt.compare(password, user.password)
        if(!isPasswordTheSame) {
            throw new Error("Credentials missing")
        }
        res.json(userWithoutPassword(user))

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