import mongoose from 'mongoose'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    
    username : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        minLength : [3 , "username must be atleast 3 character long"]
    },

    email : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true,
        minLength : [4 , "Email must be atleast 4 characters long"]
    },

    password : {
        type : String,
        required : true,
        minLength : [4 , "password must be atleast 4 chaacter long"]
    }

} ,{timestamps : true})

userSchema.pre("save" , async function(next) {
    if(!this.isModified("password")) return next()

    const salt = await bcrypt.genSalt(10)
    this.password = bcrypt.hash(this.password , salt);
    next()

})

userSchema.methods.isPasswordCorrect = function (password) {
    return bcrypt.compare(password , this.password);
}

userSchema.methods.generateTokens = function () {
    return jwt.sign({_id : this._id} , process.env.ACCESS_TOKEN_SECRET , {expiresIn : process.env.ACCESS_TOKEN_EXPIRY})
}

export const userModel = mongoose.model("user" , userSchema)