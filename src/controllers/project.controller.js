import mongoose , {isValidObjectId} from "mongoose"
import { create , getAllProjectsByUserId , addUser , fetchUers , removeUser , fetchDetails } from "../services/project.service.js"

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

export const removeUserFromProject = async (req , res) => {

    const {projectId , userId} = req.params

    if (!projectId || !userId || !isValidObjectId(projectId) || !isValidObjectId(userId)) {
        return res.status(400).json({success : true , message : "Plase provide valid Id's"})
    }

    try {
        
        const newUsers = await removeUser(projectId , userId)

        if (!newUsers) {
            return res.status(400).json({success : false , message : "server error! user not removed"})
        }

        return res.status(200).json({success : true , newUsers : newUsers , message : "user removed successfully.."})

    } catch (error) {
        return res.status(400).json({success : false , message : error.message || "server error! user not removed.."})
    }

}

export const getProjectDetail = async (req , res) => {

    const {projectId} = req.params

    if (!projectId || !isValidObjectId(projectId)) {
        res.status(400).json({success : false , message : "please provide valid projectId.."})
    }

    try {

        const projectData = await fetchDetails(projectId)

        return res.status(200).json({success : true , projectData : projectData , message : "Project data fetched successfully..."})

    } catch (error) {
        return res.status(400).json({success : false , message : error.message || "server error! project Controller : Project Data not fetched..."})
    }

}