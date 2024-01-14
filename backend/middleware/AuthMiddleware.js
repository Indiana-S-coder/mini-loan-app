const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../util/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
    console.log(req.cookies.token);
    const token  = req.cookies.token;
    console.log('token: ',token)
    if (token) {
    try {
        const decodeData = jwt.verify(token, process.env.TOKEN_KEY);
        console.log(decodeData);
        req.user = await User.findById(decodeData._id);
        console.log(req.user);
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