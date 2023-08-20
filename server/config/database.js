import mongoose from "mongoose";
const connectDB = () =>{
   try{
    mongoose.connect("mongodb://127.0.0.1:27017/login_app",{
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(() => {
        console.log("Connected Successfully...")
    })
    .catch((err) =>{
        console.error(err);
        process.exit(1);
    })
   }catch(err){
    console.log(err);
   }
}
export default connectDB;