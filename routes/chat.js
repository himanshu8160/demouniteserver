var {Router}= require("express")
const {protect} = require('../middleware/auth')
const { sendImageVideo,sendMessage,getMessage } = require("../contollers/chatController")
var chatRouter=Router()
const multer =require("multer")
const path=require('path')
const contentStorage = multer.diskStorage({
    destination: 'Uploaded_Files', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() +'_'+file.originalname)
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
const contentUpload=multer({
    storage:contentStorage
})
chatRouter.post('/sendMessage',protect,sendMessage)
chatRouter.post('/sendImageOrVideo',contentUpload.single('content'),protect,sendImageVideo)
chatRouter.get('/getMessage/sync',protect,getMessage)
module.exports=chatRouter