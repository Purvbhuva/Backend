import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import express from "express"

const app = express()
//we use function
const connectDB = async()=>{
    try{
    //here we store connection mongoose give objectS
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB host: ${connectionInstance.connection.host}`);
        

    //this app.on is optional listen but for good practice
    app.on("error",()=>{
        console.log("ERROR:",error);
        throw error;
    })

    app.listen(process.env.PORT,()=>{
        console.log(`App is listen at port ${process.env.PORT}`); 
    })

    }catch(error){  
        console.log("ERROR:",error);
    }
}

export default connectDB