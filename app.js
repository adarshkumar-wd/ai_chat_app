import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

export const app  = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

//  ROUTES DECLARATION

import userRouter from "./src/routes/user.route.js"

app.use("/users" , userRouter)