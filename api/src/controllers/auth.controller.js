const bcrypt =  require("bcrypt");

const User = require("../models/user.model");
const { registerErrorHandler } = require("../utils/apiHelpers");
const { generateAccessAndRefreshToken } = require("../utils/authHelpers");


async function registerUser(req, res){
    const _user = req.body
    try {
        const user = await User.create(_user)
        const token = generateAccessAndRefreshToken(user)
        res.json(token)
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
        const token = generateAccessAndRefreshToken(user)
        res.json(token)

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