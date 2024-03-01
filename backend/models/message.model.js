import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", //reference to User collection
        required : true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", //reference to User collection
        required : true,
    },
    message:{
        type:String,
        required:true
    }
}  //createdAt , UpdatedAt => message.createdAt 15:30 12/12/2024
,{timestamps:true});

const Message = mongoose.model("Message",messageSchema)

export default Message ;