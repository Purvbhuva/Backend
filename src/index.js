// require('dotenv').config()


//2ND APPROACH IS USE LIKE WE WRITE CODE IN DB folder THEN IMPPORT IN THIS 
//WHERE IN 1ST APPROACH WE WRITE FULL CODE IN INDEX.JS

/* Create a .env file in the root of your project (if using a monorepo structure like apps/backend/app.js, put it in the root of the folder where your app.js process runs)*/
// As early as possible in your application, import and configure dotenv:

//1st way //
// require('dotenv').config({path:'./env'})

//2nd way
//if we use this we need to update package.json in script
import dotenv from "dotenv"

import mongoose from 'mongoose'
//here we need to give ./constants.js because it give error 
import { DB_NAME } from './constants.js'
import connectDB from './db/index.js'
import { app } from "./app.js"


dotenv.config({
    path:'./env'
})


// here we write async method for connectDB
//has aync method is complete it give us a promise 
//which where handle .then . catch this are optional but for good practice

connectDB()
.then(()=>{

    //optional app.on use  for error only
    app.on('ERROR',()=>{
        console.log("Error In Server:!!!",Error);        
    })

    app.listen(process.env.PORT ||8000,()=>{
        console.log(`server is runnig at port : ${process.env.PORT}`);        
    })
})
.catch((error)=>{
    console.log("Mongo db connection failed !!!",error);
    
})


















//1ST
//THIS IS 1ST APPAROCH
/*
//mongoose is use for connecting the database
import mongoose from "mongoose"
import { DB_NAME } from "./constants";

import express from "express"
const app = express()
//this MONGODB_URL we take from .env or alse we also take it direct string from mongodb atlas

//this is direct way to connect Db
// mongoose.connect(' mongodb+srv://bhuvapurv6:8238863191#purv@cluster0.knfztuc.mongodb.net')

//another way to connect Db is 

//this is we called has if-e
//meaning it will execute the function imedtealy
//eg
// function dbConnection(){
//     try{
//         mongoose.connect(' mongodb+srv://bhuvapurv6:8238863191#purv@cluster0.knfztuc.mongodb.net')
//     }
//     catch(err){
//         console.log(err);
        
//     }
// }
// dbConnection()

//same like this is if-e syntax
// process is a built-in global object in Node.js.
// process.env is an object that contains environment variables.
// process.env.MONGODB_URL accesses the value of the MONGODB_URL environment variable.

// always use try catch for db connection
(async ()=>{
    try{
        //here there is oly connection of dataBase but we also want 
        //to give name to database show make slash and dbname
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    //optional
    //this is app listen
    //and this listen is use for error app.on()
    app.on("error",()=>{
        console.log("ERROR",error);
        throw error
    })

    app.listen(process.env.PORT,()=>{
        console.log(`App is listen at port ${process.env.PORT}`);
        
    })

    }catch(error){
        console.log("ERROR:",error);
        throw error
    }
})()

*/