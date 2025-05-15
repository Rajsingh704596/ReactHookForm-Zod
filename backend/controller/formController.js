import {User} from "../models/formModel.js"

export const formController=async(req,res)=>{
    try {
     const {
      name,
      age,
      email,
      password,
      confirmPassword,
      phoneNo,
      gender} = req.body;

      const newUser = new User({
      name, 
      age,
      email,
      password,  // In real apps, you should hash passwords before saving them
      confirmPassword,
      phoneNo,
      gender,
    });

    // Save the new user to MongoDB
    await newUser.save();

     return res.status(201).json({
        message:"User Form data save successfully"
     })
    } catch (error) {
        console.error(error);
     return res.status(500).json({message:"failed to save user form data"})  
    }
}