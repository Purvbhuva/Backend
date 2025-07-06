//user.model here we write model for good practice only

import mongoose from "mongoose";

import jwt from "jsonwebtoken"

import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
  {
    
    username:{
        type:String,
        require:true,
        unique:true,
        lowecase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowecase:true,
        trim:true,
    },
    fullName:{
        type:String,
        require:true,
        trim:true,
        index:true,
    },
    avatar:{
        type:String,//cloudinary url like aws ek cloud che tya videos photo uplode kari ne url made
        require:true,
    },
    watchHistory:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
        }
    ],
    coverImage:{
        type:String,
    },
    password:{
        type:String,
        require:[true,'Password is required'],  
    },
    refreshToken:{
        type:String,
    },
  },{timestamps:true}
)

//this pre is hooks or middleware nothig else
//aya a work kavi rete kare javu data save thava ave 
//tyare a middle ware work kare ane function ma next atle lidhu ke next middlever ne call karva
userSchema.pre("save", async function(next){
    //here bcrypt encrypt the password
    //aya condition check kar va nu reason e ke jo passwor modified thai toj bcrypt karo 
    //nkr su thai har vakh te call thase 
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password,10)
        next()
    }
})

userSchema.methods.isPasswordCorrect = async function (password) {
    //this.password is encripted
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


// model bunav ane model nu name User ape ane kaya model ne reffer thi karvu "userSchema"
export const User = mongoose.model('User',userSchema)