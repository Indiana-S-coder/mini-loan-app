const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
    const {token} = req.cookies
    
    if(!token){
        return next(new ErrorBoundaryHandler("Please login to continue", 401))
    }

    const decodeData = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = await User.findById(decodeData.id);
    next();
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