var mongoose = require('mongoose')
var friendSchema=mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      status: {
        type: String,
        enum: ['Pending','Accepted','Rejected'],
        default: 'Pending'
    },
},{
    timestamps:true
})

module.exports=mongoose.model("Friend",friendSchema,"friends")