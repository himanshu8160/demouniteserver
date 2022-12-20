
const Chat = require('../Models/Chat')
const asyncHandler=require('express-async-handler')
var Conn=require('../Conn')
var Pusher=require('pusher')

const push = new Pusher({
    appId: "1477001",
    key: "14812a9c509412c48197",
    secret: "e2f40072857497508b6e",
    cluster: "ap2",
    useTLS: true
  });

const sendMessage=(req,res)=>{
    console.log(req)
    const values={'message':req.body.message,'senderUserId':req.body.user._id,receiverUserId:req.body.frndId}
    console.log(values)
    Chat.create(values,(err,data)=>{
        if(err){
            res.status(500).send(err.message)
            
        }else{
            const msgCollection =Conn.collection('chats');
            const changeStream=msgCollection.watch()
            changeStream.on('change',(change)=>{
                console.log(change)
                push.trigger('chats','inserted',{
                    messageDetails:"demo"
                })
               
            })
            res.status(201).send(`New message created : \n ${data}`)
        }
    })
}

const sendImageVideo=(req,res)=>{
    console.log(req.body)
    const values={message:"http://localhost:5000/Uploaded_Files/"+req.file.filename,senderUserId:req.body.user._id,receiverUserId:req.body.receiverUserId,type:req.body.type}
    console.log(values)
    Chat.create(values,(err,data)=>{
        if(err){
            res.status(500).send(err.message)
            
        }else{
            const msgCollection =Conn.collection('chats');
            const changeStream=msgCollection.watch()
            changeStream.on('change',(change)=>{
                console.log(change)
                push.trigger('chats','inserted',{
                    messageDetails:"demo"
                })
               
            })
            res.status(201).send(`New message created : \n ${data}`)
        }
    })
}

const getMessage= asyncHandler(async(req,res)=>{

    console.log(req.query.frndId)
    // Chat.find()
    // .or([{senderUserId:req.query.frndId},{receiverUserId:req.query.frndId}])
    // .or([{ senderUserId: req.body.user._id }, { receiverUserId: req.body.user._id }])
    // .populate("senderUserId")
    // .populate("receiverUserId")
    // .exec((err, chats) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     res.status(200).send({'chats':chats,'id':req.body.user._id});
        
    //   }
    // });
    Chat.find()
    .and([
        {$or:[{senderUserId:req.query.frndId},{receiverUserId:req.query.frndId}]},
        {$or:[{ senderUserId: req.body.user._id }, { receiverUserId: req.body.user._id }]}
    ])
    .populate("senderUserId")
    .populate("receiverUserId")
    .exec((err, chats) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send({'chats':chats,'id':req.body.user._id});
        
      }
    });
})
module.exports={
    sendMessage,getMessage,sendImageVideo
}