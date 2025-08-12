const { AuthReqMiddleware, isAdminMiddleware } = require("./auth")


module.exports = {
   AuthMiddleware:{ AuthReqMiddleware,isAdminMiddleware}
}