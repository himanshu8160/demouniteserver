var {Router}= require("express")
const {protect} = require('../middleware/auth')
const { sendRequest,rejectRequest,acceptRequest,getAllRequest } = require("../contollers/friendController")
var friendRouter=Router()

friendRouter.post('/sendRequest',protect,sendRequest)
friendRouter.post('/rejectRequest',protect,rejectRequest)
friendRouter.post('/acceptRequest',protect,acceptRequest)
friendRouter.post('/getAllRequest',protect,getAllRequest)
module.exports=friendRouter