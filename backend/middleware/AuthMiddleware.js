const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../util/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
    const token  = req.headers.authorization && req.headers.authorization.split(" ")[1];
    console.log('token: ',token)
   
    if (token) {
    try {
        const decodeData = await jwt.verify(token, process.env.TOKEN_KEY); 
        req.user = await User.findById(decodeData._id);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token. Please login again"
        });
    }
}else {
        return next(new ErrorHandler("Please login to continue", 401));
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