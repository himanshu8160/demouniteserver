var {Router}= require("express")
const { updateUser,changePassword,searchUser,updateProfileImage,registerUser,loginUser, getMe,demo,getUsers,getUserById } = require("../contollers/userController")
const {protect} = require('../middleware/auth')
var userRouter=Router()
const multer =require("multer")
const path=require('path')
const contentStorage = multer.diskStorage({
    destination: 'ProfileImages', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() +'_'+file.originalname)
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
const contentUpload=multer({
    storage:contentStorage
})
userRouter.post('/registerUser',contentUpload.single('avatar'),registerUser)
userRouter.post('/loginUser',loginUser)
userRouter.get('/getMe',protect,getMe)
userRouter.post('/updateProfileImage',contentUpload.single('content'),protect,updateProfileImage)
userRouter.post('/getUserById',protect,getUserById)
userRouter.get('/getUsers',protect,getUsers)
userRouter.post('/searchUser',protect,searchUser)
userRouter.post('/changePassword',protect,changePassword)
userRouter.post('/updateUser',protect,updateUser)
userRouter.get('/demo',demo)
module.exports=userRouter