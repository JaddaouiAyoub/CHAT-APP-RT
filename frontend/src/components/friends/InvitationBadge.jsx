// components/NotificationBadge.jsx
import { FaUserFriends } from 'react-icons/fa';
import { useSocketContext } from '../../context/SocketContext';

const InvitationBadge = ({ onClick }) => {
    const { invitations } = useSocketContext();

    return (
        <div className="relative" onClick={onClick}>
            <FaUserFriends className="w-6 h-6 cursor-pointer" style={{ color: 'white' }} />
            {invitations.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 bg-red-500 rounded-full">
                    {invitations.length}
                </span>
            )}
        </div>
    );
};

export default InvitationBadge;
