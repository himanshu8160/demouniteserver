const Friend= require('../models/Friend')
const asyncHandler=require('express-async-handler')
const getAllRequest= asyncHandler(async (req,res)=>{
  
    await Friend.find({$or:[{senderId: req.body.user._id},{recieverId: req.body.user._id}]})
    .populate(["senderId","recieverId"])
    .exec((err, friends) => {
      if (err) {
        res.status(400).json({
            message:"Failed to fetch"
           })
      } else {
        res.status(200).json({
            requests:friends
           })
      }
    });
 
   
})


const sendRequest= asyncHandler(async (req,res)=>{
    const {recieverId} =req.body
    const friend=await Friend.findOne({$or:[{senderId: req.body.user._id},{recieverId: recieverId}]})
    console.log(friend)
   if(friend.length >0){
    res.status(200).json({
        message:"Request Already Sent"
       })
   }else{
    await Friend.create({senderId:req.body.user._id,recieverId:recieverId})

    res.status(200).json({
        message:"Request Successfully Sent"
       })
   }
   
})
const acceptRequest= asyncHandler(async (req,res)=>{
    const {id,status}=req.body
    const friend=await Friend.updateOne({_id:id},{status:status})
 
   if(friend){
    res.status(200).json({
        message:"Request Accepted"
       })
   }else{
    res.status(200).json({
        message:"Failed to accept"
       })
   }
   
})
const rejectRequest= asyncHandler(async (req,res)=>{
    const {id,status}=req.body
    const friend=await Friend.findOneAndDelete({_id:id})
 
   if(friend){
    res.status(200).json({
        message:"Request Rejected"
       })
   }else{
    res.status(200).json({
        message:"Failed to Reject"
       })
   }
   
})

module.exports={
    sendRequest,rejectRequest,acceptRequest,getAllRequest
}