import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"

export const authUser =  async (req , res , next) => {

    try {
        
        const token = req.cookies?.token || req.header('Authorization')?.split(" ")[1]

        if (!token) {
            res.status(400).json({success : false , message : "UnAuthorised user"})
        }

        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)

        if (!decodedToken) {
            res.status(400).json({success : false , message : "Incorrect Token"})
        }

        const userData = await userModel.findOne({"_id" : decodedToken._id});

        if (!userData) {
            res.status(400).json({status : false , message : "Invalid token ! user not found." })
        }

        req.user = userData

        next()

    } catch (error) {
        res.status(400).json({success : false , message : error.message || "UnAuthorized user try to access"})
    }
}