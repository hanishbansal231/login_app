import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,'Please Provide unique username'],
        unique: [true,'Username Exist'],

    },
    password:{
        type: String,
        required: [true,'Please Provide a password'],
        unique: false,
    },
    email:{
        type: String,
        required: [true,'Please Provide unique email'],
        unique: true,
    },
    firtname:{type:String},
    lastname:{type:String},
    mobile:{type:Number},
    address:{type:String},
    profile:{type:String},
})

const User = mongoose.model("User", userSchema); // Create the User model
export default User; // Export the User model