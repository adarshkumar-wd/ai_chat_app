import {userModel} from "../models/user.model.js"

export const register = async (username , email , password) => {

    const existUser = await userModel.findOne({username : username})

    if (existUser) {
        throw new Error("username already exist")
    }

    const existEmail = await userModel.findOne({email : email})

    if(existEmail) {
        throw new Error("email already exist")
    }

    const userData = await userModel.create({
        username : username,
        email : email,
        password : password
    })

    if (!userData) {
        throw new Error("Something went wrong while creating the user..")
    }

    return userData

}