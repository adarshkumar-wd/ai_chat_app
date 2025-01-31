import { Router } from "express";
import { addUserToProject, createProject, getAllProjects, getAllUsersOfProject, removeUserFromProject } from "../controllers/project.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/create" , authUser , createProject)
router.get("/all" , authUser , getAllProjects)

router.post("/add-user/:projectId" , authUser , addUserToProject)
router.get("/get-users/:projectId" , authUser , getAllUsersOfProject)
router.get("/remove-user/:projectId/:userId" , authUser , removeUserFromProject)


export default router
