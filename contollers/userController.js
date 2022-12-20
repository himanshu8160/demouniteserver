const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User = require('../models/User')
const Friend= require('../models/Friend')
// @route Post api/user/loginUser
// @access Public
const loginUser= asyncHandler(async (req,res)=>{
    const {email,password}= req.body
   
    //Check user's email
    const user=await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            name:user.name,
            avatar:user.avatar,
            type:user.type,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid Credentials")
    }
})


// @route Get api/user/getMe
// @access Private
const getMe= asyncHandler(async (req,res)=>{
    const {user}=req.body
    res.status(200).json({user})
})

const getUserById= asyncHandler(async (req,res)=>{
    const {id}=req.body
    const user=await User.findOne({_id:id})
   
    res.json({
      "user":user
    })
})

const getUsers= asyncHandler(async (req,res)=>{
    const {user}=req.body
    // const allUser=await User.find({ _id: { $ne: user._id } })
    // res.status(200).json(allUser)
    await Friend.find({$or:[{senderId: req.body.user._id},{recieverId: req.body.user._id}],status:"accept"})
    .populate(["senderId","recieverId"])
    .exec((err, friends) => {
      if (err) {
        res.status(400).json({
            message:"Failed to fetch"
           })
      } else {
        res.status(200).json(friends)
      }
    });

})

const demo= asyncHandler(async (req,res)=>{
 
    res.status(200).json({message:"okay"})
})
// @route Post api/user/registerUser
// @access Public
const registerUser= asyncHandler(async (req,res)=>{
  
    var avatar ="http://localhost:5000/ProfileImages/"+req.file.filename
    const {name,email,password}= req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please Add All Fields')
    }
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("User Already Exists")
    }
    // Hash Password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    //Create User
    const user=await User.create({
        name,email,password:hashedPassword,avatar:avatar
    })
    if(user){
        res.status(201).json({
            name:user.name,
            avatar:user.avatar,
            type:user.type,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid data")
    }
    
})

const generateToken= (id)=>{
    return jwt.sign({id},'abc123',{
        expiresIn:'30d'
    })
}

const updateProfileImage= asyncHandler(async (req,res)=>{

    const user =await User.updateOne({_id:req.body.user._id},{avatar:"http://localhost:5000/ProfileImages/"+req.file.filename})

    
    if(user){
        res.status(200).json({
         message:"Profile Image Update"
        })
    }else{
        res.status(400).json({
            message:"Failed to update"
        })
    }

})
const searchUser=asyncHandler(async (req,res)=>{
  
    const {data}= req.body
    
    var d= await User.find({$or:[{name: {$regex : "^" + data}},{email: {$regex : "^" + data}}]}).select("-password");
   
        res.status(200).json({d})
    
})

const changePassword=asyncHandler(async (req,res)=>{
  
  
    const {password} =req.body
     // Hash Password
     const salt=await bcrypt.genSalt(10)
     const hashedPassword=await bcrypt.hash(password,salt)
    const user =await User.updateOne({_id:req.body.user._id},{password:hashedPassword})

    
    if(user){
        res.status(200).json({
         message:"Password Updated"
        })
    }else{
        res.status(400).json({
            message:"Failed to update"
        })
    }
    
})
const updateUser=asyncHandler(async (req,res)=>{
  
    const {name} =req.body
    const user =await User.updateOne({_id:req.body.user._id},{name})

    
    if(user){
        res.status(200).json({
         message:"Profile  Update"
        })
    }else{
        res.status(400).json({
            message:"Failed to update"
        })
    }
})
module.exports={
    updateUser,changePassword,registerUser,loginUser,getMe,demo,getUsers,getUserById,updateProfileImage,searchUser
}