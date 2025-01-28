import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const dbConnect = await mongoose.connect(process.env.DATABASE_URL);

        if(!dbConnect){
            console.log("Error ! in Databse Connection..")
        }

    } catch (error) {
        console.log(error.message || "Databse connecion failed !")
    }
}