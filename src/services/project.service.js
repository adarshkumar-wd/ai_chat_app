import { projectModel } from "../models/product.model";

export const create = async (projectName) => {

    try {
        const existProject = await projectModel.findOne({"name" : projectName})

        if (!existProject) {
            throw new Error("Project name already exist..")
        }

        const project = await projectModel.create({
            name : projectName,
            users : []
        })

        if (!project) {
            throw new Error("server error while creating product !")
        }

        return project

    } catch (error) {
        throw new Error(error.message)
    }

}