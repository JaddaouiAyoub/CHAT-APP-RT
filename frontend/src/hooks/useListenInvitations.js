import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenInvitations = () => {
    const { socket, invitations, setInvitations } = useSocketContext();

    useEffect(() => {
        socket?.on("friendInvitation", (invitation) => {
            const sound = new Audio(notificationSound);
            sound.play();
            setInvitations(prevInvitations => [...prevInvitations, invitation]);
           
        });

        return () => socket?.off("friendInvitation");
    }, [socket, setInvitations]);

    return { invitations };
};

export default useListenInvitations;
