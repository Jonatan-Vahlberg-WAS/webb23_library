const { verifyAccessToken } = require("../utils/token")


function authMiddleware(req, res, next){
    const token = req.header('Authorization') || ""
    const accessToken = token.split(" ")?.[1] || ""
    console.log("Access: ", accessToken)

    if(!accessToken) {
        return res.status(401).json({
            message: "User not authorized"
        })
    }

    try {
        const verifiedToken = verifyAccessToken(accessToken)
        req.userId = verifiedToken.userId
        return next()
    } catch (error) {
        console.log("error verifying user", error.message)
        res.status(401).json({
            message: "User not authorized"
        })
    }

}

module.exports = authMiddleware