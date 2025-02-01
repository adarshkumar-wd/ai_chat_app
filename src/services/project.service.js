import { projectModel } from "../models/product.model.js"
import {userModel} from "../models/user.model.js"

export const create = async (projectName , userId) => {

    try {
        const existProject = await projectModel.findOne({"name" : projectName})

        if (existProject) {
            throw new Error("Project name already exist..")
        }

        const project = await projectModel.create({
            name : projectName,
            users : []
        })


        if (!project) {
            throw new Error("server error while creating product !")
        }
        
        project.users.push(userId)
        project.save({validateBeforeUse : false})

        return project

    } catch (error) {
        throw new Error(error.message)
    }

}

export const getAllProjectsByUserId = async (userId) => {

    try {
        console.log(userId)
        const projects = await projectModel.find({"users" : userId})

        return projects

    } catch (error) {
        throw new Error(error.message || "Server error! while fetching the product..")
    }
    
}

export const addUser = async (username , projectId) => {

    try {
        
        const user = await userModel.findOne({"username" : username})

        if (!user) {
            throw new Error("User not exist..")
        }

        const project = await projectModel.findById(projectId)

        if (!project) {
            throw new Error("Provide valid project id..! project not available")
        }

        const userInProject = await projectModel.findOne({"_id" : projectId , "users" : user_id})

        if (!userInProject) {
            throw new Error("User not belong to this project")
        }

        const alreadyExistUser = await projectModel.findOne({"_id" : projectId , "users" : user._id})

        if (alreadyExistUser) {
            throw new Error("user already available..")
        }

        project.users.push(user._id)
        project.save({validateBeforeSave : false})

        return true

    } catch (error) {
        throw new Error(error.message)
    }
}

export const fetchUers = async (projectId) => {

    const project = await projectModel.findById(projectId)

    if (!project) {
        throw new Error("Project not found..")
    }

    return project.users

}

export const removeUser = async (projectId , userId) => {

    try {
        const project = await projectModel.findById(projectId)
    
        if (!project) {
            throw new Error("Project not available..")
        }
    
        const user = await userModel.findById(userId)
    
        if (!user) {
            throw new Error("Invalid user..")
        }

        const userInProject = await projectModel.findOne({"_id" : projectId , "users" : user_id})

        if (!userInProject) {
            throw new Error("User not belong to this project")
        }
    
        const newUsers = project.users.filter(user => !user.equals(userId))
    
        project.users = newUsers
        project.save({validateBeforeSave : false})
    
        return newUsers

    } catch (error) {
        throw new Error(error.message)
    }

}