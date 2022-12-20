var {Router}= require("express")
var userRouter =require("./user")
var chatRouter = require("./chat")
var friendRouter = require("./friend")
var mainRouter=Router()
mainRouter.use('/user',userRouter)
mainRouter.use('/chat',chatRouter)
mainRouter.use('/friend',friendRouter)
module.exports=mainRouter