const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 25,
        select: false,
    },
    email:{
        type: String,
        required: true,
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
    this.password = await bcrypt.hash(this.password, 12);
  });

  //JWT token
  userSchema.methods.getJWTToken = function () {
    return jwt.sign({id:this._id}, process.env.TOKEN_KEY,{
        expiresIn: process.env.JWT_EXPIRE
    });
  }

  userSchema.methods.comparePassword = async function(password){
        return await bcrypt.compare(password, this.password);
  }

module.exports = mongoose.model('User', userSchema);