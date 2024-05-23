// hooks/useNotification.js
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import notifaicationSound from "../assets/sounds/notification.mp3";
import { useSocketContext } from '../context/SocketContext';
const useNotification = (userId) => {
  const [invitations, setInvitations] = useState([]);
//   const socket = io('http://localhost:5000'); // Remplacez par votre URL de backend
const {socket} = useSocketContext();

  useEffect(() => {
    // Récupérer les invitations déjà existantes
    const fetchInvitations = async () => {
      try {
        const response = await axios.get('/api/friend-invitations');
        setInvitations(response.data);
      } catch (error) {
        console.error("Error fetching invitations", error.message);
      }
    };

    fetchInvitations();

    // Écouter les nouvelles invitations via Socket.io
    socket.on('friendInvitation', (invitation) => {
      setInvitations((prevInvitations) => [...prevInvitations, invitation]);
      const sound = new Audio(notifaicationSound);
            sound.play();
    });

    // Écouter l'acceptation des invitations
    socket.on('invitationAccepted', (invitationId) => {
      setInvitations((prevInvitations) => prevInvitations.filter(invitation => invitation._id !== invitationId));
    });

    // Écouter le rejet des invitations
    socket.on('invitationRejected', (invitationId) => {
      setInvitations((prevInvitations) => prevInvitations.filter(invitation => invitation._id !== invitationId));
    });

    // Nettoyer l'écouteur lors du démontage du composant
    return () => {
      socket.off('friendInvitation');
      socket.off('invitationAccepted');
      socket.off('invitationRejected');
      socket.disconnect();
    };
  }, [userId]);

  return { invitations, setInvitations };
};

export default useNotification;
