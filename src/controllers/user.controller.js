import { validationResult } from "express-validator"
import { register } from "../services/user.service.js"

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
    
        const user = await register(username , email , password)

        res.status(200).json({success : true , user : user , message : "user created successfully."})

    } catch (error) {
        res.status(400).json({success : false , message : error.message || "Something went wrong while creating the user.." })
    }
}