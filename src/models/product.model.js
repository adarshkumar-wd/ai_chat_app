import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({

    name : {
        type : String,
        require : true,
        unique : true
    },

    users : [{
        type : mongoose.Schema.ObjectId,
        ref : userModel
    }]

} , {timestamps : true})

export const projectModel = mongoose.model("product" , projectSchema)