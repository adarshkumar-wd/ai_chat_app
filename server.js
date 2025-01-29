import dotenv from "dotenv";
dotenv.config()

import { app } from "./app.js";
import http , {createServer} from "http"
import { dbConnect } from "./src/db/DbConnect.js";

const server = createServer(app)

const port = process.env.PORT || 4000

dbConnect()
    .then(() => {
        console.log("Databse Connected Successfully..")

        server.listen(port , () => {
            console.log(`Server is running on port ${port}`)
        })

    }).catch(() => {
        console.log("db connection failed..")
    })