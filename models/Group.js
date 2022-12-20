var mongoose = require('mongoose')
var groupSchema=mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
},{
    timestamps:true
})

module.exports=mongoose.model("Group",groupSchema,"groups")