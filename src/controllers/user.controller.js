import { validationResult } from "express-validator"
import { register , login } from "../services/user.service.js"

export const registerUser = async (req , res) => {

    const error = validationResult(req)

    if (!error.isEmpty()) {
        res.status(400).json({success : false , message : error.array()[0].msg || "please provide valide data"})
    }

    try {
        const {username , email , password} = req.body
    
        if (!username) {
            res.status(404).json({success : false , message : "username is required"})
        }
    
        if (!email) {
            res.status(404).json({success : false , message : "email is required"})
        }
    
        if (!password) {
            res.status(404).json({success : false , message : "password is required"})
        }
    
        const {userData , token} = await register(username , email , password)

        const options = {
            httpOnly : true,
            scure : false
        }

        res
           .status(200)
           .cookie("token" , token , options)
           .json(
            {
                success : true ,
                user : userData ,
                message : "user created successfully."})

    } catch (error) {
        res.status(400).json({success : false , message : error.message || "Something went wrong while creating the user.." })
    }
}

export const loginUser = async (req , res) => {

    const error = validationResult(req)

    if (!error.isEmpty()) {
        res.status(400).json({success : false , message : error.array()[0].msg || "Please provide valide data"})
    }

    try {

        const {email , username , password} = req.body

        if (email == "not@req.com" && !username) {
            res.status(400).json({success : false , message : "username is required."})
        }

        if (username == "not-req" && !email) {
            res.status(400).json({success : false , message : "email is required."})
        }

        if (!password) {
            res.status(400).json({status : false , message : "password is required."})
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
    res.status(200).json({success : true , user : req?.user , message : "userData fetched successfully."})
}