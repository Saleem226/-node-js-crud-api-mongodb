const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    bio:{
        type:String,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        required:true,
        default:Date.now()
    }

})

module.exports=mongoose.model('user',userSchema)