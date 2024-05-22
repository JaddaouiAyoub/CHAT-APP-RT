import { useEffect, useState } from "react";

const useGetFriendInvitations = () => {
  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const token = localStorage.getItem('chat-user');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('/api/friend-invitations', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch invitations: ${errorData.message}`);
        }

        const data = await response.json();
        setInvitations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching friend invitations', error);
        setLoading(false);
        setError(error.message);
      }
    };
    console.log("tout va bien");
    fetchInvitations();
  }, []);

  return { loading, invitations, error };
};

export default useGetFriendInvitations;