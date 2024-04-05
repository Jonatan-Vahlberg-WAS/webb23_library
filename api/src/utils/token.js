const jwt = require("jsonwebtoken");

function generateAccessAndRefreshToken(user) {
    const accesstoken = jwt.sign({
        userId: user.id
    },process.env.JWT_ACCESS_SECRET, {
        expiresIn: "12h"
    })
    const refreshToken = jwt.sign({
        userId: user.id
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "28d"
    })
    return {
        access: accesstoken,
        refresh: refreshToken
    }
}

function verifyAccessToken(token) {
    const verifiedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    console.log("verify token", verifiedToken)
    return verifiedToken
}

function verifyRefreshToken(token) {
    const verifiedToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    console.log("verify token", verifiedToken)
    return verifiedToken
}

module.exports = {
    generateAccessAndRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}