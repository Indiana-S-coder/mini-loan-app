const User = require('../models/user');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../util/errorhandler');
const sendToken = require('../util/SecretToken');


exports.Signup = catchAsyncErrors(async(req, res, next) => {
    
    const {userName, email, password} = req.body;
    const user = await User.create({
        userName,
        email,
        password,
    });
    sendToken(user, 201, res); 
});


exports.Login = catchAsyncErrors(async(req, res, next) => {
        const { email, password} = req.body;
        
        if(!email || !password) {
            return next(new ErrorHandler("All fields are required", 400));
        }

        const user = await User.findOne({ email }).select('+password');

        if(!user){
            return next(new ErrorHandler( 'Incorrect password or email', 401));
        }
        
        const isPasswordMatched = await user.comparePassword(password);

        if(!isPasswordMatched){
            return next(new ErrorHandler('Incorrect password', 401));
        }

        sendToken(user, 200, res);
    });

    exports.Logout = catchAsyncErrors(async(req, res, next) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        
        res.status(200).json({
            success: true,
            message: "Logged out"
        })
    })