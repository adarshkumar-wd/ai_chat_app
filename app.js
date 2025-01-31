import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

export const app  = express();

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

//  ROUTES DECLARATION

import userRouter from "./src/routes/user.route.js"
import projectRouter from "./src/routes/project.route.js"

app.use("/users" , userRouter)
app.use("/projects" , projectRouter)