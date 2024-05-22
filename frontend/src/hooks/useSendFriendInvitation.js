// hooks/useSendFriendInvitation.js
import toast from 'react-hot-toast';
import { useSocketContext } from '../context/SocketContext';
import { useState } from 'react';

const useSendFriendInvitation = () => {
  const { socket } = useSocketContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendFriendInvitation = async (receiverId) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token'); // Assurez-vous de récupérer le jeton d'authentification

      const response = await fetch('/api/friend-invitations/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ receiverId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data = await response.json();

      // Emission de l'événement Socket.io
      socket.emit('sendFriendInvitation', { receiverId });

      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      toast.error(err.message); // Affichage du message d'erreur avec un toast
    }
  };

  return { sendFriendInvitation, loading, error };
};

export default useSendFriendInvitation;