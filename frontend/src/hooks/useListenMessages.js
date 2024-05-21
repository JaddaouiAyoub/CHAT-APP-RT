import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notifaicationSound from "../assets/sounds/notification.mp3";
import { useAuthContext } from "../context/AuthContext";

import useGetUser from './useGetUser';

const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages , selectedConversation} = useConversation();
    const {authUser} = useAuthContext();

    const { user } = useGetUser(selectedConversation?.userName);
    useEffect(()=>{
        socket?.on("newMessage", (newMessage) => {
            
            //console.log('newMessage receiver ' , newMessage.receiverId , 'selectedConversation_Id' , selectedConversation?._id)
            //console.log('test',newMessage.receiverId=== authUser?._id)
            console.log(selectedConversation);
            console.log('test 2 pour l envoie de msg :',newMessage.senderId=== selectedConversation?._id)
            newMessage.shouldShake=true;
            const sound = new Audio(notifaicationSound);
            sound.play();
            if(newMessage.senderId=== selectedConversation?._id){
                setMessages([...messages,newMessage]);
            }
            
    })
    return () => socket?.off("newMessage")
    },[socket, messages, setMessages]);
  
}

export default useListenMessages