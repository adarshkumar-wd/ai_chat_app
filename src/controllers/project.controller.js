import mongoose , {isValidObjectId} from "mongoose"
import { create , getAllProjectsByUserId , addUser , fetchUers } from "../services/project.service.js"

export const createProject = async (req , res) => {
    const {projectName} = req.body
    const user = req?.user

    if (!user) {
        return res.status(400).json({success : true , message : "Unauthorised user"})
    }

    if (!projectName) {
        return res.status(400).json({success : false , message : "Project name required.."})
    }

    try {
        const project = await create(projectName , user._id)

        return res.status(200).json({success : true , project : project , message : "project created successfully"})

    } catch (error) {
        return res.status(400).json({success : false , message : error.message || "Project not created! server error"})
    }

}

export const getAllProjects = async (req , res) => {

    try {
        const user = req?.user
    
        if (!user) {
            return res.status(400).json({success : false , message : "Unauthorised user"})
        }
    
        const projects = await getAllProjectsByUserId(user._id)

        return res.status(200).json({success : true, projects : projects , message : "project fetched successfully.."})

    } catch (error) {
        
    }

}

export const addUserToProject = async (req , res) => {

    const {username} = req.body
    const {projectId} = req.params

    if (!projectId || !isValidObjectId(projectId)) {
        return res.status(400).json({success : false , message : "Please provide valid projectId"})
    }

    if (!username) {
        return res.status(400).json({success : false , message : "username required.."})
    }

    try {

        const project = await addUser(username , projectId)

        if (!project) {
            return res.status(500).json({success : false , message : "something went wrong! while adding user"})
        }

        return res.status(200).json({success : true , message : "User added successfully.."})

    } catch (error) {
        return res.status(400).json({success : false , message : error.message || "Not able to add user! Server error"})
    }

}

export const getAllUsersOfProject = async (req , res) => {

    const {projectId} = req?.params

    if (!projectId || !isValidObjectId(projectId)) {
        return res.status(400).json({success : false , message : "Please provide valid id.."})
    }

    try {
        
        const users = await fetchUers(projectId)

        return res.status(200).json({success : true , users , message : "Users fetched succesfully.."})

    } catch (error) {
        return res.status(404).json({success : false , message : error.message || "Server error! while fetching the users"})
    }

}