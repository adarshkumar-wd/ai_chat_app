import { projectModel } from "../models/product.model.js"

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