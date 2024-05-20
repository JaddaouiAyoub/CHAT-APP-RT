import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useGetUser = (username) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!username) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/users/${username}`);
                if (!response.ok) {
                    throw new Error(data.error)
                }
                const data = await response.json();
                setUser(data);
                setLoading(false);
            } catch (err) {
                toast.error(err.message)
            }finally{
                setLoading(false);
            }
        };

        fetchUser();
    }, [username]);

    return { user, loading };
};

export default useGetUser;
