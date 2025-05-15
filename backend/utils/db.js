import mongoose from "mongoose";

// mongoDb connection 
export const connectDb=async()=>{
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("connection successful to database")  ;
    } catch (error) {
       console.log("database connection failed");
       process.exit(0);

    }
}