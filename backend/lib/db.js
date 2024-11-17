import mongoose from "mongoose";

export const connectDB= async()=>{
    try {
        const conn= await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MonogDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error in connecting to MONGODB", error.message);
        process.exit();
    }
}