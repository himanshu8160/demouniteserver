const mongoose =require('mongoose')

const ChatSchema =mongoose.Schema({
    message:String,
    senderUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    receiverUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    type: {
      type: String,
      enum: ['message','video','image'],
      default: 'message'
  },
},
{
  timestamps: true,
  strict: true,
})

module.exports=mongoose.model("Chat",ChatSchema,"chats")