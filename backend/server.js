import express from "express";
import cors from "cors";
import userRoutes from "./routes/formRouter.js"
import { connectDb } from "./utils/db.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json()); // handle JSON requests
app.use(express.urlencoded({extended:true}
))  //Form submission data parse


// router
app.use('/api/user',userRoutes)

app.get("/",(req,res)=>{
    res.send("home page")
})


// Database connection
connectDb();

const port = isNaN(import.meta.PORT ) ? 3000 : parseInt(import.meta.PORT);  // validation of port no

//start the server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});