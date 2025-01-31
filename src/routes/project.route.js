import { Router } from "express";
import { addUserToProject, createProject, getAllProjects } from "../controllers/project.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/create" , authUser , createProject)
router.get("/all" , authUser , getAllProjects)

router.post("/add-user/:projectId" , authUser , addUserToProject)


export default router
