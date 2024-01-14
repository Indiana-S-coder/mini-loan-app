const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please enter your name'],
        min: 3,
        max: 20,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        min: 4,
        max: 25,
        select: false,
    },
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    role:{
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });

  //JWT token
  userSchema.methods.getJWTToken = function () {
    console.log(this._id)
    const token = jwt.sign({_id:this._id.toString()}, process.env.TOKEN_KEY,{
        expiresIn: process.env.JWT_EXPIRE
    });
    console.log(token);
    return token;
  }

  userSchema.methods.comparePassword = async function(password){
        return await bcrypt.compare(password, this.password);
  }

module.exports = mongoose.model('User', userSchema);