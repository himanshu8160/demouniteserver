var mongoose = require('mongoose')
var groupChatSchema=mongoose.Schema({
    message:String,
    senderUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      groupId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Group",
      },
      type: {
        type: String,
        enum: ['message','video','image'],
        default: 'message'
    },
    
},{
    timestamps:true
})

module.exports=mongoose.model("GroupChat",groupChatSchema,"groupChats")