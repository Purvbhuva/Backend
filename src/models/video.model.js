import mongoose from "mongoose";
//this model we created according to database design

//1.stp is to import mongooseAggregatePaginate
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//here we use 
//npm i mongoose-aggregate-paginate-v2
const videoSchema = new mongoose.Schema(
    {
        videoFile:{
            type:String,//cloudinary url
            require:true
        },
        thumbnail:{
            type:String,
            require:true
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        title:{
            type:String,
            require:true
        },
        description:{
            type:String,
            require:true
        },
        duration:{
            type:Number,
            require:true
        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
    },{timestamps:true}
)
//2.nd step is to use this mongooseAggregatePaginate
videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema)