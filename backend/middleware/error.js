const ErrorHandler = require("../util/errorhandler");

module.exports = (err, req, res, next) => {
    // Error in development mode
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong mongoose object id error
    if(err.name === "CastError"){
        const message = `Resource not found ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        sucess:true,
        message: err.message,
    })

}