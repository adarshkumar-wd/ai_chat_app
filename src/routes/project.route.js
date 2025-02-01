import { Router } from "express";
import { addUserToProject, createProject, getAllProjects, getAllUsersOfProject, getProjectDetail, removeUserFromProject } from "../controllers/project.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/create" , authUser , createProject)
router.get("/all" , authUser , getAllProjects)

router.put("/add-user/:projectId" , authUser , addUserToProject)
router.get("/get-users/:projectId" , authUser , getAllUsersOfProject)
router.delete("/remove-user/:projectId/:userId" , authUser , removeUserFromProject)
router.get("/project-data/:projectId" , authUser , getProjectDetail)


export default router
