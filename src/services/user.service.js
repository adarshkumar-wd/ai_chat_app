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

    const token = await user.generateTokens()

    if (!token) {
        throw new Error("Problem in generating tokens.")
    }

    const userData = await userModel.create({
        username : username,
        email : email,
        password : password,
        token : token
    })

    if (!userData) {
        throw new Error("Something went wrong while creating the user..")
    }

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

        const userData = await userModel.findOne({username})

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

        const userData = await userModel.findOne({email})

        return {userData , token}

    }
}