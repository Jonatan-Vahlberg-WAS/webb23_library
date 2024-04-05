const jwt = require("jsonwebtoken");

function generateAccessAndRefreshToken(user) {
    const accesstoken = jwt.sign({
        userId: user.id
    },"secret", {
        expiresIn: "1m"
    })
    const refreshToken = jwt.sign({
        userId: user.id
    }, "refreshSecret", {
        expiresIn: "28d"
    })
    return {
        access: accesstoken,
        refresh: refreshToken
    }
}

module.exports = {
    generateAccessAndRefreshToken
}