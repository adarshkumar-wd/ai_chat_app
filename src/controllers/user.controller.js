import { validationResult } from "express-validator"
import { register , login, tokenVerification } from "../services/user.service.js"

export const registerUser = async (req , res) => {

    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({success : false , message : error.array()[0].msg || "please provide valide data"})
    }

    try {
        const {username , email , password} = req.body
    
        if (!username) {
            return res.status(404).json({success : false , message : "username is required"})
        }
    
        if (!email) {
            return res.status(404).json({success : false , message : "email is required"})
        }
    
        if (!password) {
            return res.status(404).json({success : false , message : "password is required"})
        }
    
        const {userData , token} = await register(username , email , password)

        const options = {
            httpOnly : true,
            scure : false
        }

        return res
           .status(200)
           .cookie("token" , token , options)
           .json(
                {
                    success : true ,
                    user : userData ,
                    message : "user created successfully."
                }
            )

    } catch (error) {
        return res.status(400).json({success : false , message : error.message || "Something went wrong while creating the user.." })
    }
}

export const loginUser = async (req , res) => {

    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({success : false , message : error.array()[0].msg || "Please provide valide data"})
    }

    try {

        const {email , username , password} = req.body

        if (email == "not@req.com" && !username) {
            return res.status(400).json({success : false , message : "username is required."})
        }

        if (username == "not-req" && !email) {
            return res.status(400).json({success : false , message : "email is required."})
        }

        if (!password) {
           return res.status(400).json({status : false , message : "password is required."})
        }

        const {userData , token} = await login(email , username , password)

        const options = {
            httpOnly : true,
            secure : false
        }

        return res
            .status(200)
            .cookie("token" , token , options)
            .json(
                {
                    success : true,
                    user : userData,
                    message : "user login succesfully."
                }
            )

    } catch (error) {
        res
            .status(400)
            .json(
                {
                    success : false,
                    message : error.message || "Something went wrong while login the user.."
                }
            )
    }
}

export const userProfile = async (req , res) => {
    return res.status(200).json({success : true , user : req?.user , message : "userData fetched successfully."})
}

export const logoutUser = async (req , res) => {

    try {
        const user = req?.user

        if (!user) {
            return res.status(200).json({success : false , message : "Unauthorised user.."})
        }

        user.token = ""

        const options = {
            httpOnly : true,
            secure : false
        }

        return res
            .status(200)
            .clearCookie("token" , options)
            .json(
                {
                    success : true,
                    message : "User logout successfully."
                }
            )

    } catch (error) {
        return res.status(400).json({success : true , message : error.message || "something went wrong.."})
    }

}

export const verifyToken = async (req , res) => {

    const token = req.cookies?.token || req.header("Authorization").split(" ")[1]

    if (!token) {
        return res.status(400).json({success : false , message : "Unauthorised user"})
    }

    const verify = await tokenVerification(token)

    if (!verify) {
        return res.status(400).json({success : false , message : "Invalid Token"})
    }

    return res.status(200).json({success : true , message : "Authenticated user.."})

}