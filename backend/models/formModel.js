import {Schema, model} from "mongoose";

// Schema create in db
const userSchema =Schema({
    name:{type:String, require:true},
    age:{type:Number, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
    confirmPassword:{type:String, require:true},
    phoneNo:{type:Number, require:true},
    gender:{type:String, require:true}
})


// collection name create in db
export const User= model("UserForm",userSchema);