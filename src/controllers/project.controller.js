import { create } from "../services/project.service.js";

export const createProject = async (req , res) => {
    const {projectName} = req.body

    if (!projectName) {
        return res.status(400).json({success : false , message : "Project name required.."})
    }

    try {
        const project = await create(projectName)

        return res.status(200).json({success : true , project : project , message : "project created successfully"})

    } catch (error) {
        return res.status(400).json({success : false , message : error.message || "Project not created! server error"})
    }

}