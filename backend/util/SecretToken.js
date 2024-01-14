

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    
    // const options = {
    //     expires: new Date(Number(
    //         new Date()) + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    //     ),
    //     withCredentials: true,
    //     httpOnly: true,
    //     SameSite: 'None',
    // };

    res.status(statusCode).json({
        success: true,
        user,
        token,
    });
}

module.exports = sendToken;