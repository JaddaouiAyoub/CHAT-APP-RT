import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client';
import useGetFriendInvitations from "../hooks/useGetFriendInvitations";
import notifaicationSound from "../assets/sounds/notification.mp3";
import toast from "react-hot-toast";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({children})=>{
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { invitations: initialInvitations } = useGetFriendInvitations(); 
    const [invitations, setInvitations] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (initialInvitations) {
            setInvitations(initialInvitations);
        }
    }, [initialInvitations]);

    useEffect(() => {
        if(authUser){
            const socket = io("https://chat-app-rt-aj1.onrender.com", {
                query: {
                    userId: authUser._id,
                },
            });
            setSocket(socket); 

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            socket.on("friendInvitation", ({ invitation, senderName }) => {
                setInvitations(prevInvitations => [...prevInvitations, invitation]);
                const sound = new Audio(notifaicationSound);
                toast.success(`${senderName} vous a envoyé une invitation.`);
                sound.play();
            });

            socket.on("invitationAccepted", ({ invitationId, receiverName }) => {
                setInvitations(prevInvitations => prevInvitations.filter(invitation => invitation._id !== invitationId));
                const sound = new Audio(notifaicationSound);
                toast.success(`Votre invitation à ${receiverName} a été acceptée.`);
                sound.play();
            });

            socket.on("invitationRejected", ({ invitationId, receiverName }) => {
                setInvitations(prevInvitations => prevInvitations.filter(invitation => invitation._id !== invitationId));
                toast.error(`Votre invitation à ${receiverName} a été rejetée.`);
            });

            return () => socket.close();
        } else {
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{socket, onlineUsers, invitations, setInvitations}}>
            {children}
        </SocketContext.Provider>
    )
}
