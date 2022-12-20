var mongoose = require('mongoose')
var groupMemberSchema=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      groupId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Group",
      },
      userType: {
        type: String,
        enum: ['admin','member'],
        default: 'member'
    },
    
},{
    timestamps:true
})

module.exports=mongoose.model("GroupMember",groupMemberSchema,"groupMembers")