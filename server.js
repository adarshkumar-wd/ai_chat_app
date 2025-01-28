import dotenv from "dotenv";
dotenv.config()

import { app } from "./app.js";
import http , {createServer} from "http"
import { dbConnect } from "./src/db/DbConnect.js";

dbConnect()
    .then(() => {
        console.log("Databse Connected Successfully..")
    }).catch(() => {
        console.log("db connection failed..")
    })

const server = createServer(app)

const port = process.env.PORT || 4000

server.listen(port , () => {
    console.log(`Server is running on port ${port}`)
})