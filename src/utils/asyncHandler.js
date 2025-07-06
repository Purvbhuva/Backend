//1st way for promisse
const asyncHandler = (requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(err))
    }
}

export {asyncHandler}



//This is 2nd way for try catch
//this is called has heigher order function
//meaning it accept function has a perameter and return also has a perameter

// const asyncHandler = () => {}
//a function je perameter ma ivo ane haji extend karyo has a function
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}
//next is for middleware

// const asyncHandler = (fn)=>{async(req,res,next)=>{
//     try{

//         await fin(req,res,next)

//     }catch(error){
//         res.status(error.code ||500).json({success:false,message:error.message})
//     }
// }}