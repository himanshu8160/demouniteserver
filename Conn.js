var mongoose =require('mongoose')
var Pusher=require('pusher')

const connection_url="mongodb+srv://unite_himanshu:xfNRE5tqkcOF2ESF@cluster0.qw1vukr.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
var Conn=mongoose.connection
Conn.on('error',function(err){
    console.log(err)
})


const push = new Pusher({
    appId: "1477001",
    key: "14812a9c509412c48197",
    secret: "e2f40072857497508b6e",
    cluster: "ap2",
    useTLS: true
  });

Conn.once('open',function(){
    console.log("MongoDB Connected")
    const msgCollection =Conn.collection('chats');
    const changeStream=msgCollection.watch()
    changeStream.on('change',(change)=>{
        console.log(change)
        if(change.operationType=='insert'){
            const messageDetails=change.fullDocument
            console.log(messageDetails)
            push.trigger('chats','inserted',{
                messageDetails:messageDetails
            })
        }else{
            console.log("Error triggering pusher")
        }
    })
})

module.exports=Conn