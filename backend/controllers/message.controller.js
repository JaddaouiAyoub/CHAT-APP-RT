import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js';
import { getReceiverSocketId,io } from '../socket/socket.js';

export const sendMessage = async (req,res) => {
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants : {
                $all: [senderId , receiverId]
            } 
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId,receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        
        
        // this will not run in parallel
        // await conversation.save();
        // await newMessage.save();
        await Promise.all([conversation.save(),newMessage.save()]) ;
        // this will run in parallel , that means that conversation and new message will be added to the db at the same time 
        
        //SOCKET IO FUNCTIONALITY WILL DO HERE
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
           // console.log('le nouveau message ',newMessage);
            // used to send events to spécifique  client
            io.to(receiverSocketId).emit('newMessage',newMessage);
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller : "), error.message
        res.status(500).json({error:"Internal server error"});
    }
};


export const getMessages = async (req,res) => {
    try {
        
        const {id:userToChatId}= req.params;
        const senderId = req.user._id;


        const conversation = await Conversation.findOne({
            participants :{ $all:[senderId,userToChatId]},
        }).populate("messages") ;
        // populate permet d'avoire les messages meme pas leurs références  
        if(!conversation) return res.status(200).json([]);
       
        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller : ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
}