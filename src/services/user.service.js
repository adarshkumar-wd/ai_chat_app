import {userModel} from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const register = async (username , email , password) => {

    const existUser = await userModel.findOne({username})

    if (existUser) {
        throw new Error("username already exist")
    }

    const existEmail = await userModel.findOne({email})

    if(existEmail) {
        throw new Error("email already exist")
    }

    const user = await userModel.create({
        username : username,
        email : email,
        password : password
    })
        
    const token = await user.generateTokens()

    if (!token) {
        throw new Error("Problem in generating tokens.")
    }

    user.token = token
    user.save({validateBeforeSave : false})

    if (!user) {
        throw new Error("Something went wrong while creating the user..")
    }

    const userData = await userModel.findOne({"_id" : user._id}).select("-password -token")


    return {userData , token}

}

export const login = async (email , username , password) => {
    
    if (email == "not@req.com"){

        const user = await userModel.findOne({username})

        if (!user) {
            throw new Error("user not exist..")
        }

        const isPasswordCorrect =  await user.isPasswordCorrect(password)

        if (!isPasswordCorrect) {
            throw new Error("wrong password.")
        }

        const token = await user.generateTokens()

        if (!token) {
            throw new Error("Problem in generating tokens.")
        }

        user.token = token
        user.save({validateBeforeSave : false})

        const userData = await userModel.findOne({username}).select("-password -token")

        return {userData , token}

    } else {

        const user = await userModel.findOne({email})

        if (!user) {
            throw new Error("user not exist.")
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password)

        if (!isPasswordCorrect) {
            throw new Error("wrong password.")
        }

        const token = await user.generateTokens()

        if (!token) {
            throw new Error("Problem in generating tokens.")
        }

        user.token = token
        user.save({validateBeforeSave : false})

        const userData = await userModel.findOne({email}).select("-password -token")

        return {userData , token}

    }
}

export const tokenVerification = async (token) => {

    const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)

    if (!decodedToken) {
        throw new Error("invalid token..")
    }

    const userData = await userModel.findOne({"_id" : decodedToken._id}).select("-password")

    if (!userData) {
        throw new Error("User not found with this token..")
    }

    if (token !== userData.token) {
        throw new Error("Invalid Token found...")
    }

    return true

}