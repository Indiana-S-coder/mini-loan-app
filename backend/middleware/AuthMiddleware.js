const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../util/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    console.log(token)
    if(!token){
        return next(new ErrorHandler("Please login to continue", 401))
    }

    try {const decodeData = jwt.verify(token, process.env.TOKEN_KEY);
    
    req.user = await User.findById(decodeData.id);
    next();
}catch (error){
    return next(new ErrorHandler("Invalid token. Please login again", 401))
}
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resource`, 403
                )
            );
        }
        next();
    }
}